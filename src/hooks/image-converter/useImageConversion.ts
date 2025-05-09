
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
  maintainResizeAspectRatio: ReturnType<typeof import('./useImageResize').useImageResize>['maintainResizeAspectRatio'],
  isCircularMode: ReturnType<typeof import('./useImageResize').useImageResize>['isCircularMode'],
  resizeApplied: ReturnType<typeof import('./useImageResize').useImageResize>['resizeApplied']
): UseImageConversionReturn => {
  const [selectedFormat, setSelectedFormat] = useState<FormatOption | null>(null);
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

    if (!selectedFormat) {
      toast({
        title: "No format selected",
        description: "Please select a format to convert to.",
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
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error("Failed to create canvas context");

      // Apply resizing if dimensions are provided and resize was applied
      // or if circular mode is enabled
      let finalWidth = img.width;
      let finalHeight = img.height;

      // Always apply resize if it was explicitly applied or if in circular mode
      // Also apply if valid dimensions are provided
      const shouldApplyResize = resizeApplied ||
                               isCircularMode ||
                               (resizeDimensions.width && resizeDimensions.width > 0) ||
                               (resizeDimensions.height && resizeDimensions.height > 0);

      if (shouldApplyResize) {
        // Handle circular mode first (it overrides other resize settings)
        if (isCircularMode) {
          console.log("Applying circular mode with diameter:", circleDiameter);

          // For circular mode, use the circle diameter for both width and height
          finalWidth = circleDiameter;
          finalHeight = circleDiameter;

          // Set canvas dimensions for the circle
          canvas.width = finalWidth;
          canvas.height = finalHeight;

          // Create circular clipping path
          ctx.beginPath();
          const centerX = finalWidth / 2;
          const centerY = finalHeight / 2;
          const radius = finalWidth / 2;

          // Create the circular clipping path
          ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
          ctx.closePath();
          ctx.clip();

          // Calculate how to center the image in the circle
          const scale = Math.max(
            finalWidth / img.width,
            finalHeight / img.height
          );

          const scaledWidth = img.width * scale;
          const scaledHeight = img.height * scale;
          const offsetX = (finalWidth - scaledWidth) / 2;
          const offsetY = (finalHeight - scaledHeight) / 2;

          // Draw the image centered in the circle
          ctx.drawImage(img, offsetX, offsetY, scaledWidth, scaledHeight);

          // Add circle border
          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2;
          ctx.stroke();

          console.log("Applied circular crop with diameter:", finalWidth);
        }
        // Handle regular resize
        else if (resizeDimensions.width || resizeDimensions.height) {
          const dimensions = calculateDimensionsWithAspectRatio(
            img.width,
            img.height,
            resizeDimensions.width,
            resizeDimensions.height,
            maintainResizeAspectRatio
          );

          finalWidth = dimensions.width;
          finalHeight = dimensions.height;

          console.log("Applying resize with dimensions:", finalWidth, "x", finalHeight);

          // Set canvas dimensions to resized dimensions
          canvas.width = finalWidth;
          canvas.height = finalHeight;

          // Draw image on canvas with resizing
          ctx.drawImage(img, 0, 0, finalWidth, finalHeight);
        }
        // If resize is applied but no dimensions specified, use original dimensions
        else {
          console.log("Resize applied but no dimensions specified, using original dimensions");
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, img.width, img.height);
        }
      } else {
        // No resize applied, use original dimensions
        console.log("No resize applied, using original dimensions:", img.width, "x", img.height);
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
      }

      // Set quality options (only for JPG and WebP)
      const mimeType = `image/${selectedFormat === 'jpg' ? 'jpeg' : selectedFormat}`;
      const qualityOption = !['png', 'bmp', 'gif', 'ico'].includes(selectedFormat) ? quality / 100 : undefined;

      // Convert to new format
      const convertedImageUrl = canvas.toDataURL(mimeType, qualityOption);

      // Update the file with all the conversion settings
      const updatedImageFile = {
        ...imageFile,
        convertedUrl: convertedImageUrl,
        convertedFileName: getConvertedFileName(imageFile.file, selectedFormat),
        format: selectedFormat,
        isCircularMode: isCircularMode,
        resizeDimensions: {
          width: finalWidth,
          height: finalHeight
        }
      };

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
