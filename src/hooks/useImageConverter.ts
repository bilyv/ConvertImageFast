
import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { ImageFile, getFileTypeDisplay, getConvertedFileName, isSupportedFileType } from '../utils/imageUtils';
import { FormatOption } from '../components/ConversionOptions';
import { CropArea, cropAndResizeImage } from '../utils/cropUtils';

export const useImageConverter = (maxImages = 1) => {
  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  const [selectedFormat, setSelectedFormat] = useState<FormatOption>('jpg');
  const [quality, setQuality] = useState<number>(85);
  const [isConverting, setIsConverting] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(-1);
  const [formatMismatchError, setFormatMismatchError] = useState(false);
  const [isCropping, setIsCropping] = useState<boolean>(false);
  const [cropResult, setCropResult] = useState<string | null>(null);
  const [cropData, setCropData] = useState<CropArea | null>(null);
  const [resizeDimensions, setResizeDimensions] = useState<{width?: number; height?: number}>({});
  const [maintainResizeAspectRatio, setMaintainResizeAspectRatio] = useState<boolean>(true);
  const { toast } = useToast();

  // When component unmounts, clean up object URLs
  useEffect(() => {
    return () => {
      imageFiles.forEach(image => {
        if (image.originalUrl) URL.revokeObjectURL(image.originalUrl);
        if (image.convertedUrl && image.convertedUrl.startsWith('blob:')) {
          URL.revokeObjectURL(image.convertedUrl);
        }
      });
    };
  }, [imageFiles]);

  // Auto-delete images after 30 minutes (privacy feature)
  useEffect(() => {
    const autoDeleteTimer = setTimeout(() => {
      if (imageFiles.length > 0) {
        toast({
          title: "Images removed",
          description: "For privacy, uploaded images have been removed after 30 minutes.",
        });
        setImageFiles([]);
      }
    }, 30 * 60 * 1000); // 30 minutes

    return () => clearTimeout(autoDeleteTimer);
  }, [imageFiles, toast]);

  // When files are uploaded
  const handleFileUpload = (uploadedFiles: File[]) => {
    // Since we're only allowing single image upload now, take the first file
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
    
    // Create URL for preview
    const imageUrl = URL.createObjectURL(file);
    
    // Determine default format based on uploaded file type
    let format: FormatOption = 'png';
    if (file.type === 'image/jpeg' || file.type === 'image/jfif') format = 'png';
    else if (file.type === 'image/png') format = 'jpg';
    else if (file.type === 'image/webp') format = 'png';
    
    // Set format for the next conversion
    setSelectedFormat(format);
    
    // Clear existing images and set the new one
    // Clean up any existing object URLs first
    imageFiles.forEach(image => {
      if (image.originalUrl) URL.revokeObjectURL(image.originalUrl);
      if (image.convertedUrl && image.convertedUrl.startsWith('blob:')) {
        URL.revokeObjectURL(image.convertedUrl);
      }
    });
    
    const newImageFile = {
      file,
      originalUrl: imageUrl,
      convertedUrl: null,
      convertedFileName: getConvertedFileName(file, format),
      fileType: file.type,
      fileTypeDisplay: getFileTypeDisplay(file.type),
    };
    
    setImageFiles([newImageFile]);
    setActiveImageIndex(0);
    
    // Reset crop data when new image is uploaded
    setCropResult(null);
    setCropData(null);
    
    toast({
      title: "Image uploaded",
      description: "Your image is ready for conversion.",
    });
  };
  
  // Handle conversion process
  const handleConvert = async () => {
    if (imageFiles.length === 0 || activeImageIndex < 0) {
      toast({
        title: "No image selected",
        description: "Please upload an image first.",
        variant: "destructive"
      });
      return;
    }

    setIsConverting(true);

    try {
      const imageFile = imageFiles[activeImageIndex];
      
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
      
      // Set canvas dimensions to original image size
      canvas.width = img.width;
      canvas.height = img.height;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error("Failed to create canvas context");
      
      // Draw image on canvas
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Set quality options (only for JPG and WebP)
      const mimeType = `image/${selectedFormat === 'jpg' ? 'jpeg' : selectedFormat}`;
      const qualityOption = !['png', 'bmp', 'gif', 'ico'].includes(selectedFormat) ? quality / 100 : undefined;
      
      // Convert to new format
      const convertedImageUrl = canvas.toDataURL(mimeType, qualityOption);
      
      // Update the image file
      const updatedImageFiles = [...imageFiles];
      updatedImageFiles[activeImageIndex] = {
        ...imageFile,
        convertedUrl: convertedImageUrl,
        convertedFileName: getConvertedFileName(imageFile.file, selectedFormat),
      };
      
      setImageFiles(updatedImageFiles);
      
      // Reset crop data after conversion is complete
      setCropResult(null);
      setCropData(null);

      toast({
        title: "Conversion successful",
        description: `Image converted to ${selectedFormat.toUpperCase()}`,
      });
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

  // Handle cropping actions
  const handleStartCropping = () => {
    if (activeImageIndex < 0 || !imageFiles[activeImageIndex]) {
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

  // Reset crop when changing active image
  useEffect(() => {
    setCropResult(null);
    setCropData(null);
    setResizeDimensions({});
  }, [activeImageIndex]);

  // Download converted image
  const handleDownload = () => {
    const image = imageFiles[activeImageIndex];
    
    if (!image || !image.convertedUrl) {
      toast({
        title: "No converted image",
        description: "Please convert your image first.",
        variant: "destructive"
      });
      return;
    }

    const link = document.createElement('a');
    link.href = image.convertedUrl;
    link.download = image.convertedFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Download started",
      description: "Your image is being downloaded.",
    });
  };

  // Remove the image
  const handleRemoveImage = () => {
    if (imageFiles.length === 0) return;
    
    const image = imageFiles[0];
    
    // Revoke the URL to prevent memory leaks
    if (image.originalUrl) {
      URL.revokeObjectURL(image.originalUrl);
    }
    if (image.convertedUrl && image.convertedUrl.startsWith('blob:')) {
      URL.revokeObjectURL(image.convertedUrl);
    }
    
    // Clear images
    setImageFiles([]);
    setActiveImageIndex(-1);

    toast({
      title: "Image removed",
      description: "The image has been removed from the converter."
    });
  };

  return {
    imageFiles,
    selectedFormat,
    setSelectedFormat,
    quality,
    setQuality,
    isConverting,
    activeImageIndex,
    setActiveImageIndex,
    hasMultipleFormats: false, // Always false now since we only allow single upload
    formatMismatchError,
    isCropping,
    cropResult,
    resizeDimensions,
    setResizeDimensions,
    maintainResizeAspectRatio,
    setMaintainResizeAspectRatio,
    handleFileUpload,
    handleConvert,
    handleDownload,
    handleRemoveImage,
    handleStartCropping,
    handleCropComplete,
    handleCancelCrop
  };
};
