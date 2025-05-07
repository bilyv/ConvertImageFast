
// Types and utility functions for image handling

export interface ImageFile {
  file: File;
  originalUrl: string;
  convertedUrl: string | null;
  convertedFileName: string;
  fileType: string;
  fileTypeDisplay: string;
}

export type ImageFormat = 'jpg' | 'png' | 'webp' | 'jfif';

// Check if a file type is supported
export const isSupportedFileType = (fileType: string): boolean => {
  const supportedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jfif'];
  return supportedTypes.includes(fileType);
};

// Get human-readable file type description
export const getFileTypeDisplay = (fileType: string): string => {
  switch (fileType.toLowerCase()) {
    case 'image/jpeg':
      return 'JPEG Image (.jpg)';
    case 'image/jfif':
      return 'JFIF Image (.jfif)';
    case 'image/png':
      return 'PNG Image (.png)';
    case 'image/webp':
      return 'WebP Image (.webp)';
    case 'image/bmp':
      return 'Bitmap Image (.bmp)';
    case 'image/gif':
      return 'GIF Image (.gif)';
    default:
      return 'Unknown Image Format';
  }
};

// Generate a filename for the converted image
export const getConvertedFileName = (file: File, format: string): string => {
  // Get the original filename without extension
  const originalName = file.name.replace(/\.[^/.]+$/, '');
  
  // Replace any problematic characters
  const sanitizedName = originalName.replace(/[^a-zA-Z0-9-_]/g, '_');
  
  // Add timestamp for uniqueness
  const timestamp = new Date().getTime().toString().slice(-6);
  
  return `${sanitizedName}_converted_${timestamp}.${format}`;
};

// Helper function to get the extension from a file name
export const getFileExtension = (fileName: string): string => {
  return fileName.split('.').pop()?.toLowerCase() || '';
};

// Helper function to get the appropriate mime type for a format
export const getMimeType = (format: string): string => {
  switch (format.toLowerCase()) {
    case 'jpg':
    case 'jpeg':
    case 'jfif':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'webp':
      return 'image/webp';
    case 'bmp':
      return 'image/bmp';
    case 'gif':
      return 'image/gif';
    default:
      return 'image/jpeg';
  }
};
