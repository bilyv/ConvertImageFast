
// Utility functions for image cropping and resizing

/**
 * Creates a cropped and/or resized version of an image using canvas
 */
export const cropAndResizeImage = (
  imageUrl: string, 
  crop: CropArea,
  targetWidth: number | null = null,
  targetHeight: number | null = null
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous"; // Handle CORS issues
    image.src = imageUrl;
    
    image.onload = () => {
      try {
        // Create canvas element
        const canvas = document.createElement("canvas");
        
        // Calculate dimensions
        const sourceX = crop.x;
        const sourceY = crop.y;
        const sourceWidth = crop.width;
        const sourceHeight = crop.height;
        
        // Set target dimensions (either specified size or crop size)
        const canvasWidth = targetWidth || sourceWidth;
        const canvasHeight = targetHeight || sourceHeight;
        
        // Set dimensions
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        
        // Get context and draw image
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Failed to get canvas context"));
          return;
        }
        
        // Draw the cropped/resized image to canvas
        ctx.drawImage(
          image,
          sourceX, sourceY, sourceWidth, sourceHeight,  // Source rectangle
          0, 0, canvasWidth, canvasHeight               // Destination rectangle
        );
        
        // Convert canvas to data URL
        const dataUrl = canvas.toDataURL("image/png"); // Default to PNG for lossless intermediate
        resolve(dataUrl);
      } catch (error) {
        reject(error);
      }
    };
    
    image.onerror = () => reject(new Error("Failed to load image for cropping"));
  });
};

export interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ResizeOptions {
  width?: number;
  height?: number;
  maintainAspectRatio: boolean;
}

export const calculateAspectRatio = (width: number, height: number): number => {
  return width / height;
};

export const calculateDimensionsWithAspectRatio = (
  originalWidth: number,
  originalHeight: number,
  targetWidth?: number,
  targetHeight?: number,
  maintainAspectRatio = true
): { width: number; height: number } => {
  if (!maintainAspectRatio || (!targetWidth && !targetHeight)) {
    return {
      width: targetWidth || originalWidth,
      height: targetHeight || originalHeight
    };
  }
  
  const aspectRatio = calculateAspectRatio(originalWidth, originalHeight);
  
  if (targetWidth && !targetHeight) {
    // Calculate height based on width
    return {
      width: targetWidth,
      height: Math.round(targetWidth / aspectRatio)
    };
  } else if (!targetWidth && targetHeight) {
    // Calculate width based on height
    return {
      width: Math.round(targetHeight * aspectRatio),
      height: targetHeight
    };
  } else if (targetWidth && targetHeight) {
    // Both dimensions specified, but maintain aspect ratio
    // Choose the dimension that constrains the image
    const widthRatio = targetWidth / originalWidth;
    const heightRatio = targetHeight / originalHeight;
    
    if (widthRatio < heightRatio) {
      // Width is the constraining dimension
      return {
        width: targetWidth,
        height: Math.round(targetWidth / aspectRatio)
      };
    } else {
      // Height is the constraining dimension
      return {
        width: Math.round(targetHeight * aspectRatio),
        height: targetHeight
      };
    }
  }
  
  // Default: return original dimensions
  return { width: originalWidth, height: originalHeight };
};
