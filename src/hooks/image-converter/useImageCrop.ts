
/**
 * useImageCrop Hook
 *
 * This hook manages the image cropping functionality, including:
 * - Tracking the cropping state (whether cropping is active)
 * - Storing the result of the crop operation
 * - Providing functions to start, complete, and cancel cropping
 */
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { CropArea } from '@/utils/cropUtils';
import { UseImageCropReturn } from './types';

export const useImageCrop = (
  /**
   * The current image file from the useImageUploader hook
   * Required to check if an image is available for cropping
   */
  imageFile: ReturnType<typeof import('./useImageUploader').useImageUploader>['imageFile']
): UseImageCropReturn => {
  /**
   * State to track whether cropping mode is active
   * When true, the UI should display the cropping interface
   */
  const [isCropping, setIsCropping] = useState<boolean>(false);

  /**
   * State to store the URL of the cropped image
   * This will be a data URL containing the cropped image data
   */
  const [cropResult, setCropResult] = useState<string | null>(null);

  /**
   * State to store the crop area dimensions and position
   * Used for reference and potential further processing
   */
  const [cropData, setCropData] = useState<CropArea | null>(null);

  // Toast notifications for user feedback
  const { toast } = useToast();

  /**
   * Start the cropping process
   *
   * Validates that an image is available before enabling crop mode
   * If no image is available, shows an error message
   */
  const handleStartCropping = () => {
    if (!imageFile) {
      toast({
        title: "No image selected",
        description: "Please upload an image first.",
        variant: "destructive"
      });
      return;
    }

    setIsCropping(true);
  };

  /**
   * Handle completion of the crop operation
   *
   * @param croppedImageUrl Data URL of the cropped image
   * @param cropArea Object containing the dimensions and position of the crop area
   */
  const handleCropComplete = (croppedImageUrl: string, cropArea: CropArea) => {
    // Store the crop result and data
    setCropResult(croppedImageUrl);
    setCropData(cropArea);

    // Exit cropping mode
    setIsCropping(false);

    // Notify the user
    toast({
      title: "Image cropped",
      description: "The image has been cropped successfully. You can now convert it.",
    });
  };

  /**
   * Cancel the crop operation
   *
   * Exits cropping mode without applying any changes
   */
  const handleCancelCrop = () => {
    setIsCropping(false);
  };

  /**
   * Return the hook's public API
   *
   * @returns Object containing:
   *   - isCropping: Whether cropping mode is active
   *   - cropResult: The URL of the cropped image (if any)
   *   - cropData: The dimensions and position of the crop area
   *   - handleStartCropping: Function to start cropping
   *   - handleCropComplete: Function to complete cropping
   *   - handleCancelCrop: Function to cancel cropping
   */
  return {
    isCropping,
    cropResult,
    cropData,
    handleStartCropping,
    handleCropComplete,
    handleCancelCrop
  };
};
