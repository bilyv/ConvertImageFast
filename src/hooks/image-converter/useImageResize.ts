
import { useState } from 'react';
import { UseImageResizeReturn } from './types';

export const useImageResize = (): UseImageResizeReturn => {
  const [resizeDimensions, setResizeDimensions] = useState<{width?: number; height?: number}>({});
  const [maintainResizeAspectRatio, setMaintainResizeAspectRatio] = useState<boolean>(true);

  return {
    resizeDimensions,
    maintainResizeAspectRatio,
    setResizeDimensions,
    setMaintainResizeAspectRatio
  };
};
