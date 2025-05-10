
// Types and utility functions for image handling

export interface ImageFile {
  file: File;
  originalUrl: string;
  convertedUrl: string | null;
  convertedFileName: string;
  fileType: string;
  fileTypeDisplay: string;
}

export type ImageFormat = 'jpg' | 'png' | 'webp' | 'bmp' | 'gif' | 'heic' | 'jfif' | 'svg' | 'pdf';

/**
 * Check if a file type is supported by the application
 *
 * This function checks if a given MIME type is in our list of supported formats.
 * For HEIC/HEIF files, we also check the file extension since some browsers
 * may not correctly identify the MIME type.
 *
 * @param fileType The MIME type to check
 * @returns True if the file type is supported, false otherwise
 */
export const isSupportedFileType = (fileType: string): boolean => {
  const supportedTypes = [
    'image/jpeg', 'image/png', 'image/webp', 'image/bmp', 'image/gif', 'image/heic', 'image/heif', 'image/jfif', 'image/svg+xml', 'application/pdf'
  ];
  return supportedTypes.includes(fileType) ||
         fileType.toLowerCase().endsWith('.heic') ||
         fileType.toLowerCase().endsWith('.heif') ||
         fileType.toLowerCase().endsWith('.jfif') ||
         fileType.toLowerCase().endsWith('.svg') ||
         fileType.toLowerCase().endsWith('.pdf');
};

// Get human-readable file type description
export const getFileTypeDisplay = (fileType: string): string => {
  switch (fileType.toLowerCase()) {
    case 'image/jpeg':
      return 'JPEG Image (.jpg)';
    case 'image/png':
      return 'PNG Image (.png)';
    case 'image/webp':
      return 'WebP Image (.webp)';
    case 'image/bmp':
      return 'Bitmap Image (.bmp)';
    case 'image/gif':
      return 'GIF Image (.gif)';
    case 'image/heic':
    case 'image/heif':
      return 'HEIC Image (.heic)';
    case 'image/jfif':
      return 'JFIF Image (.jfif)';
    case 'image/svg+xml':
      return 'SVG Image (.svg)';
    case 'application/pdf':
      return 'PDF Document (.pdf)';
    default:
      // Check file extension for HEIC/HEIF
      if (fileType.toLowerCase().endsWith('.heic') || fileType.toLowerCase().endsWith('.heif')) {
        return 'HEIC Image (.heic)';
      }
      // Check file extension for JFIF
      if (fileType.toLowerCase().endsWith('.jfif')) {
        return 'JFIF Image (.jfif)';
      }
      // Check file extension for SVG
      if (fileType.toLowerCase().endsWith('.svg')) {
        return 'SVG Image (.svg)';
      }
      // Check file extension for PDF
      if (fileType.toLowerCase().endsWith('.pdf')) {
        return 'PDF Document (.pdf)';
      }
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

/**
 * Check if a file is a HEIC image
 *
 * HEIC is a format commonly used by Apple devices (iPhone, iPad)
 * We check both the MIME type and file extension since some browsers
 * may not correctly identify the MIME type for HEIC files
 *
 * @param file The file to check
 * @returns True if the file is a HEIC image, false otherwise
 */
export const isHeicImage = (file: File): boolean => {
  return (
    file.type === 'image/heic' ||
    file.type === 'image/heif' ||
    file.name.toLowerCase().endsWith('.heic') ||
    file.name.toLowerCase().endsWith('.heif')
  );
};

/**
 * Get the appropriate MIME type for a format
 *
 * This function maps format strings (like 'jpg', 'png') to their
 * corresponding MIME types (like 'image/jpeg', 'image/png')
 *
 * Note: For HEIC format, browsers don't fully support creating HEIC files,
 * but we include the MIME type for completeness and for detecting HEIC files
 *
 * @param format The format string
 * @returns The corresponding MIME type
 */
export const getMimeType = (format: string): string => {
  switch (format.toLowerCase()) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'webp':
      return 'image/webp';
    case 'bmp':
      return 'image/bmp';
    case 'gif':
      return 'image/gif';
    case 'heic':
    case 'heif':
      return 'image/heic';
    case 'jfif':
      return 'image/jfif';
    case 'svg':
      return 'image/svg+xml';
    case 'pdf':
      return 'application/pdf';
    default:
      return 'image/jpeg'; // Default to JPEG
  }
};
