
import { useImageUploader } from './useImageUploader';
import { useImageCrop } from './useImageCrop';
import { useImageConversion } from './useImageConversion';
import { UseImageConverterReturn } from './types';

export const useImageConverter = (): UseImageConverterReturn => {
  // Initialize the uploader hook
  const {
    imageFile,
    handleFileUpload: rawHandleFileUpload,
    handleRemoveImage
  } = useImageUploader();

  // Initialize the crop hook with the image file
  const {
    isCropping,
    cropResult,
    cropData,
    handleStartCropping,
    handleCropComplete,
    handleCancelCrop
  } = useImageCrop(imageFile);

  // Initialize the conversion hook with necessary dependencies
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

  // Wrapper for file upload
  const handleFileUpload = (uploadedFiles: File[]) => {
    if (uploadedFiles.length === 0) return;

    // Call the original handler
    rawHandleFileUpload(uploadedFiles);

    // Don't set a default format - let the user choose
    setSelectedFormat(null);
  };

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

// Export types
export * from './types';
