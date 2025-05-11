/**
 * Canvas-based Image Compression Utilities
 * 
 * This module provides functions for compressing images using the Canvas API.
 * It offers more control over the compression process than external libraries
 * and reduces dependencies.
 */

/**
 * Options for image compression
 */
export interface CompressionOptions {
  /**
   * Maximum width or height of the compressed image (maintains aspect ratio)
   */
  maxWidthOrHeight?: number;
  
  /**
   * Quality level for lossy formats (0-1)
   * - 0: Maximum compression, lowest quality
   * - 1: Minimum compression, highest quality
   */
  quality: number;
  
  /**
   * Target format for the compressed image
   */
  format: 'image/jpeg' | 'image/png' | 'image/webp';
  
  /**
   * Whether to maintain the original image dimensions
   * If false, the image will be resized to maxWidthOrHeight
   */
  maintainOriginalSize?: boolean;
}

/**
 * Result of image compression
 */
export interface CompressionResult {
  /**
   * The compressed image as a Blob
   */
  blob: Blob;
  
  /**
   * URL for the compressed image (created with URL.createObjectURL)
   */
  url: string;
  
  /**
   * Width of the compressed image
   */
  width: number;
  
  /**
   * Height of the compressed image
   */
  height: number;
  
  /**
   * Size of the compressed image in bytes
   */
  size: number;
}

/**
 * Compress an image using the Canvas API
 * 
 * @param file The image file to compress
 * @param options Compression options
 * @returns Promise that resolves to the compression result
 */
export const compressImage = async (
  file: File,
  options: CompressionOptions
): Promise<CompressionResult> => {
  // Default options
  const defaultOptions: CompressionOptions = {
    maxWidthOrHeight: 2048,
    quality: 0.7,
    format: 'image/jpeg',
    maintainOriginalSize: false
  };
  
  // Merge options with defaults
  const mergedOptions = { ...defaultOptions, ...options };
  
  return new Promise((resolve, reject) => {
    try {
      // Create a FileReader to read the image file
      const reader = new FileReader();
      
      reader.onload = (event) => {
        // Create an image element to load the file
        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        img.onload = () => {
          try {
            // Get original dimensions
            const originalWidth = img.width;
            const originalHeight = img.height;
            
            // Calculate new dimensions while maintaining aspect ratio
            let newWidth = originalWidth;
            let newHeight = originalHeight;
            
            if (!mergedOptions.maintainOriginalSize && mergedOptions.maxWidthOrHeight) {
              if (originalWidth > originalHeight) {
                // Landscape image
                if (originalWidth > mergedOptions.maxWidthOrHeight) {
                  newWidth = mergedOptions.maxWidthOrHeight;
                  newHeight = Math.round(originalHeight * (newWidth / originalWidth));
                }
              } else {
                // Portrait or square image
                if (originalHeight > mergedOptions.maxWidthOrHeight) {
                  newHeight = mergedOptions.maxWidthOrHeight;
                  newWidth = Math.round(originalWidth * (newHeight / originalHeight));
                }
              }
            }
            
            // Create a canvas with the new dimensions
            const canvas = document.createElement('canvas');
            canvas.width = newWidth;
            canvas.height = newHeight;
            
            // Get the canvas context and draw the image
            const ctx = canvas.getContext('2d');
            if (!ctx) {
              reject(new Error('Failed to get canvas context'));
              return;
            }
            
            // Draw the image onto the canvas
            ctx.drawImage(img, 0, 0, newWidth, newHeight);
            
            // Convert the canvas to a blob with the specified format and quality
            canvas.toBlob(
              (blob) => {
                if (!blob) {
                  reject(new Error('Failed to create blob from canvas'));
                  return;
                }
                
                // Create a URL for the blob
                const url = URL.createObjectURL(blob);
                
                // Return the compression result
                resolve({
                  blob,
                  url,
                  width: newWidth,
                  height: newHeight,
                  size: blob.size
                });
              },
              mergedOptions.format,
              mergedOptions.quality
            );
          } catch (error) {
            reject(error);
          }
        };
        
        img.onerror = () => {
          reject(new Error('Failed to load image for compression'));
        };
        
        // Set the image source to the FileReader result
        img.src = event.target?.result as string;
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read image file'));
      };
      
      // Read the file as a data URL
      reader.readAsDataURL(file);
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Get the appropriate MIME type for a file extension
 * 
 * @param extension File extension (e.g., 'jpg', 'png')
 * @returns MIME type (e.g., 'image/jpeg', 'image/png')
 */
export const getMimeTypeFromExtension = (extension: string): string => {
  const ext = extension.toLowerCase();
  
  switch (ext) {
    case 'jpg':
    case 'jpeg':
    case 'jfif':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'webp':
      return 'image/webp';
    case 'gif':
      return 'image/gif';
    case 'bmp':
      return 'image/bmp';
    case 'svg':
      return 'image/svg+xml';
    default:
      return 'image/jpeg'; // Default to JPEG
  }
};

/**
 * Get the appropriate file extension for a MIME type
 * 
 * @param mimeType MIME type (e.g., 'image/jpeg', 'image/png')
 * @returns File extension (e.g., 'jpg', 'png')
 */
export const getExtensionFromMimeType = (mimeType: string): string => {
  switch (mimeType) {
    case 'image/jpeg':
      return 'jpg';
    case 'image/png':
      return 'png';
    case 'image/webp':
      return 'webp';
    case 'image/gif':
      return 'gif';
    case 'image/bmp':
      return 'bmp';
    case 'image/svg+xml':
      return 'svg';
    default:
      return 'jpg'; // Default to JPG
  }
};
