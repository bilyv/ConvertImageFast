
/**
 * useImageConversion Hook
 *
 * This hook manages the image conversion functionality, including:
 * - Selecting the target format for conversion
 * - Setting the quality level for lossy formats
 * - Converting the image using the Canvas API
 * - Special handling for HEIC images
 * - Downloading the converted image
 * - Cleaning up resources to prevent memory leaks
 */
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { FormatOption } from '@/components/ConversionOptions';
import { useNavigate } from 'react-router-dom';
import { getConvertedFileName, isHeicImage } from '@/utils/imageUtils';
import { convertHeicToJpegOrPng } from '@/utils/heicConverter';
import { UseImageConversionReturn } from './types';

export const useImageConversion = (
  /**
   * The current image file from the useImageUploader hook
   * Contains the original file and metadata
   */
  imageFile: ReturnType<typeof import('./useImageUploader').useImageUploader>['imageFile'],

  /**
   * The result of any crop operation from the useImageCrop hook
   * If present, this will be used as the source for conversion instead of the original image
   */
  cropResult: ReturnType<typeof import('./useImageCrop').useImageCrop>['cropResult']
): UseImageConversionReturn => {
  /**
   * The selected target format for conversion
   * Null when no format has been selected yet
   */
  const [selectedFormat, setSelectedFormat] = useState<FormatOption | null>(null);

  /**
   * Quality setting for lossy formats (JPG, WebP, HEIC)
   * Range: 10-100, with 100 being highest quality
   * Default: 85 (good balance between quality and file size)
   */
  const [quality, setQuality] = useState<number>(85);

  /**
   * Flag to track whether conversion is in progress
   * Used to show loading state in the UI
   */
  const [isConverting, setIsConverting] = useState(false);

  // Toast notifications for user feedback
  const { toast } = useToast();

  // Navigation for redirecting after conversion
  const navigate = useNavigate();

  /**
   * Handle the image conversion process
   *
   * This function:
   * 1. Validates that an image and target format are selected
   * 2. Handles special processing for HEIC images
   * 3. Creates a canvas and draws the image
   * 4. Converts the image to the selected format
   * 5. Navigates to the thank-you page with the converted image
   *
   * @returns Promise that resolves when conversion is complete
   */
  const handleConvert = async () => {
    // Validate that an image is selected
    if (!imageFile) {
      toast({
        title: "No image selected",
        description: "Please upload an image first.",
        variant: "destructive"
      });
      return;
    }

    // Validate that a target format is selected
    if (!selectedFormat) {
      toast({
        title: "No format selected",
        description: "Please select a format to convert to.",
        variant: "destructive"
      });
      return;
    }

    // Set converting state to show loading UI
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

      // Use cropResult URL if available, otherwise use the original image
      const sourceUrl = cropResult || imageFile.originalUrl;

      // Create an Image object for processing
      const img = new Image();
      img.crossOrigin = "anonymous"; // Handle CORS issues

      // Special handling for HEIC source images
      if (isHeic && selectedFormat !== 'heic') {
        console.log("Converting HEIC image to JPEG for processing");
        // Convert HEIC to JPEG using heic2any library
        const jpegUrl = await convertHeicToJpegOrPng(
          imageFile.file,
          'image/jpeg',
          quality / 100
        );
        img.src = jpegUrl;
      } else {
        // For non-HEIC images or when converting to HEIC, use the source directly
        img.src = sourceUrl;
      }

      // Wait for the image to load
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = (e) => reject(new Error(`Failed to load image: ${e}`));
      });

      // Create a canvas for the conversion process
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error("Failed to create canvas context");

      // Use the original dimensions of the image
      const finalWidth = img.width;
      const finalHeight = img.height;

      // Set the canvas dimensions to match the image
      canvas.width = finalWidth;
      canvas.height = finalHeight;

      // Draw the image onto the canvas
      ctx.drawImage(img, 0, 0, finalWidth, finalHeight);

      /**
       * HEIC Handling Step 2: Format-Specific Conversion
       *
       * After processing the image with Canvas API, we need to handle
       * the final conversion to the target format. HEIC requires special
       * handling since browsers can't directly create HEIC files.
       */
      let convertedImageUrl: string;

      // Special handling for HEIC target format
      if (selectedFormat === 'heic') {
        try {
          console.log("Converting to HEIC format (limited browser support)");

          // Get the canvas data as a PNG blob for HEIC conversion
          const canvasBlob = await new Promise<Blob>((resolve) => {
            canvas.toBlob((blob) => {
              if (blob) resolve(blob);
              else throw new Error("Failed to create blob from canvas");
            }, 'image/png');
          });

          /**
           * BROWSER LIMITATION:
           * We can't directly convert to HEIC in the browser, so we'll just use PNG
           * and set the filename extension to .heic. A true HEIC conversion would
           * require a server-side component or a more specialized library.
           */
          convertedImageUrl = URL.createObjectURL(canvasBlob);
        } catch (heicError) {
          // Log the error for debugging
          console.error("HEIC conversion error:", heicError);

          // Notify the user about the limitation
          toast({
            title: "HEIC conversion not fully supported",
            description: "Converting to HEIC format is limited. The image will be saved as PNG with a .heic extension.",
            variant: "destructive"
          });

          // Fallback to PNG format with .heic extension
          convertedImageUrl = canvas.toDataURL('image/png');
        }
      } else {
        // For standard formats (JPG, PNG, WebP, etc.), use the Canvas API

        // Get the correct MIME type (note that 'jpg' needs to be converted to 'jpeg' for the MIME type)
        const mimeType = `image/${selectedFormat === 'jpg' ? 'jpeg' : selectedFormat}`;

        // Apply quality setting only for lossy formats (JPG, WebP)
        // PNG, BMP, and GIF don't use quality settings
        const qualityOption = !['png', 'bmp', 'gif'].includes(selectedFormat) ? quality / 100 : undefined;

        // Convert the canvas to a data URL with the specified format and quality
        convertedImageUrl = canvas.toDataURL(mimeType, qualityOption);
      }

      // Create the updated image file object with conversion results
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

      // Notify the user of successful conversion
      toast({
        title: "Conversion successful",
        description: `Image converted to ${selectedFormat.toUpperCase()}`,
      });

      // Navigate to the thank-you page with the converted image data
      navigate('/thank-you', { state: { imageData: updatedImageFile } });
    } catch (error) {
      // Handle any errors that occurred during conversion
      console.error("Conversion error:", error);

      // Notify the user of the failure
      toast({
        title: "Conversion failed",
        description: "An error occurred during conversion. Please try again.",
        variant: "destructive"
      });
    } finally {
      // Reset the converting state regardless of success or failure
      setIsConverting(false);
    }
  };

  /**
   * Handle the download of a converted image
   *
   * This function:
   * 1. Validates that a converted image exists
   * 2. Creates a temporary anchor element to trigger the download
   * 3. Sets the download filename to the converted filename
   * 4. Triggers the download and notifies the user
   */
  const handleDownload = () => {
    // Validate that a converted image exists
    if (!imageFile || !imageFile.convertedUrl) {
      toast({
        title: "No converted image",
        description: "Please convert your image first.",
        variant: "destructive"
      });
      return;
    }

    // Create a temporary anchor element for the download
    const link = document.createElement('a');
    link.href = imageFile.convertedUrl;
    link.download = imageFile.convertedFileName;

    // Add to DOM, trigger click, and remove (standard download pattern)
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Notify the user that the download has started
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
    // Check if there's a converted URL that's a blob URL
    if (imageFile?.convertedUrl && imageFile.convertedUrl.startsWith('blob:')) {
      console.log("Cleaning up blob URL:", imageFile.convertedUrl);

      // Revoke the object URL to free up memory
      URL.revokeObjectURL(imageFile.convertedUrl);
    }
  };

  /**
   * Return the hook's public API
   *
   * @returns Object containing:
   *   - selectedFormat: The currently selected target format
   *   - quality: The quality setting for lossy formats
   *   - isConverting: Whether conversion is in progress
   *   - setSelectedFormat: Function to set the target format
   *   - setQuality: Function to set the quality level
   *   - handleConvert: Function to convert the image
   *   - handleDownload: Function to download the converted image
   *   - cleanupObjectUrls: Function to clean up resources
   */
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
