
import React, { useState, useEffect, useRef } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import PlatformResize from './PlatformResize';
import ResizeControl from './ResizeControl';
import { Button } from '@/components/ui/button';
import { Search, Maximize } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { calculateDimensionsWithAspectRatio } from '@/utils/cropUtils';

interface ImagePreviewProps {
  originalImage: string;
  fileName: string;
}

interface SimilarImage {
  id: string;
  url: string;
  title: string;
  format: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ originalImage, fileName }) => {
  const [resizeDimensions, setResizeDimensions] = useState<{width?: number; height?: number}>({});
  const [maintainResizeAspectRatio, setMaintainResizeAspectRatio] = useState<boolean>(true);
  const [isCircularMode, setIsCircularMode] = useState<boolean>(false);
  const [circleDiameter, setCircleDiameter] = useState<number>(300);
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [formatFilter, setFormatFilter] = useState<string>('all');
  const [similarImages, setSimilarImages] = useState<SimilarImage[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [previewImage, setPreviewImage] = useState<string>(originalImage);

  // Update preview when resize dimensions or circular mode changes
  useEffect(() => {
    if (!originalImage) return;
    
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = originalImage;
    
    img.onload = () => {
      // Get original dimensions
      const originalWidth = img.width;
      const originalHeight = img.height;
      
      // Skip if no resize is needed
      if (!resizeDimensions.width && !resizeDimensions.height && !isCircularMode) {
        setPreviewImage(originalImage);
        return;
      }
      
      // Create canvas for preview
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      let finalWidth = originalWidth;
      let finalHeight = originalHeight;
      
      // Calculate dimensions based on resize options
      if (resizeDimensions.width || resizeDimensions.height) {
        const dimensions = calculateDimensionsWithAspectRatio(
          originalWidth,
          originalHeight,
          resizeDimensions.width,
          resizeDimensions.height,
          maintainResizeAspectRatio
        );
        
        finalWidth = dimensions.width;
        finalHeight = dimensions.height;
      }
      
      // Set canvas size
      canvas.width = finalWidth;
      canvas.height = finalHeight;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (isCircularMode) {
        // For circular mode, we need to create a circular clipping path
        const centerX = finalWidth / 2;
        const centerY = finalHeight / 2;
        const radius = Math.min(finalWidth, finalHeight) / 2;
        
        // Create circular clipping path
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        
        // Draw the image
        ctx.drawImage(img, 0, 0, finalWidth, finalHeight);
        
        // Add circle border
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
      } else {
        // Draw the image normally
        ctx.drawImage(img, 0, 0, finalWidth, finalHeight);
      }
      
      // Update the preview
      setPreviewImage(canvas.toDataURL('image/png'));
    };
  }, [originalImage, resizeDimensions, maintainResizeAspectRatio, isCircularMode, circleDiameter]);

  const handlePlatformSizeSelect = (width: number, height: number) => {
    setResizeDimensions({ width, height });
    setIsCircularMode(false);
  };

  const handleSearch = () => {
    setIsSearching(true);
    // Simulate API call with a timeout
    setTimeout(() => {
      // Mock results - in a real app, this would be from an API
      const mockResults: SimilarImage[] = [
        { 
          id: '1', 
          url: 'https://images.unsplash.com/photo-1682687220777-2c60708d6889', 
          title: 'Mountain landscape', 
          format: 'jpg' 
        },
        { 
          id: '2', 
          url: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538', 
          title: 'Ocean view', 
          format: 'png' 
        },
        { 
          id: '3', 
          url: 'https://images.unsplash.com/photo-1682687220208-22d7a2543e88', 
          title: 'Forest trail', 
          format: 'webp' 
        },
        { 
          id: '4', 
          url: 'https://images.unsplash.com/photo-1682687220923-c5dca8769ad4', 
          title: 'Desert sunset', 
          format: 'tiff' 
        },
      ];
      
      // Filter by format if needed
      const filteredResults = formatFilter === 'all' 
        ? mockResults 
        : mockResults.filter(img => img.format === formatFilter);
      
      // Filter by search query if provided
      const searchResults = searchQuery.trim() === '' 
        ? filteredResults 
        : filteredResults.filter(img => 
            img.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            img.format.toLowerCase().includes(searchQuery.toLowerCase())
          );
      
      setSimilarImages(searchResults);
      setIsSearching(false);
    }, 1000);
    
    setSearchModalOpen(true);
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
        <div className="absolute top-2 right-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="bg-background/80 backdrop-blur-sm hover:bg-background rounded-full w-8 h-8"
              >
                <Maximize className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4" side="bottom" align="end">
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Resize for platforms</h4>
                <PlatformResize onSelectSize={handlePlatformSizeSelect} />
                
                <div className="pt-2 border-t border-border">
                  <h4 className="text-sm font-medium mb-2">Size options:</h4>
                  <ResizeControl 
                    resizeDimensions={resizeDimensions}
                    setResizeDimensions={setResizeDimensions}
                    maintainAspectRatio={maintainResizeAspectRatio}
                    setMaintainAspectRatio={setMaintainResizeAspectRatio}
                    isCircularMode={isCircularMode}
                    setIsCircularMode={setIsCircularMode}
                    circleDiameter={circleDiameter}
                    setCircleDiameter={setCircleDiameter}
                    show={true}
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        
        {/* Search button - top left */}
        <div className="absolute top-2 left-2">
          <Button
            variant="outline"
            size="icon"
            className="bg-background/80 backdrop-blur-sm hover:bg-background rounded-full w-8 h-8"
            onClick={handleSearch}
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="p-3 bg-card">
        <p className="text-sm font-medium truncate" title={fileName}>
          {fileName}
        </p>
      </div>

      {/* Search Modal */}
      <Dialog open={searchModalOpen} onOpenChange={setSearchModalOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Similar Images</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Input 
                  placeholder="Search formats png or tiff" 
                  value={searchQuery} 
                  onChange={e => setSearchQuery(e.target.value)} 
                />
              </div>
              <Tabs defaultValue="all" onValueChange={setFormatFilter}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="jpg">JPG</TabsTrigger>
                  <TabsTrigger value="png">PNG</TabsTrigger>
                  <TabsTrigger value="webp">WebP</TabsTrigger>
                </TabsList>
              </Tabs>
              <Button onClick={handleSearch}>Search</Button>
            </div>

            {isSearching ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {similarImages.length > 0 ? (
                  similarImages.map((image) => (
                    <div key={image.id} className="border rounded-lg overflow-hidden">
                      <div className="aspect-square bg-muted/30 relative">
                        <img 
                          src={image.url} 
                          alt={image.title} 
                          className="object-cover h-full w-full"
                        />
                      </div>
                      <div className="p-2">
                        <p className="text-sm truncate">{image.title}</p>
                        <p className="text-xs text-muted-foreground">{image.format.toUpperCase()}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8">
                    <p>No similar images found</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImagePreview;
