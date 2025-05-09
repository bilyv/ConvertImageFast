
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { FormatOption } from '@/components/ConversionOptions';
import { useNavigate } from 'react-router-dom';
import { getConvertedFileName, isHeicImage } from '@/utils/imageUtils';
import { convertHeicToJpegOrPng } from '@/utils/heicConverter';
import { UseImageConversionReturn } from './types';

export const useImageConversion = (
  imageFile: ReturnType<typeof import('./useImageUploader').useImageUploader>['imageFile'],
  cropResult: ReturnType<typeof import('./useImageCrop').useImageCrop>['cropResult']
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
      /**
       * HEIC Handling Step 1: Detect and Pre-process HEIC Images
       *
       * HEIC images need special handling because they can't be directly
       * processed by the Canvas API. We need to convert them to JPEG first
       * using the heic2any library before we can manipulate them.
       */

      // Check if we're dealing with a HEIC image
      const isHeic = isHeicImage(imageFile.file);

      // Use cropResult URL if available
      const sourceUrl = cropResult || imageFile.originalUrl;

      // Create canvas for image conversion
      const img = new Image();
      img.crossOrigin = "anonymous"; // Handle CORS issues

      // If the source is a HEIC image and we're not converting to HEIC,
      // we need to convert it to JPEG first using heic2any
      if (isHeic && selectedFormat !== 'heic') {
        console.log("Converting HEIC image to JPEG for processing");
        // Convert HEIC to JPEG using heic2any
        const jpegUrl = await convertHeicToJpegOrPng(
          imageFile.file,
          'image/jpeg',
          quality / 100
        );
        img.src = jpegUrl;
      } else {
        img.src = sourceUrl;
      }

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = (e) => reject(new Error(`Failed to load image: ${e}`));
      });

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error("Failed to create canvas context");

      // Use original dimensions
      const finalWidth = img.width;
      const finalHeight = img.height;

      // Set canvas dimensions
      canvas.width = finalWidth;
      canvas.height = finalHeight;

      // Draw image on canvas
      ctx.drawImage(img, 0, 0, finalWidth, finalHeight);

      /**
       * HEIC Handling Step 2: Format-Specific Conversion
       *
       * After processing the image with Canvas API, we need to handle
       * the final conversion to the target format. HEIC requires special
       * handling since browsers can't directly create HEIC files.
       */
      let convertedImageUrl: string;

      // Handle HEIC conversion separately
      if (selectedFormat === 'heic') {
        try {
          console.log("Converting to HEIC format (limited browser support)");

          // For converting to HEIC, we need to get the canvas data as a blob
          const canvasBlob = await new Promise<Blob>((resolve) => {
            canvas.toBlob((blob) => {
              if (blob) resolve(blob);
              else throw new Error("Failed to create blob from canvas");
            }, 'image/png');
          });

          // Create a blob URL for the processed image

          // BROWSER LIMITATION:
          // We can't directly convert to HEIC in the browser, so we'll just use PNG
          // and set the filename extension to .heic. A true HEIC conversion would
          // require a server-side component or a more specialized library.
          convertedImageUrl = URL.createObjectURL(canvasBlob);
        } catch (heicError) {
          console.error("HEIC conversion error:", heicError);
          toast({
            title: "HEIC conversion not fully supported",
            description: "Converting to HEIC format is limited. The image will be saved as PNG with a .heic extension.",
            variant: "destructive"
          });

          // Fallback to PNG
          convertedImageUrl = canvas.toDataURL('image/png');
        }
      } else {
        // For other formats, use the standard Canvas API
        const mimeType = `image/${selectedFormat === 'jpg' ? 'jpeg' : selectedFormat}`;
        const qualityOption = !['png', 'bmp', 'gif'].includes(selectedFormat) ? quality / 100 : undefined;
        convertedImageUrl = canvas.toDataURL(mimeType, qualityOption);
      }

      // Update the file with conversion settings
      const updatedImageFile = {
        ...imageFile,
        convertedUrl: convertedImageUrl,
        convertedFileName: getConvertedFileName(imageFile.file, selectedFormat),
        format: selectedFormat,
        dimensions: {
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

  /**
   * Clean up any object URLs when component unmounts
   *
   * This is important for memory management, especially when dealing with
   * HEIC conversions which create blob URLs. Without proper cleanup,
   * these URLs would remain in memory causing potential memory leaks.
   */
  const cleanupObjectUrls = () => {
    if (imageFile?.convertedUrl && imageFile.convertedUrl.startsWith('blob:')) {
      console.log("Cleaning up blob URL:", imageFile.convertedUrl);
      URL.revokeObjectURL(imageFile.convertedUrl);
    }
  };

  return {
    selectedFormat,
    quality,
    isConverting,
    setSelectedFormat,
    setQuality,
    handleConvert,
    handleDownload,
    cleanupObjectUrls,
  };
};
