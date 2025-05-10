/**
 * TIFF and ICO Converter Utility
 * 
 * This utility provides functions for converting images to TIFF and ICO formats
 * using the Canvas API.
 */

/**
 * Convert an image to TIFF format
 * 
 * This function takes an image and converts it to a TIFF representation
 * using the Canvas API. Since Canvas doesn't natively support TIFF,
 * we use a workaround by creating a PNG and setting the extension to .tiff.
 * 
 * @param imageUrl URL of the image to convert
 * @param width Width of the image
 * @param height Height of the image
 * @returns Promise that resolves to a data URL
 */
export const convertToTiff = async (
  imageUrl: string,
  width: number,
  height: number
): Promise<string> => {
  try {
    // Create a canvas element
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    
    // Get the canvas context
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Failed to get canvas context');
    
    // Create a new image element
    const img = new Image();
    img.crossOrigin = "anonymous"; // Handle CORS issues
    
    // Wait for the image to load
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = (e) => reject(new Error(`Failed to load image: ${e}`));
      img.src = imageUrl;
    });
    
    // Draw the image onto the canvas
    ctx.drawImage(img, 0, 0, width, height);
    
    // Convert the canvas to a PNG data URL
    // Note: Canvas API doesn't natively support TIFF format,
    // so we use PNG as a base format
    const pngDataUrl = canvas.toDataURL('image/png');
    
    return pngDataUrl;
  } catch (error) {
    console.error('TIFF conversion error:', error);
    throw new Error(`Failed to convert image to TIFF: ${error}`);
  }
};

/**
 * Convert an image to ICO format
 * 
 * This function takes an image and converts it to an ICO representation
 * using the Canvas API. Since Canvas doesn't natively support ICO,
 * we use a workaround by creating a PNG and setting the extension to .ico.
 * 
 * @param imageUrl URL of the image to convert
 * @param width Width of the image
 * @param height Height of the image
 * @returns Promise that resolves to a data URL
 */
export const convertToIco = async (
  imageUrl: string,
  width: number,
  height: number
): Promise<string> => {
  try {
    // Create a canvas element
    const canvas = document.createElement('canvas');
    
    // ICO format typically uses square dimensions
    // We'll use the smaller of width or height to create a square
    const size = Math.min(width, height);
    canvas.width = size;
    canvas.height = size;
    
    // Get the canvas context
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Failed to get canvas context');
    
    // Create a new image element
    const img = new Image();
    img.crossOrigin = "anonymous"; // Handle CORS issues
    
    // Wait for the image to load
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = (e) => reject(new Error(`Failed to load image: ${e}`));
      img.src = imageUrl;
    });
    
    // Calculate the source dimensions to maintain aspect ratio
    let sx = 0, sy = 0, sWidth = img.width, sHeight = img.height;
    
    if (img.width > img.height) {
      // Landscape image
      sx = (img.width - img.height) / 2;
      sWidth = img.height;
    } else if (img.height > img.width) {
      // Portrait image
      sy = (img.height - img.width) / 2;
      sHeight = img.width;
    }
    
    // Draw the image onto the canvas, cropping to a square if necessary
    ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, size, size);
    
    // Convert the canvas to a PNG data URL
    // Note: Canvas API doesn't natively support ICO format,
    // so we use PNG as a base format
    const pngDataUrl = canvas.toDataURL('image/png');
    
    return pngDataUrl;
  } catch (error) {
    console.error('ICO conversion error:', error);
    throw new Error(`Failed to convert image to ICO: ${error}`);
  }
};

/**
 * Check if a file is a TIFF image
 * 
 * @param file The file to check
 * @returns True if the file is a TIFF image, false otherwise
 */
export const isTiffImage = (file: File): boolean => {
  return (
    file.type === 'image/tiff' ||
    file.name.toLowerCase().endsWith('.tiff') ||
    file.name.toLowerCase().endsWith('.tif')
  );
};

/**
 * Check if a file is an ICO image
 * 
 * @param file The file to check
 * @returns True if the file is an ICO image, false otherwise
 */
export const isIcoImage = (file: File): boolean => {
  return (
    file.type === 'image/x-icon' ||
    file.type === 'image/vnd.microsoft.icon' ||
    file.name.toLowerCase().endsWith('.ico')
  );
};
