
import React, { useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import PlatformResize from './PlatformResize';
import ResizeControl from './ResizeControl';
import { Button } from '@/components/ui/button';
import { Search, Resize } from 'lucide-react';

interface ImagePreviewProps {
  originalImage: string;
  fileName: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ originalImage, fileName }) => {
  const [resizeDimensions, setResizeDimensions] = useState<{width?: number; height?: number}>({});
  const [maintainResizeAspectRatio, setMaintainResizeAspectRatio] = useState<boolean>(true);

  const handlePlatformSizeSelect = (width: number, height: number) => {
    setResizeDimensions({ width, height });
    // Here you would typically update the parent component with these dimensions
    // This is just a UI change for now - full functionality would require lifting state up
  };

  return (
    <div className="rounded-lg overflow-hidden border border-border animate-slide-in">
      <div className="aspect-video flex items-center justify-center bg-muted/30 overflow-hidden relative">
        <img
          src={originalImage}
          alt="Original"
          className="object-contain max-h-full max-w-full"
        />
        
        {/* Resize button - top right */}
        <div className="absolute top-2 right-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="bg-background/80 backdrop-blur-sm hover:bg-background rounded-full w-8 h-8"
              >
                <Resize className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4" side="bottom" align="end">
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Resize for platforms</h4>
                <PlatformResize onSelectSize={handlePlatformSizeSelect} />
                
                <div className="pt-2 border-t border-border">
                  <h4 className="text-sm font-medium mb-2">Custom size:</h4>
                  <ResizeControl 
                    resizeDimensions={resizeDimensions}
                    setResizeDimensions={setResizeDimensions}
                    maintainAspectRatio={maintainResizeAspectRatio}
                    setMaintainAspectRatio={setMaintainResizeAspectRatio}
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
            onClick={() => alert('Search functionality would be implemented here')}
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
    </div>
  );
};

export default ImagePreview;
