
import React from 'react';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CircularResize from './CircularResize';

interface ResizeControlProps {
  resizeDimensions: {
    width?: number;
    height?: number;
  };
  setResizeDimensions: (dimensions: {width?: number; height?: number}) => void;
  maintainAspectRatio: boolean;
  setMaintainAspectRatio: (maintain: boolean) => void;
  isCircularMode: boolean;
  setIsCircularMode: (isCircular: boolean) => void;
  circleDiameter: number;
  setCircleDiameter: (diameter: number) => void;
  show?: boolean;
}

const ResizeControl: React.FC<ResizeControlProps> = ({
  resizeDimensions,
  setResizeDimensions,
  maintainAspectRatio,
  setMaintainAspectRatio,
  isCircularMode,
  setIsCircularMode,
  circleDiameter,
  setCircleDiameter,
  show = false // Default to not showing
}) => {
  if (!show) return null;
  
  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = e.target.value ? parseInt(e.target.value) : undefined;
    setResizeDimensions({
      ...resizeDimensions,
      width: newWidth
    });
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = e.target.value ? parseInt(e.target.value) : undefined;
    setResizeDimensions({
      ...resizeDimensions,
      height: newHeight
    });
  };

  const handleTabChange = (value: string) => {
    setIsCircularMode(value === 'circular');
    
    // Reset dimensions when switching tabs
    if (value === 'rectangular') {
      setResizeDimensions({});
    } else if (value === 'circular') {
      setResizeDimensions({ width: circleDiameter, height: circleDiameter });
    }
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="rectangular" onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="rectangular">Custom Size</TabsTrigger>
          <TabsTrigger value="circular">Circular</TabsTrigger>
        </TabsList>
        
        <TabsContent value="rectangular" className="mt-4">
          <div className="space-y-4 bg-muted/30 p-4 rounded-lg border border-border">
            <div className="flex items-center gap-4">
              <div className="space-y-2 flex-1">
                <Label htmlFor="width-input">Width (px)</Label>
                <Input
                  id="width-input"
                  type="number"
                  placeholder="Width"
                  value={resizeDimensions.width || ''}
                  onChange={handleWidthChange}
                  min={1}
                />
              </div>
              <div className="space-y-2 flex-1">
                <Label htmlFor="height-input">Height (px)</Label>
                <Input
                  id="height-input"
                  type="number"
                  placeholder="Height"
                  value={resizeDimensions.height || ''}
                  onChange={handleHeightChange}
                  min={1}
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="maintain-ratio"
                checked={maintainAspectRatio}
                onCheckedChange={setMaintainAspectRatio}
              />
              <Label htmlFor="maintain-ratio">Maintain aspect ratio</Label>
            </div>
            
            <p className="text-xs text-muted-foreground">
              Leave fields empty to keep original dimensions
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="circular" className="mt-4">
          <CircularResize 
            diameter={circleDiameter}
            setDiameter={setCircleDiameter}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResizeControl;
