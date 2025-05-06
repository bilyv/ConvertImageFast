import React, { useState, useRef, useEffect } from 'react';
import { CropArea, calculateDimensionsWithAspectRatio } from '../utils/cropUtils';
import { Button } from '@/components/ui/button';
import { Crop } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

interface ImageCropperProps {
  imageUrl: string | null;
  onCropComplete: (croppedUrl: string, cropArea: CropArea) => void;
  onCancel: () => void;
}

const ImageCropper: React.FC<ImageCropperProps> = ({
  imageUrl,
  onCropComplete,
  onCancel
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  
  const [crop, setCrop] = useState<CropArea>({ x: 0, y: 0, width: 0, height: 0 });
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [scale, setScale] = useState(1);
  const [aspectRatio, setAspectRatio] = useState<number | null>(null); // null means free form

  // Load image and setup canvas
  useEffect(() => {
    if (!imageUrl) return;
    
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;
    imageRef.current = img;
    
    img.onload = () => {
      if (!canvasRef.current) return;
      
      const maxWidth = 600; // Max canvas width
      const maxHeight = 400; // Max canvas height
      
      // Calculate dimensions that fit within our constraints
      const dimensions = calculateDimensionsWithAspectRatio(
        img.width, 
        img.height, 
        img.width > maxWidth ? maxWidth : null,
        img.height > maxHeight ? maxHeight : null
      );
      
      const canvasWidth = dimensions.width;
      const canvasHeight = dimensions.height;
      
      // Update canvas size
      canvasRef.current.width = canvasWidth;
      canvasRef.current.height = canvasHeight;
      setCanvasSize({ width: canvasWidth, height: canvasHeight });
      
      // Store original image size
      setImageSize({ width: img.width, height: img.height });
      
      // Calculate scale factor between original image and canvas display
      const scaleFactor = img.width / canvasWidth;
      setScale(scaleFactor);
      
      // Initialize crop area to the entire image
      setCrop({
        x: 0,
        y: 0,
        width: canvasWidth,
        height: canvasHeight
      });
      
      // Draw the image
      drawCanvas();
      setImageLoaded(true);
    };
    
    img.onerror = () => {
      console.error("Failed to load image for cropping");
    };
  }, [imageUrl]);

  // Redraw canvas whenever the crop area changes
  useEffect(() => {
    if (imageLoaded) {
      drawCanvas();
    }
  }, [crop, imageLoaded]);

  // Helper function to draw the image and crop overlay
  const drawCanvas = () => {
    if (!canvasRef.current || !imageRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the image
    ctx.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height);
    
    // Draw semi-transparent overlay for the non-cropped area
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Clear the crop area (make it transparent)
    ctx.clearRect(crop.x, crop.y, crop.width, crop.height);
    
    // Draw crop border
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeRect(crop.x, crop.y, crop.width, crop.height);
    
    // Draw resize handles
    const handleSize = 8;
    ctx.fillStyle = '#ffffff';
    
    // Corner handles
    ctx.fillRect(crop.x - handleSize/2, crop.y - handleSize/2, handleSize, handleSize); // Top-left
    ctx.fillRect(crop.x + crop.width - handleSize/2, crop.y - handleSize/2, handleSize, handleSize); // Top-right
    ctx.fillRect(crop.x - handleSize/2, crop.y + crop.height - handleSize/2, handleSize, handleSize); // Bottom-left
    ctx.fillRect(crop.x + crop.width - handleSize/2, crop.y + crop.height - handleSize/2, handleSize, handleSize); // Bottom-right
  };

  // Handle mouse events for cropping
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Check if we're on a handle or inside the crop area
    if (isInCropArea(x, y)) {
      setDragStart({ x, y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!dragStart || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate movement
    const deltaX = x - dragStart.x;
    const deltaY = y - dragStart.y;
    
    // Update crop position, keeping it within canvas bounds
    let newX = Math.max(0, Math.min(crop.x + deltaX, canvas.width - crop.width));
    let newY = Math.max(0, Math.min(crop.y + deltaY, canvas.height - crop.height));
    
    // If maintaining aspect ratio, adjust width/height
    if (aspectRatio !== null) {
      // Calculate width based on height and aspect ratio
      const newHeight = crop.height;
      const newWidth = newHeight * aspectRatio;
      
      setCrop({
        x: newX,
        y: newY,
        width: Math.min(newWidth, canvas.width - newX),
        height: Math.min(newHeight, canvas.height - newY)
      });
    } else {
      setCrop({
        ...crop,
        x: newX,
        y: newY
      });
    }
    
    setDragStart({ x, y });
  };

  const handleMouseUp = () => {
    setDragStart(null);
  };

  // Helper to check if a point is inside the crop area
  const isInCropArea = (x: number, y: number): boolean => {
    return (
      x >= crop.x &&
      x <= crop.x + crop.width &&
      y >= crop.y &&
      y <= crop.y + crop.height
    );
  };

  // Apply the crop
  const handleApplyCrop = () => {
    if (!canvasRef.current || !imageRef.current) return;
    
    // Create a temporary canvas to get the cropped image
    const tempCanvas = document.createElement('canvas');
    
    // Calculate actual crop dimensions on original image
    const actualCrop = {
      x: Math.round(crop.x * scale),
      y: Math.round(crop.y * scale),
      width: Math.round(crop.width * scale),
      height: Math.round(crop.height * scale)
    };
    
    // Set temp canvas to the size of the crop
    tempCanvas.width = actualCrop.width;
    tempCanvas.height = actualCrop.height;
    
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return;
    
    // Draw only the cropped portion
    tempCtx.drawImage(
      imageRef.current,
      actualCrop.x, actualCrop.y, actualCrop.width, actualCrop.height,
      0, 0, actualCrop.width, actualCrop.height
    );
    
    // Get the data URL and pass it back
    const croppedUrl = tempCanvas.toDataURL('image/png');
    onCropComplete(croppedUrl, actualCrop);
  };

  // Handle preset aspect ratios
  const setFixedAspectRatio = (ratio: number | null) => {
    setAspectRatio(ratio);
    
    if (ratio === null) return; // Free form, no adjustment needed
    
    // Adjust crop area to match the new aspect ratio
    // Try to maintain the center point
    const centerX = crop.x + crop.width / 2;
    const centerY = crop.y + crop.height / 2;
    
    let newWidth = crop.width;
    let newHeight = crop.height;
    
    // Calculate new dimensions based on aspect ratio
    if (crop.width / crop.height > ratio) {
      // Too wide, adjust width
      newWidth = crop.height * ratio;
    } else {
      // Too tall, adjust height
      newHeight = crop.width / ratio;
    }
    
    // Calculate new position keeping the center point
    let newX = centerX - newWidth / 2;
    let newY = centerY - newHeight / 2;
    
    // Ensure crop stays within canvas
    if (canvasRef.current) {
      newX = Math.max(0, Math.min(newX, canvasRef.current.width - newWidth));
      newY = Math.max(0, Math.min(newY, canvasRef.current.height - newHeight));
    }
    
    setCrop({
      x: newX,
      y: newY,
      width: newWidth,
      height: newHeight
    });
  };

  // Handle resize adjustment
  const handleResizeWidth = (values: number[]) => {
    if (!canvasRef.current) return;
    
    const newWidth = (values[0] / 100) * canvasSize.width;
    
    let newHeight = crop.height;
    if (aspectRatio !== null) {
      newHeight = newWidth / aspectRatio;
    }
    
    setCrop({
      ...crop,
      width: Math.min(newWidth, canvasSize.width - crop.x),
      height: aspectRatio !== null ? Math.min(newHeight, canvasSize.height - crop.y) : crop.height
    });
  };

  const handleResizeHeight = (values: number[]) => {
    if (!canvasRef.current) return;
    
    const newHeight = (values[0] / 100) * canvasSize.height;
    
    let newWidth = crop.width;
    if (aspectRatio !== null) {
      newWidth = newHeight * aspectRatio;
    }
    
    setCrop({
      ...crop,
      width: aspectRatio !== null ? Math.min(newWidth, canvasSize.width - crop.x) : crop.width,
      height: Math.min(newHeight, canvasSize.height - crop.y)
    });
  };

  // If no image URL, show placeholder
  if (!imageUrl) {
    return (
      <div className="rounded-lg overflow-hidden border border-border h-64 flex items-center justify-center bg-muted/30">
        <p className="text-muted-foreground text-sm">No image selected for cropping</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="relative">
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="cursor-move"
            style={{ maxWidth: '100%', display: 'block', margin: '0 auto' }}
          />
        </div>
      </div>
      
      <div className="space-y-4 bg-muted/30 p-4 rounded-lg border border-border">
        <div>
          <h3 className="text-sm font-medium mb-2">Aspect Ratio</h3>
          <div className="flex flex-wrap gap-2">
            <Button 
              size="sm" 
              variant={aspectRatio === null ? "default" : "outline"}
              onClick={() => setFixedAspectRatio(null)}
            >
              Free
            </Button>
            <Button 
              size="sm" 
              variant={aspectRatio === 1 ? "default" : "outline"}
              onClick={() => setFixedAspectRatio(1)}
            >
              1:1
            </Button>
            <Button 
              size="sm" 
              variant={aspectRatio === 16/9 ? "default" : "outline"}
              onClick={() => setFixedAspectRatio(16/9)}
            >
              16:9
            </Button>
            <Button 
              size="sm" 
              variant={aspectRatio === 4/3 ? "default" : "outline"}
              onClick={() => setFixedAspectRatio(4/3)}
            >
              4:3
            </Button>
            <Button 
              size="sm" 
              variant={aspectRatio === 3/2 ? "default" : "outline"}
              onClick={() => setFixedAspectRatio(3/2)}
            >
              3:2
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Width</label>
            <span className="text-sm">{Math.round(crop.width / canvasSize.width * 100)}%</span>
          </div>
          <Slider
            value={[crop.width / canvasSize.width * 100]}
            min={10}
            max={100}
            step={1}
            onValueChange={handleResizeWidth}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Height</label>
            <span className="text-sm">{Math.round(crop.height / canvasSize.height * 100)}%</span>
          </div>
          <Slider
            value={[crop.height / canvasSize.height * 100]}
            min={10}
            max={100}
            step={1}
            onValueChange={handleResizeHeight}
          />
        </div>
      </div>
      
      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button 
          onClick={handleApplyCrop}
          disabled={!imageLoaded}
          className="bg-app-primary hover:bg-app-primary/90 text-white"
        >
          <Crop className="mr-2 h-4 w-4" />
          Apply Crop
        </Button>
      </div>
    </div>
  );
};

export default ImageCropper;
