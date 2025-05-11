/**
 * HEIC Image Converter
 *
 * This utility provides conversion functions for HEIC images using the heic2any library.
 */

import heic2any from 'heic2any';

/**
 * Converts a HEIC image to JPEG or PNG format
 *
 * @param file The HEIC file to convert
 * @param targetFormat The target format (JPEG or PNG)
 * @param quality The quality of the output image (0-1)
 * @returns A Promise that resolves to a data URL of the converted image
 */
export const convertHeicToJpegOrPng = async (
  file: File,
  targetFormat: 'image/jpeg' | 'image/png' = 'image/jpeg',
  quality: number = 0.8
): Promise<string> => {
  try {
    // Convert the HEIC file to JPEG or PNG
    const convertedBlob = await heic2any({
      blob: file,
      toType: targetFormat,
      quality
    });

    // heic2any can return an array of blobs for multi-page HEIC files
    // We'll just use the first one for simplicity
    const resultBlob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;

    // Convert the blob to a data URL
    return URL.createObjectURL(resultBlob);
  } catch (error) {
    console.error('HEIC conversion error:', error);
    throw new Error(`Failed to convert HEIC image: ${error}`);
  }
};

/**
 * Checks if a file is a HEIC image
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
