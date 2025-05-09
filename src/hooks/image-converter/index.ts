
import { useImageUploader } from './useImageUploader';
import { useImageCrop } from './useImageCrop';
import { useImageResize } from './useImageResize';
import { useImageConversion } from './useImageConversion';
import { UseImageConverterReturn } from './types';
import { useState } from 'react';
import { FormatOption } from '@/components/ConversionOptions';
import { getConvertedFileName } from '@/utils/imageUtils';

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
  
  // Initialize the resize hook
  const {
    resizeDimensions,
    maintainResizeAspectRatio,
    setResizeDimensions,
    setMaintainResizeAspectRatio
  } = useImageResize();
  
  // Initialize the conversion hook with necessary dependencies
  const {
    selectedFormat,
    quality,
    isConverting,
    setSelectedFormat,
    setQuality,
    handleConvert,
    handleDownload
  } = useImageConversion(
    imageFile,
    cropResult,
    cropData,
    resizeDimensions,
    maintainResizeAspectRatio
  );

  // Wrapper for file upload to set the format
  const handleFileUpload = (uploadedFiles: File[]) => {
    if (uploadedFiles.length === 0) return;
    
    const file = uploadedFiles[0];
    
    // Call the original handler
    rawHandleFileUpload(uploadedFiles);
    
    // Determine default format based on uploaded file type
    let format: FormatOption = 'png';
    if (file.type === 'image/jpeg' || file.type === 'image/jfif') format = 'png';
    else if (file.type === 'image/png') format = 'jpg';
    else if (file.type === 'image/webp') format = 'png';
    
    // Set format for the next conversion
    setSelectedFormat(format);
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
    
    // From useImageResize
    resizeDimensions,
    maintainResizeAspectRatio,
    setResizeDimensions,
    setMaintainResizeAspectRatio,
    
    // From useImageConversion
    selectedFormat,
    quality,
    isConverting,
    setSelectedFormat,
    setQuality,
    handleConvert,
    handleDownload
  };
};

// Export types
export * from './types';
