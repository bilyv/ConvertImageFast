
// Types and utility functions for image handling

export interface ImageFile {
  file: File;
  originalUrl: string;
  convertedUrl: string | null;
  convertedFileName: string;
  fileType: string;
  fileTypeDisplay: string;
}

export type ImageFormat = 'jpg' | 'png' | 'webp' | 'bmp' | 'gif' | 'heic' | 'jfif' | 'svg' | 'pdf' | 'tiff' | 'ico';

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
    'image/jpeg', 'image/png', 'image/webp', 'image/bmp', 'image/gif', 'image/heic', 'image/heif',
    'image/jfif', 'image/svg+xml', 'application/pdf', 'image/tiff', 'image/x-icon', 'image/vnd.microsoft.icon'
  ];
  return supportedTypes.includes(fileType) ||
         fileType.toLowerCase().endsWith('.heic') ||
         fileType.toLowerCase().endsWith('.heif') ||
         fileType.toLowerCase().endsWith('.jfif') ||
         fileType.toLowerCase().endsWith('.svg') ||
         fileType.toLowerCase().endsWith('.pdf') ||
         fileType.toLowerCase().endsWith('.tiff') ||
         fileType.toLowerCase().endsWith('.tif') ||
         fileType.toLowerCase().endsWith('.ico');
};

/**
 * Get human-readable file type description
 *
 * This function determines the display name for a file type based on either
 * the MIME type or the file extension. This is especially important for HEIC files
 * which may not be correctly identified by MIME type in some browsers.
 *
 * @param fileTypeOrName The MIME type or filename to check
 * @returns A human-readable description of the file type
 */
export const getFileTypeDisplay = (fileTypeOrName: string): string => {
  const lowerCaseInput = fileTypeOrName.toLowerCase();

  // First check for JFIF in the filename, as browsers often report JFIF as image/jpeg
  if (lowerCaseInput.endsWith('.jfif') || lowerCaseInput.includes('jfif')) {
    return 'JFIF Image (.jfif)';
  }

  // Then check MIME types
  switch (lowerCaseInput) {
    case 'image/jpeg':
      // Check if the input might be a filename with jfif in it
      if (lowerCaseInput.includes('jfif')) {
        return 'JFIF Image (.jfif)';
      }
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
    case 'image/tiff':
      return 'TIFF Image (.tiff)';
    case 'image/x-icon':
    case 'image/vnd.microsoft.icon':
      return 'ICO Image (.ico)';
  }

  // Then check file extensions
  if (lowerCaseInput.endsWith('.jfif') || lowerCaseInput.includes('jfif')) {
    return 'JFIF Image (.jfif)';
  }
  if (lowerCaseInput.endsWith('.jpg') || lowerCaseInput.endsWith('.jpeg')) {
    // Make sure it's not a JFIF file misidentified as JPEG
    if (!lowerCaseInput.includes('jfif')) {
      return 'JPEG Image (.jpg)';
    } else {
      return 'JFIF Image (.jfif)';
    }
  }
  if (lowerCaseInput.endsWith('.png')) {
    return 'PNG Image (.png)';
  }
  if (lowerCaseInput.endsWith('.webp')) {
    return 'WebP Image (.webp)';
  }
  if (lowerCaseInput.endsWith('.bmp')) {
    return 'Bitmap Image (.bmp)';
  }
  if (lowerCaseInput.endsWith('.gif')) {
    return 'GIF Image (.gif)';
  }
  if (lowerCaseInput.endsWith('.heic') || lowerCaseInput.endsWith('.heif') ||
      lowerCaseInput.includes('_heic') || lowerCaseInput.includes('.heic')) {
    return 'HEIC Image (.heic)';
  }
  if (lowerCaseInput.endsWith('.svg')) {
    return 'SVG Image (.svg)';
  }
  if (lowerCaseInput.endsWith('.pdf')) {
    return 'PDF Document (.pdf)';
  }
  if (lowerCaseInput.endsWith('.tiff') || lowerCaseInput.endsWith('.tif')) {
    return 'TIFF Image (.tiff)';
  }
  if (lowerCaseInput.endsWith('.ico')) {
    return 'ICO Image (.ico)';
  }

  // If no match found
  return 'Unknown Image Format';
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
  const fileName = file.name.toLowerCase();
  const fileType = file.type.toLowerCase();

  return (
    fileType === 'image/heic' ||
    fileType === 'image/heif' ||
    fileName.endsWith('.heic') ||
    fileName.endsWith('.heif') ||
    // Also check for files that contain 'heic' in the name, which might be the case for converted files
    fileName.includes('_heic') ||
    fileName.includes('.heic')
  );
};

/**
 * Check if a file is a JFIF image
 *
 * JFIF (JPEG File Interchange Format) is a file format for storing JPEG images
 * Browsers often report JFIF files as 'image/jpeg', so we need to check the file extension
 * to correctly identify them
 *
 * @param file The file to check
 * @returns True if the file is a JFIF image, false otherwise
 */
export const isJfifImage = (file: File): boolean => {
  const fileName = file.name.toLowerCase();
  const fileType = file.type.toLowerCase();

  return (
    fileType === 'image/jfif' ||
    fileName.endsWith('.jfif') ||
    // Also check for files that contain 'jfif' in the name
    fileName.includes('jfif')
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
    case 'tiff':
    case 'tif':
      return 'image/tiff';
    case 'ico':
      return 'image/x-icon';
    default:
      return 'image/jpeg'; // Default to JPEG
  }
};

/**
 * Format file size in bytes to a human-readable string
 *
 * @param bytes The file size in bytes
 * @param decimals The number of decimal places to show (default: 2)
 * @returns A formatted string like "1.5 MB" or "820 KB"
 */
export const formatFileSize = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
};
