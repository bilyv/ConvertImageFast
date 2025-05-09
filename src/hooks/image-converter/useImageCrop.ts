
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { CropArea } from '@/utils/cropUtils';
import { UseImageCropReturn } from './types';

export const useImageCrop = (imageFile: ReturnType<typeof import('./useImageUploader').useImageUploader>['imageFile']): UseImageCropReturn => {
  const [isCropping, setIsCropping] = useState<boolean>(false);
  const [cropResult, setCropResult] = useState<string | null>(null);
  const [cropData, setCropData] = useState<CropArea | null>(null);
  const { toast } = useToast();

  // Handle cropping actions
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
  
  const handleCropComplete = (croppedImageUrl: string, cropArea: CropArea) => {
    setCropResult(croppedImageUrl);
    setCropData(cropArea);
    setIsCropping(false);
    
    toast({
      title: "Image cropped",
      description: "The image has been cropped successfully. You can now convert it.",
    });
  };
  
  const handleCancelCrop = () => {
    setIsCropping(false);
  };

  return {
    isCropping,
    cropResult,
    cropData,
    handleStartCropping,
    handleCropComplete,
    handleCancelCrop
  };
};
