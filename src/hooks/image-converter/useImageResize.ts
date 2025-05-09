
import { useState } from 'react';
import { UseImageResizeReturn } from './types';

export const useImageResize = (): UseImageResizeReturn => {
  const [resizeDimensions, setResizeDimensions] = useState<{width?: number; height?: number}>({});
  const [maintainResizeAspectRatio, setMaintainResizeAspectRatio] = useState<boolean>(true);
  const [isCircularMode, setIsCircularMode] = useState<boolean>(false);
  const [circleDiameter, setCircleDiameter] = useState<number>(300);
  
  const handleCircleDiameterChange = (diameter: number) => {
    setCircleDiameter(diameter);
    // When in circle mode, width and height are the same
    setResizeDimensions({ width: diameter, height: diameter });
  };

  return {
    resizeDimensions,
    maintainResizeAspectRatio,
    isCircularMode,
    circleDiameter,
    setResizeDimensions,
    setMaintainResizeAspectRatio,
    setIsCircularMode,
    setCircleDiameter: handleCircleDiameterChange
  };
};
