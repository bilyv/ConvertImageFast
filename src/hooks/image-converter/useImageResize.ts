
import { useState } from 'react';
import { UseImageResizeReturn } from './types';

export const useImageResize = (): UseImageResizeReturn => {
  const [resizeDimensions, setResizeDimensions] = useState<{width?: number; height?: number}>({});
  const [maintainResizeAspectRatio, setMaintainResizeAspectRatio] = useState<boolean>(true);
  const [isCircularMode, setIsCircularMode] = useState<boolean>(false);
  const [circleDiameter, setCircleDiameter] = useState<number>(300);
  const [resizeApplied, setResizeApplied] = useState<boolean>(false);
  
  const handleCircleDiameterChange = (diameter: number) => {
    setCircleDiameter(diameter);
    // When in circle mode, width and height are the same
    setResizeDimensions({ width: diameter, height: diameter });
  };

  const applyResize = () => {
    setResizeApplied(true);
  };

  const resetResize = () => {
    setResizeApplied(false);
    setResizeDimensions({});
    setIsCircularMode(false);
  };

  return {
    resizeDimensions,
    maintainResizeAspectRatio,
    isCircularMode,
    circleDiameter,
    resizeApplied,
    setResizeDimensions,
    setMaintainResizeAspectRatio,
    setIsCircularMode,
    setCircleDiameter: handleCircleDiameterChange,
    applyResize,
    resetResize
  };
};
