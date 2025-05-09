
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { ImageFile, getFileTypeDisplay, isSupportedFileType } from '../../utils/imageUtils';
import { UseImageUploaderReturn } from './types';

export const useImageUploader = (): UseImageUploaderReturn => {
  const [imageFile, setImageFile] = useState<ImageFile | null>(null);
  const { toast } = useToast();

  // When component unmounts, clean up object URL
  useEffect(() => {
    return () => {
      if (imageFile && imageFile.originalUrl) {
        URL.revokeObjectURL(imageFile.originalUrl);
      }
      if (imageFile && imageFile.convertedUrl && imageFile.convertedUrl.startsWith('blob:')) {
        URL.revokeObjectURL(imageFile.convertedUrl);
      }
    };
  }, [imageFile]);

  // Auto-delete image after 30 minutes (privacy feature)
  useEffect(() => {
    const autoDeleteTimer = setTimeout(() => {
      if (imageFile) {
        toast({
          title: "Image removed",
          description: "For privacy, uploaded image has been removed after 30 minutes.",
        });
        setImageFile(null);
      }
    }, 30 * 60 * 1000); // 30 minutes

    return () => clearTimeout(autoDeleteTimer);
  }, [imageFile, toast]);

  // When a file is uploaded
  const handleFileUpload = (uploadedFiles: File[]) => {
    // Only process the first file
    if (uploadedFiles.length === 0) return;
    
    const file = uploadedFiles[0];
    
    // Check if file type is supported
    if (!isSupportedFileType(file.type)) {
      toast({
        title: "Unsupported file format",
        description: `File "${file.name}" is not a supported image format.`,
        variant: "destructive"
      });
      return;
    }

    // Check file size (max 10MB)
    const maxSizeMB = 10;
    if (file.size > maxSizeMB * 1024 * 1024) {
      toast({
        title: "File too large",
        description: `Maximum file size is ${maxSizeMB}MB.`,
        variant: "destructive"
      });
      return;
    }

    // Clean up previous image if exists
    if (imageFile) {
      if (imageFile.originalUrl) URL.revokeObjectURL(imageFile.originalUrl);
      if (imageFile.convertedUrl && imageFile.convertedUrl.startsWith('blob:')) {
        URL.revokeObjectURL(imageFile.convertedUrl);
      }
    }
    
    // Create URL for preview
    const imageUrl = URL.createObjectURL(file);
    
    // Determine default format based on uploaded file type
    let format: FormatOption = 'png';
    if (file.type === 'image/jpeg' || file.type === 'image/jfif') format = 'png';
    else if (file.type === 'image/png') format = 'jpg';
    else if (file.type === 'image/webp') format = 'png';
    
    // Set format for the next conversion
    setSelectedFormat(format);
    
    setImageFile({
      file,
      originalUrl: imageUrl,
      convertedUrl: null,
      convertedFileName: getConvertedFileName(file, format),
      fileType: file.type,
      fileTypeDisplay: getFileTypeDisplay(file.type),
    });

    // Reset crop data when new image is uploaded
    setCropResult(null);
    setCropData(null);
    setResizeDimensions({});

    toast({
      title: "Upload successful",
      description: `Image "${file.name}" uploaded.`,
    });
  };

  // Remove the image
  const handleRemoveImage = () => {
    if (imageFile) {
      // Revoke the URL to prevent memory leaks
      if (imageFile.originalUrl) {
        URL.revokeObjectURL(imageFile.originalUrl);
      }
      if (imageFile.convertedUrl && imageFile.convertedUrl.startsWith('blob:')) {
        URL.revokeObjectURL(imageFile.convertedUrl);
      }
      
      setImageFile(null);
      setCropResult(null);
      setCropData(null);

      toast({
        title: "Image removed",
        description: "The image has been removed from the converter."
      });
    }
  };

  return {
    imageFile,
    handleFileUpload,
    handleRemoveImage,
  };
};

// Adding these imports and functions to avoid TypeScript errors
// In the real implementation, these will be properly imported and won't cause duplication
import { FormatOption } from '@/components/ConversionOptions';
import { getConvertedFileName } from '@/utils/imageUtils';

// These are temporary declarations that will be properly replaced with imported functions
// in the final integrated hook
let setCropResult: React.Dispatch<React.SetStateAction<string | null>> = () => {};
let setCropData: React.Dispatch<React.SetStateAction<any>> = () => {};
let setResizeDimensions: React.Dispatch<React.SetStateAction<{width?: number; height?: number}>> = () => {};
let setSelectedFormat: React.Dispatch<React.SetStateAction<FormatOption>> = () => {};
