
/**
 * Image Converter Hooks
 *
 * This module composes multiple specialized hooks into a single unified hook
 * that provides all the functionality needed for the image converter application.
 *
 * The architecture follows a modular approach where each hook handles a specific
 * aspect of the image conversion process:
 *
 * - useImageUploader: Handles file upload, validation, and management
 * - useImageCrop: Handles image cropping functionality
 * - useImageConversion: Handles the actual conversion between formats
 *
 * These hooks are composed together in the useImageConverter hook, which
 * provides a unified API for the application components.
 */
import { useImageUploader } from './useImageUploader';
import { useImageCrop } from './useImageCrop';
import { useImageConversion } from './useImageConversion';
import { UseImageConverterReturn } from './types';

/**
 * Main hook for the image converter application
 *
 * This hook composes all the specialized hooks and provides a unified API
 * for the application components to interact with.
 *
 * @returns A combined API with all image conversion functionality
 */
export const useImageConverter = (): UseImageConverterReturn => {
  /**
   * Initialize the uploader hook
   * Handles file upload, validation, and management
   */
  const {
    imageFile,
    handleFileUpload: rawHandleFileUpload,
    handleRemoveImage
  } = useImageUploader();

  /**
   * Initialize the crop hook with the image file
   * Handles image cropping functionality
   */
  const {
    isCropping,
    cropResult,
    cropData,
    handleStartCropping,
    handleCropComplete,
    handleCancelCrop
  } = useImageCrop(imageFile);

  /**
   * Initialize the conversion hook with necessary dependencies
   * Handles the actual conversion between formats
   */
  const {
    selectedFormat,
    quality,
    isConverting,
    setSelectedFormat,
    setQuality,
    handleConvert,
    handleDownload,
    cleanupObjectUrls
  } = useImageConversion(
    imageFile,
    cropResult
  );

  /**
   * Enhanced file upload handler
   *
   * Wraps the original handler from useImageUploader to add additional
   * functionality, such as resetting the selected format when a new file
   * is uploaded.
   *
   * @param uploadedFiles Array of File objects from the file input or drop event
   */
  const handleFileUpload = (uploadedFiles: File[]) => {
    if (uploadedFiles.length === 0) return;

    // Call the original handler from useImageUploader
    rawHandleFileUpload(uploadedFiles);

    // Reset the selected format - let the user choose
    setSelectedFormat(null);
  };

  /**
   * Return the combined API from all hooks
   *
   * This provides a unified interface for the application components
   * to interact with all the image conversion functionality.
   */
  return {
    // From useImageUploader
    imageFile,
    handleFileUpload,
    handleRemoveImage,

    // From useImageCrop
    isCropping,
    cropResult,
    cropData,
    handleStartCropping,
    handleCropComplete,
    handleCancelCrop,

    // From useImageConversion
    selectedFormat,
    quality,
    isConverting,
    setSelectedFormat,
    setQuality,
    handleConvert,
    handleDownload,
    cleanupObjectUrls
  };
};

// Export types for use in other modules
export * from './types';
