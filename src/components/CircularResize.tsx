
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface CircularResizeProps {
  diameter: number;
  setDiameter: (diameter: number) => void;
}

const CircularResize: React.FC<CircularResizeProps> = ({ 
  diameter, 
  setDiameter 
}) => {
  const handleDiameterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseInt(e.target.value) : 200;
    setDiameter(value);
  };

  const handleSliderChange = (value: number[]) => {
    setDiameter(value[0]);
  };

  return (
    <div className="space-y-4 bg-muted/30 p-4 rounded-lg border border-border">
      <div className="space-y-2">
        <Label htmlFor="diameter-input">Circle Diameter (px)</Label>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Input
              id="diameter-input"
              type="number"
              placeholder="Diameter"
              value={diameter || ''}
              onChange={handleDiameterChange}
              min={50}
              max={1000}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="diameter-slider">Adjust Size</Label>
        <Slider
          id="diameter-slider"
          defaultValue={[diameter]}
          min={50}
          max={1000}
          step={10}
          onValueChange={handleSliderChange}
        />
      </div>

      <p className="text-xs text-muted-foreground">
        The image will be cropped to a perfect circle with this diameter
      </p>
    </div>
  );
};

export default CircularResize;
