
// Types and utility functions for image handling

export interface ImageFile {
  file: File;
  originalUrl: string;
  convertedUrl: string | null;
  convertedFileName: string;
  fileType: string;
  fileTypeDisplay: string;
}

export type ImageFormat = 'jpg' | 'png' | 'webp' | 'jfif' | 'bmp' | 'gif' | 'tiff' | 'avif' | 'ico' | 
                         'heic' | 'raw' | 'psd' | 'ai' | 'svg' | 'jp2' | 'cr2' | 'nef' | 'arw' | 'dng' | 
                         'exr' | 'pbm' | 'pcx';

// Check if a file type is supported
export const isSupportedFileType = (fileType: string): boolean => {
  const supportedTypes = [
    'image/jpeg', 'image/png', 'image/webp', 'image/jfif', 'image/bmp', 'image/gif',
    'image/tiff', 'image/avif', 'image/x-icon', 'image/heic', 'image/raw',
    'image/psd', 'image/ai', 'image/svg+xml', 'image/jp2', 'image/cr2',
    'image/nef', 'image/arw', 'image/dng', 'image/exr', 'image/pbm', 'image/pcx'
  ];
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
    case 'image/tiff':
      return 'TIFF Image (.tiff)';
    case 'image/avif':
      return 'AVIF Image (.avif)';
    case 'image/x-icon':
      return 'Icon (.ico)';
    case 'image/heic':
      return 'HEIC Image (.heic)';
    case 'image/raw':
      return 'RAW Image (.raw)';
    case 'image/psd':
      return 'Photoshop Document (.psd)';
    case 'image/ai':
      return 'Adobe Illustrator (.ai)';
    case 'image/svg+xml':
      return 'SVG Image (.svg)';
    case 'image/jp2':
      return 'JPEG 2000 (.jp2)';
    case 'image/cr2':
      return 'Canon Raw (.cr2)';
    case 'image/nef':
      return 'Nikon Raw (.nef)';
    case 'image/arw':
      return 'Sony Raw (.arw)';
    case 'image/dng':
      return 'Digital Negative (.dng)';
    case 'image/exr':
      return 'OpenEXR Image (.exr)';
    case 'image/pbm':
      return 'Portable Bitmap (.pbm)';
    case 'image/pcx':
      return 'PCX Image (.pcx)';
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
    case 'tiff':
      return 'image/tiff';
    case 'avif':
      return 'image/avif';
    case 'ico':
      return 'image/x-icon';
    case 'heic':
      return 'image/heic';
    case 'svg':
      return 'image/svg+xml';
    case 'jp2':
      return 'image/jp2';
    // These formats may not be supported for direct conversion in browser
    // but we include them for completeness
    case 'raw':
      return 'image/raw';
    case 'psd':
      return 'image/psd';
    case 'ai':
      return 'image/ai';
    case 'cr2':
      return 'image/cr2';
    case 'nef':
      return 'image/nef';
    case 'arw':
      return 'image/arw';
    case 'dng':
      return 'image/dng';
    case 'exr':
      return 'image/exr';
    case 'pbm':
      return 'image/pbm';
    case 'pcx':
      return 'image/pcx';
    default:
      return 'image/jpeg';
  }
};
