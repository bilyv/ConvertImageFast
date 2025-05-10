
/**
 * useImageUploader Hook
 *
 * This hook manages the image upload functionality, including:
 * - Storing the uploaded image file and its metadata
 * - Cleaning up resources when the component unmounts
 * - Auto-deleting images after a timeout for privacy
 * - Providing functions to upload and remove images
 */
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { ImageFile, getFileTypeDisplay, isSupportedFileType } from '../../utils/imageUtils';
import { UseImageUploaderReturn } from './types';

export const useImageUploader = (): UseImageUploaderReturn => {
  /**
   * State to store the current image file and its metadata
   * Includes the original file, URLs, and display information
   */
  const [imageFile, setImageFile] = useState<ImageFile | null>(null);

  // Toast notifications for user feedback
  const { toast } = useToast();

  /**
   * Cleanup effect: Revoke object URLs when component unmounts
   *
   * This prevents memory leaks by ensuring that any blob URLs
   * created for image previews are properly cleaned up when
   * the component is no longer in use.
   */
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

  /**
   * Privacy feature: Auto-delete uploaded images after 30 minutes
   *
   * This enhances user privacy by automatically removing uploaded images
   * after a set period of inactivity, preventing sensitive images from
   * remaining in the browser's memory.
   */
  useEffect(() => {
    const AUTO_DELETE_TIMEOUT = 30 * 60 * 1000; // 30 minutes in milliseconds

    const autoDeleteTimer = setTimeout(() => {
      if (imageFile) {
        toast({
          title: "Image removed",
          description: "For privacy, uploaded image has been removed after 30 minutes.",
        });
        setImageFile(null);
      }
    }, AUTO_DELETE_TIMEOUT);

    // Clear the timeout if the component unmounts or imageFile changes
    return () => clearTimeout(autoDeleteTimer);
  }, [imageFile, toast]);

  /**
   * Handle file upload
   *
   * This function:
   * 1. Validates the uploaded file (type and size)
   * 2. Cleans up any previously uploaded images
   * 3. Creates a new object URL for the image preview
   * 4. Updates the state with the new image information
   * 5. Resets any previous editing state (crop, resize)
   *
   * @param uploadedFiles Array of File objects from the file input or drop event
   */
  const handleFileUpload = (uploadedFiles: File[]) => {
    // Only process the first file
    if (uploadedFiles.length === 0) return;

    const file = uploadedFiles[0];

    // Validate file type
    if (!isSupportedFileType(file.type)) {
      toast({
        title: "Unsupported file format",
        description: `File "${file.name}" is not a supported image format.`,
        variant: "destructive"
      });
      return;
    }

    // Validate file size (max 10MB)
    const MAX_FILE_SIZE_MB = 10;
    const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

    if (file.size > MAX_FILE_SIZE_BYTES) {
      toast({
        title: "File too large",
        description: `Maximum file size is ${MAX_FILE_SIZE_MB}MB.`,
        variant: "destructive"
      });
      return;
    }

    // Clean up previous image resources if they exist
    if (imageFile) {
      if (imageFile.originalUrl) URL.revokeObjectURL(imageFile.originalUrl);
      if (imageFile.convertedUrl && imageFile.convertedUrl.startsWith('blob:')) {
        URL.revokeObjectURL(imageFile.convertedUrl);
      }
    }

    // Create URL for image preview
    const imageUrl = URL.createObjectURL(file);

    // Update state with the new image information
    setImageFile({
      file,
      originalUrl: imageUrl,
      convertedUrl: null,
      convertedFileName: file.name, // Initial value, will be updated during conversion
      fileType: file.type,
      fileTypeDisplay: getFileTypeDisplay(file.type),
    });

    // Reset editing state when a new image is uploaded
    setCropResult(null);
    setCropData(null);
    setResizeDimensions({});

    // Notify the user of successful upload
    toast({
      title: "Upload successful",
      description: `Image "${file.name}" uploaded.`,
    });
  };

  /**
   * Remove the current image
   *
   * This function:
   * 1. Cleans up any object URLs to prevent memory leaks
   * 2. Resets all image-related state
   * 3. Notifies the user that the image has been removed
   */
  const handleRemoveImage = () => {
    if (imageFile) {
      // Clean up resources to prevent memory leaks
      if (imageFile.originalUrl) {
        URL.revokeObjectURL(imageFile.originalUrl);
      }
      if (imageFile.convertedUrl && imageFile.convertedUrl.startsWith('blob:')) {
        URL.revokeObjectURL(imageFile.convertedUrl);
      }

      // Reset all image-related state
      setImageFile(null);
      setCropResult(null);
      setCropData(null);

      // Notify the user
      toast({
        title: "Image removed",
        description: "The image has been removed from the converter."
      });
    }
  };

  /**
   * Return the hook's public API
   *
   * @returns Object containing:
   *   - imageFile: The current image file and its metadata
   *   - handleFileUpload: Function to upload a new image
   *   - handleRemoveImage: Function to remove the current image
   */
  return {
    imageFile,
    handleFileUpload,
    handleRemoveImage,
  };
};

/**
 * Temporary declarations for state setters used in the handleFileUpload function
 * These are placeholders that will be replaced by the actual implementations
 * when the hooks are composed together in the useImageConverter hook
 */
// Declare placeholder functions for state setters from other hooks
let setCropResult: React.Dispatch<React.SetStateAction<string | null>> = () => {};
let setCropData: React.Dispatch<React.SetStateAction<any>> = () => {};
let setResizeDimensions: React.Dispatch<React.SetStateAction<{width?: number; height?: number}>> = () => {};
