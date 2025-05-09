
import React, { useState } from 'react';
import { Maximize } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import PlatformResize from '../PlatformResize';
import ResizeControl from '../ResizeControl';
import { useToast } from '@/hooks/use-toast';

interface ImageResizePopoverProps {
  resizeDimensions: { width?: number; height?: number };
  setResizeDimensions: (dimensions: { width?: number; height?: number }) => void;
  maintainResizeAspectRatio: boolean;
  setMaintainResizeAspectRatio: (maintain: boolean) => void;
  isCircularMode: boolean;
  setIsCircularMode: (isCircular: boolean) => void;
  circleDiameter: number;
  setCircleDiameter: (diameter: number) => void;
  applyResize: () => void;
}

const ImageResizePopover: React.FC<ImageResizePopoverProps> = ({
  resizeDimensions,
  setResizeDimensions,
  maintainResizeAspectRatio,
  setMaintainResizeAspectRatio,
  isCircularMode,
  setIsCircularMode,
  circleDiameter,
  setCircleDiameter,
  applyResize
}) => {
  const [resizePopoverOpen, setResizePopoverOpen] = useState<boolean>(false);
  const { toast } = useToast();

  const handlePlatformSizeSelect = (width: number, height: number) => {
    // Set dimensions first
    setResizeDimensions({ width, height });

    // Disable circular mode when selecting platform size
    setIsCircularMode(false);

    // Apply the resize immediately
    setTimeout(() => {
      applyResize();
      setResizePopoverOpen(false);

      toast({
        title: "Platform size applied",
        description: `Image will be resized to ${width} × ${height}px`,
      });
    }, 50); // Small timeout to ensure state is updated
  };

  const handleApplyResize = () => {
    // Make sure we have valid dimensions before applying
    if (isCircularMode && (!circleDiameter || circleDiameter <= 0)) {
      toast({
        title: "Invalid dimensions",
        description: "Please specify a valid diameter for circular mode",
        variant: "destructive"
      });
      return;
    }

    if (!isCircularMode &&
        (!resizeDimensions.width || resizeDimensions.width <= 0) &&
        (!resizeDimensions.height || resizeDimensions.height <= 0)) {
      toast({
        title: "Invalid dimensions",
        description: "Please specify at least one valid dimension",
        variant: "destructive"
      });
      return;
    }

    // Apply the resize with a small timeout to ensure state is updated
    setTimeout(() => {
      applyResize();
      setResizePopoverOpen(false);

      toast({
        title: "Resize applied",
        description: isCircularMode
          ? `Circular mode with diameter ${circleDiameter}px`
          : `Custom size ${resizeDimensions.width || 'auto'} × ${resizeDimensions.height || 'auto'}`,
      });
    }, 50);
  };

  const handleCancelResize = () => {
    setResizePopoverOpen(false);
  };

  return (
    <div className="absolute top-2 right-2">
      <Popover open={resizePopoverOpen} onOpenChange={setResizePopoverOpen}>
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
                onApply={handleApplyResize}
                onCancel={handleCancelResize}
                show={true}
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ImageResizePopover;
