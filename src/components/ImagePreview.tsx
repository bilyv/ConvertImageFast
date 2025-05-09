
import React, { useState, useEffect, useRef } from 'react';
import { useImageConverter } from '@/hooks/useImageConverter';
import { useToast } from '@/hooks/use-toast';
import ImageResizePopover from './image-preview/ImageResizePopover';
import { generateResizedPreviewImage } from './image-preview/previewUtils';

interface ImagePreviewProps {
  originalImage: string;
  fileName: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ originalImage, fileName }) => {
  const [previewImage, setPreviewImage] = useState<string>(originalImage);
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  // Get the global resize state from the hook context
  const {
    resizeDimensions: globalResizeDimensions,
    setResizeDimensions: setGlobalResizeDimensions,
    maintainResizeAspectRatio: globalMaintainResizeAspectRatio,
    setMaintainResizeAspectRatio: setGlobalMaintainResizeAspectRatio,
    isCircularMode: globalIsCircularMode,
    setIsCircularMode: setGlobalIsCircularMode,
    circleDiameter: globalCircleDiameter,
    setCircleDiameter: setGlobalCircleDiameter,
    applyResize
  } = useImageConverter();

  // Local state for resize options
  const [resizeDimensions, setResizeDimensions] = useState<{width?: number; height?: number}>(globalResizeDimensions);
  const [maintainResizeAspectRatio, setMaintainResizeAspectRatio] = useState<boolean>(globalMaintainResizeAspectRatio);
  const [isCircularMode, setIsCircularMode] = useState<boolean>(globalIsCircularMode);
  const [circleDiameter, setCircleDiameter] = useState<number>(globalCircleDiameter);

  // Initialize local state from global state
  useEffect(() => {
    setResizeDimensions(globalResizeDimensions);
    setMaintainResizeAspectRatio(globalMaintainResizeAspectRatio);
    setIsCircularMode(globalIsCircularMode);
    setCircleDiameter(globalCircleDiameter);
  }, [
    globalResizeDimensions,
    globalMaintainResizeAspectRatio,
    globalIsCircularMode,
    globalCircleDiameter
  ]);

  // Update preview when resize dimensions or circular mode changes
  useEffect(() => {
    // Generate resized preview image
    generateResizedPreviewImage(
      originalImage,
      resizeDimensions,
      maintainResizeAspectRatio,
      isCircularMode
    )
    .then(resizedImage => {
      setPreviewImage(resizedImage);
    })
    .catch(error => {
      console.error("Error generating preview:", error);
      toast({
        title: "Preview error",
        description: "Failed to generate image preview.",
        variant: "destructive"
      });
      // Fallback to original image
      setPreviewImage(originalImage);
    });
  }, [originalImage, resizeDimensions, maintainResizeAspectRatio, isCircularMode, circleDiameter, toast]);

  // Handle applying resize settings
  const handleApplyResize = () => {
    // Apply resize settings to global state
    setGlobalResizeDimensions(resizeDimensions);
    setGlobalMaintainResizeAspectRatio(maintainResizeAspectRatio);
    setGlobalIsCircularMode(isCircularMode);
    setGlobalCircleDiameter(circleDiameter);

    // Mark resize as applied
    applyResize();
  };

  return (
    <div className="rounded-lg overflow-hidden border border-border animate-slide-in">
      <div className="aspect-video flex items-center justify-center bg-muted/30 overflow-hidden relative">
        <img
          ref={imageRef}
          src={previewImage}
          alt="Original"
          className={`object-contain max-h-full max-w-full ${isCircularMode ? 'rounded-full' : ''}`}
        />

        {/* Hidden canvas for processing */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />

        {/* Resize button - top right */}
        <ImageResizePopover
          resizeDimensions={resizeDimensions}
          setResizeDimensions={setResizeDimensions}
          maintainResizeAspectRatio={maintainResizeAspectRatio}
          setMaintainResizeAspectRatio={setMaintainResizeAspectRatio}
          isCircularMode={isCircularMode}
          setIsCircularMode={setIsCircularMode}
          circleDiameter={circleDiameter}
          setCircleDiameter={setCircleDiameter}
          applyResize={handleApplyResize}
        />


      </div>
      <div className="p-3 bg-card">
        <p className="text-sm font-medium truncate" title={fileName}>
          {fileName}
        </p>
      </div>
    </div>
  );
};

export default ImagePreview;
