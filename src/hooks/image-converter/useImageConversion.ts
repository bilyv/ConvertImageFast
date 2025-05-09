
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { FormatOption } from '@/components/ConversionOptions';
import { useNavigate } from 'react-router-dom';
import { calculateDimensionsWithAspectRatio } from '@/utils/cropUtils';
import { getConvertedFileName } from '@/utils/imageUtils';
import { UseImageConversionReturn } from './types';

export const useImageConversion = (
  imageFile: ReturnType<typeof import('./useImageUploader').useImageUploader>['imageFile'],
  cropResult: ReturnType<typeof import('./useImageCrop').useImageCrop>['cropResult'],
  cropData: ReturnType<typeof import('./useImageCrop').useImageCrop>['cropData'],
  resizeDimensions: ReturnType<typeof import('./useImageResize').useImageResize>['resizeDimensions'],
  maintainResizeAspectRatio: ReturnType<typeof import('./useImageResize').useImageResize>['maintainResizeAspectRatio']
): UseImageConversionReturn => {
  const [selectedFormat, setSelectedFormat] = useState<FormatOption>('jpg');
  const [quality, setQuality] = useState<number>(85);
  const [isConverting, setIsConverting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Handle conversion process
  const handleConvert = async () => {
    if (!imageFile) {
      toast({
        title: "No image selected",
        description: "Please upload an image first.",
        variant: "destructive"
      });
      return;
    }

    setIsConverting(true);

    try {
      // Use cropResult URL if available
      const sourceUrl = cropResult || imageFile.originalUrl;
      
      // Create canvas for image conversion
      const img = new Image();
      img.crossOrigin = "anonymous"; // Handle CORS issues
      img.src = sourceUrl;
      
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = (e) => reject(new Error(`Failed to load image: ${e}`));
      });

      const canvas = document.createElement('canvas');
      
      // Apply resizing if dimensions are provided
      let finalWidth = img.width;
      let finalHeight = img.height;
      
      if (resizeDimensions.width || resizeDimensions.height) {
        const dimensions = calculateDimensionsWithAspectRatio(
          img.width, 
          img.height,
          resizeDimensions.width,
          resizeDimensions.height,
          maintainResizeAspectRatio
        );
        
        finalWidth = dimensions.width;
        finalHeight = dimensions.height;
      }
      
      // Set canvas dimensions to resized dimensions
      canvas.width = finalWidth;
      canvas.height = finalHeight;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error("Failed to create canvas context");
      
      // Draw image on canvas with resizing if needed
      ctx.drawImage(img, 0, 0, finalWidth, finalHeight);
      
      // Set quality options (only for JPG and WebP)
      const mimeType = `image/${selectedFormat === 'jpg' ? 'jpeg' : selectedFormat}`;
      const qualityOption = !['png', 'bmp', 'gif', 'ico'].includes(selectedFormat) ? quality / 100 : undefined;
      
      // Convert to new format
      const convertedImageUrl = canvas.toDataURL(mimeType, qualityOption);
      
      // Update the file
      const updatedImageFile = {
        ...imageFile,
        convertedUrl: convertedImageUrl,
        convertedFileName: getConvertedFileName(imageFile.file, selectedFormat),
      };
      
      // Reset crop data after conversion is complete
      // Note: In the refactored hook, we won't modify crop state from here.
      // Instead we'll return this information to the parent hook

      toast({
        title: "Conversion successful",
        description: `Image converted to ${selectedFormat.toUpperCase()}`,
      });
      
      // Navigate to thank you page with the converted image data
      navigate('/thank-you', { state: { imageData: updatedImageFile } });
    } catch (error) {
      console.error("Conversion error:", error);
      toast({
        title: "Conversion failed",
        description: "An error occurred during conversion. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsConverting(false);
    }
  };

  // Handle single image download
  const handleDownload = () => {
    if (!imageFile || !imageFile.convertedUrl) {
      toast({
        title: "No converted image",
        description: "Please convert your image first.",
        variant: "destructive"
      });
      return;
    }

    const link = document.createElement('a');
    link.href = imageFile.convertedUrl;
    link.download = imageFile.convertedFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Download started",
      description: "Your image is being downloaded.",
    });
  };

  return {
    selectedFormat,
    quality,
    isConverting,
    setSelectedFormat,
    setQuality,
    handleConvert,
    handleDownload,
  };
};
