
// Utility functions for image handling

// Get readable format name from mimetype
export const getFileTypeDisplay = (mimeType: string): string => {
  switch (mimeType) {
    case 'image/jpeg': return 'JPEG';
    case 'image/png': return 'PNG';
    case 'image/webp': return 'WebP';
    case 'image/bmp': return 'BMP';
    case 'image/gif': return 'GIF';
    case 'image/tiff': return 'TIFF';
    case 'image/avif': return 'AVIF';
    case 'image/x-icon': return 'ICO';
    case 'image/jfif': return 'JFIF';
    default: return 'Unknown';
  }
};

// Generate file name for the converted image
export const getConvertedFileName = (file: File, format: string): string => {
  // Extract name without extension
  const originalName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
  return `${originalName}.${format}`;
};

// Check if file type is supported
export const isSupportedFileType = (mimeType: string): boolean => {
  const supportedTypes = [
    'image/jpeg', 
    'image/png', 
    'image/webp', 
    'image/bmp', 
    'image/gif', 
    'image/tiff', 
    'image/avif', 
    'image/x-icon',
    'image/jfif'
  ];
  return supportedTypes.includes(mimeType);
};

export interface ImageFile {
  file: File;
  originalUrl: string;
  convertedUrl: string | null;
  convertedFileName: string;
  fileType: string;
  fileTypeDisplay: string;
}
