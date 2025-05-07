
import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { ImageFile, getFileTypeDisplay, getConvertedFileName, isSupportedFileType } from '../utils/imageUtils';
import { FormatOption } from '../components/ConversionOptions';
import { CropArea, cropAndResizeImage } from '../utils/cropUtils';

export const useImageConverter = () => {
  const [imageFile, setImageFile] = useState<ImageFile | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<FormatOption>('jpg');
  const [quality, setQuality] = useState<number>(85);
  const [isConverting, setIsConverting] = useState(false);
  const [isCropping, setIsCropping] = useState<boolean>(false);
  const [cropResult, setCropResult] = useState<string | null>(null);
  const [cropData, setCropData] = useState<CropArea | null>(null);
  const [resizeDimensions, setResizeDimensions] = useState<{width?: number; height?: number}>({});
  const [maintainResizeAspectRatio, setMaintainResizeAspectRatio] = useState<boolean>(true);
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
      
      // Set canvas dimensions to original image size (no resize)
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
      
      // Update the file
      setImageFile({
        ...imageFile,
        convertedUrl: convertedImageUrl,
        convertedFileName: getConvertedFileName(imageFile.file, selectedFormat),
      });

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
    selectedFormat,
    setSelectedFormat,
    quality,
    setQuality,
    isConverting,
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
