/**
 * ICO Converter Utility
 * 
 * This utility provides functions for converting images to ICO format
 * using the icojs library.
 */

import * as ICO from 'icojs';

/**
 * Convert an image to ICO format
 * 
 * This function takes an image and converts it to an ICO file
 * using the icojs library.
 * 
 * @param imageUrl URL of the image to convert
 * @param width Width of the image (ICO supports 16, 32, 48, 64, 128, 256)
 * @param height Height of the image (should be the same as width for ICO)
 * @returns Promise that resolves to an ICO data URL
 */
export const convertToIco = async (
  imageUrl: string,
  width: number,
  height: number
): Promise<string> => {
  try {
    // ICO format typically uses square dimensions
    // We'll use the smaller of width and height to ensure a square image
    const size = Math.min(width, height);
    
    // ICO format supports specific sizes: 16, 32, 48, 64, 128, 256
    // We'll find the closest supported size
    const supportedSizes = [16, 32, 48, 64, 128, 256];
    const closestSize = supportedSizes.reduce((prev, curr) => {
      return (Math.abs(curr - size) < Math.abs(prev - size) ? curr : prev);
    });
    
    // Create a new image element to ensure the image is loaded
    const img = new Image();
    img.crossOrigin = "anonymous"; // Handle CORS issues
    
    // Wait for the image to load
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = (e) => reject(new Error(`Failed to load image: ${e}`));
      img.src = imageUrl;
    });

    // Create a canvas to draw the image
    const canvas = document.createElement('canvas');
    canvas.width = closestSize;
    canvas.height = closestSize;
    
    // Get the canvas context and draw the image
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Failed to get canvas context');
    
    // Draw the image with proper scaling to fit the canvas
    ctx.drawImage(img, 0, 0, closestSize, closestSize);
    
    // Get the image data as a PNG blob
    const pngBlob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Failed to create blob from canvas'));
      }, 'image/png');
    });
    
    // Convert the PNG blob to an ArrayBuffer
    const arrayBuffer = await pngBlob.arrayBuffer();
    
    // Use icojs to create an ICO file
    const icoData = await ICO.fromPNG(new Uint8Array(arrayBuffer), [closestSize]);
    
    // Convert the ICO data to a Blob
    const icoBlob = new Blob([icoData.buffer], { type: 'image/x-icon' });
    
    // Create a data URL from the Blob
    return URL.createObjectURL(icoBlob);
  } catch (error) {
    console.error('ICO conversion error:', error);
    throw new Error(`Failed to convert image to ICO: ${error}`);
  }
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
