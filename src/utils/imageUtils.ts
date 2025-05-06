
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
    case 'image/heic': return 'HEIC';
    case 'image/x-canon-cr2': return 'CR2 (Canon RAW)';
    case 'image/x-nikon-nef': return 'NEF (Nikon RAW)';
    case 'image/x-sony-arw': return 'ARW (Sony RAW)';
    default: return 'Unknown';
  }
};

// Generate file name for the converted image
export const getConvertedFileName = (file: File, format: string): string => {
  // Extract name without extension
  const originalName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
  return `${originalName}.${format}`;
};

// Validate if the browser supports the given file format
export const isFormatSupported = (format: string): boolean => {
  // Formats widely supported in modern browsers
  const browserSupportedFormats = ['jpg', 'jpeg', 'png', 'webp', 'bmp', 'gif'];
  return browserSupportedFormats.includes(format.toLowerCase());
};

// Get recommended conversion format based on input format
export const getRecommendedFormat = (mimeType: string): string => {
  switch (mimeType) {
    case 'image/jpeg': return 'png';
    case 'image/png': return 'webp';
    case 'image/webp': return 'png';
    case 'image/bmp': return 'jpeg';
    case 'image/gif': return 'webp';
    case 'image/tiff': return 'png';
    case 'image/avif': return 'webp';
    case 'image/x-icon': return 'png';
    case 'image/heic': return 'jpeg';
    case 'image/x-canon-cr2': return 'png';
    case 'image/x-nikon-nef': return 'jpeg';
    case 'image/x-sony-arw': return 'jpeg';
    default: return 'jpeg';
  }
};

export interface ImageFile {
  file: File;
  originalUrl: string;
  convertedUrl: string | null;
  convertedFileName: string;
  fileType: string;
  fileTypeDisplay: string;
}

// Check if the file is a RAW image format
export const isRawFormat = (mimeType: string): boolean => {
  const rawFormats = [
    'image/x-canon-cr2',
    'image/x-nikon-nef',
    'image/x-sony-arw'
  ];
  return rawFormats.includes(mimeType);
};
