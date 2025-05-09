
import { calculateDimensionsWithAspectRatio } from '@/utils/cropUtils';

export interface ResizeSettings {
  width?: number;
  height?: number;
  maintainAspectRatio: boolean;
  isCircularMode: boolean;
}

export const generateResizedPreviewImage = (
  originalImage: string,
  resizeDimensions: { width?: number; height?: number },
  maintainResizeAspectRatio: boolean,
  isCircularMode: boolean
): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!originalImage) {
      resolve(originalImage);
      return;
    }
    
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = originalImage;
    
    img.onload = () => {
      // Get original dimensions
      const originalWidth = img.width;
      const originalHeight = img.height;
      
      // Skip if no resize is needed
      if (!resizeDimensions.width && !resizeDimensions.height && !isCircularMode) {
        resolve(originalImage);
        return;
      }
      
      // Create canvas for preview
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }
      
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
      
      // Return the preview image
      resolve(canvas.toDataURL('image/png'));
    };
    
    img.onerror = (error) => {
      reject(error);
    };
  });
};
