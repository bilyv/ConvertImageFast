import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { ImageFile, getFileTypeDisplay, getConvertedFileName } from '../utils/imageUtils';
import { FormatOption } from '../components/ConversionOptions';
import { CropArea, cropAndResizeImage } from '../utils/cropUtils';

export const useImageConverter = (maxImages = 2) => {
  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  const [selectedFormat, setSelectedFormat] = useState<FormatOption>('jpg');
  const [quality, setQuality] = useState<number>(85);
  const [isConverting, setIsConverting] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(-1);
  const [hasMultipleFormats, setHasMultipleFormats] = useState(false);
  const [formatMismatchError, setFormatMismatchError] = useState(false);
  const [isCropping, setIsCropping] = useState<boolean>(false);
  const [cropResult, setCropResult] = useState<string | null>(null);
  const [cropData, setCropData] = useState<CropArea | null>(null);
  const [resizeDimensions, setResizeDimensions] = useState<{width?: number; height?: number}>({});
  const [maintainResizeAspectRatio, setMaintainResizeAspectRatio] = useState<boolean>(true);
  const { toast } = useToast();

  // Check if uploaded images have multiple formats
  useEffect(() => {
    if (imageFiles.length > 1) {
      const formats = new Set(imageFiles.map(img => img.file.type));
      setHasMultipleFormats(formats.size > 1);
      
      // Set format mismatch error if formats differ
      setFormatMismatchError(formats.size > 1);
    } else {
      setHasMultipleFormats(false);
      setFormatMismatchError(false);
    }
  }, [imageFiles]);

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
    // Check if adding would exceed maximum
    if (imageFiles.length + uploadedFiles.length > maxImages) {
      toast({
        title: "Upload limit exceeded",
        description: `You can only upload a maximum of ${maxImages} images.`,
        variant: "destructive"
      });
      return;
    }
    
    // If we already have files, check if the formats match
    if (imageFiles.length > 0 && uploadedFiles.length > 0) {
      const existingFormat = imageFiles[0].file.type;
      const newFormats = new Set(uploadedFiles.map(file => file.type));
      
      if (newFormats.size > 1 || !newFormats.has(existingFormat)) {
        toast({
          title: "Format mismatch",
          description: "All images must be of the same format. Please upload images with matching formats.",
          variant: "destructive"
        });
        return;
      }
    }

    const newImageFiles = uploadedFiles.map(file => {
      // Create URL for preview
      const imageUrl = URL.createObjectURL(file);
      
      // Determine default format based on uploaded file type
      let format: FormatOption = 'png';
      if (file.type === 'image/jpeg') format = 'png';
      else if (file.type === 'image/png') format = 'jpg';
      else if (file.type === 'image/webp') format = 'png';
      
      // Set format for the next conversion
      setSelectedFormat(format);
      
      return {
        file,
        originalUrl: imageUrl,
        convertedUrl: null,
        convertedFileName: getConvertedFileName(file, format),
        fileType: file.type,
        fileTypeDisplay: getFileTypeDisplay(file.type),
      };
    });

    setImageFiles([...imageFiles, ...newImageFiles]);
    setActiveImageIndex(imageFiles.length); // Select the first new image
  };
  
  // Handle conversion process
  const handleConvert = async () => {
    if (imageFiles.length === 0 || activeImageIndex < 0) {
      toast({
        title: "No image selected",
        description: "Please upload and select an image first.",
        variant: "destructive"
      });
      return;
    }

    // Don't allow conversion if format mismatch error exists
    if (formatMismatchError) {
      toast({
        title: "Format mismatch",
        description: "Cannot convert images with different formats. Please upload images of the same format.",
        variant: "destructive"
      });
      return;
    }

    setIsConverting(true);

    try {
      const updatedImageFiles = [...imageFiles];
      
      // If all images should be converted (batch conversion)
      for (let i = 0; i < updatedImageFiles.length; i++) {
        const imageFile = updatedImageFiles[i];
        
        // Use cropResult URL if available and active image index matches
        const sourceUrl = (cropResult && i === activeImageIndex) ? 
          cropResult : imageFile.originalUrl;
        
        // Create canvas for image conversion
        const img = new Image();
        img.crossOrigin = "anonymous"; // Handle CORS issues
        img.src = sourceUrl;
        
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () => reject(new Error("Failed to load image"));
        });

        const canvas = document.createElement('canvas');
        
        // Set canvas dimensions, respecting resize if specified
        if (i === activeImageIndex && (resizeDimensions.width || resizeDimensions.height)) {
          // Apply resize dimensions
          if (maintainResizeAspectRatio) {
            const aspectRatio = img.width / img.height;
            
            if (resizeDimensions.width && !resizeDimensions.height) {
              canvas.width = resizeDimensions.width;
              canvas.height = Math.round(resizeDimensions.width / aspectRatio);
            } else if (!resizeDimensions.width && resizeDimensions.height) {
              canvas.height = resizeDimensions.height;
              canvas.width = Math.round(resizeDimensions.height * aspectRatio);
            } else if (resizeDimensions.width && resizeDimensions.height) {
              canvas.width = resizeDimensions.width;
              canvas.height = resizeDimensions.height;
            }
          } else {
            canvas.width = resizeDimensions.width || img.width;
            canvas.height = resizeDimensions.height || img.height;
          }
        } else {
          canvas.width = img.width;
          canvas.height = img.height;
        }
        
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error("Failed to create canvas context");
        
        // Draw image on canvas
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Set quality options (only for JPG and WebP)
        const mimeType = `image/${selectedFormat === 'jpg' ? 'jpeg' : selectedFormat}`;
        const qualityOption = !['png', 'bmp', 'gif', 'ico'].includes(selectedFormat) ? quality / 100 : undefined;
        
        // Convert to new format
        const convertedImageUrl = canvas.toDataURL(mimeType, qualityOption);
        
        // Update the file entry
        updatedImageFiles[i] = {
          ...imageFile,
          convertedUrl: convertedImageUrl,
          convertedFileName: getConvertedFileName(imageFile.file, selectedFormat),
        };
      }
      
      setImageFiles(updatedImageFiles);
      // Reset crop data after conversion is complete
      setCropResult(null);
      setCropData(null);

      toast({
        title: "Conversion successful",
        description: `${updatedImageFiles.length} image(s) converted to ${selectedFormat.toUpperCase()}`,
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
        description: "Please upload and select an image first.",
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

  // Batch download all converted images
  const handleBatchDownload = () => {
    const convertedImages = imageFiles.filter(image => image.convertedUrl);
    
    if (convertedImages.length === 0) {
      toast({
        title: "No converted images",
        description: "Please convert your images first.",
        variant: "destructive"
      });
      return;
    }

    // Create download links for each converted image
    convertedImages.forEach((image, index) => {
      if (!image.convertedUrl) return;
      
      const link = document.createElement('a');
      link.href = image.convertedUrl;
      link.download = image.convertedFileName;
      document.body.appendChild(link);
      
      // Add a small delay between downloads
      setTimeout(() => {
        link.click();
        document.body.removeChild(link);
      }, index * 100);
    });

    toast({
      title: "Download started",
      description: `Downloading ${convertedImages.length} image(s)`,
    });
  };

  // Remove a specific image
  const handleRemoveImage = (indexToRemove: number) => {
    const updatedImageFiles = [...imageFiles];
    
    // Revoke the URL to prevent memory leaks
    if (updatedImageFiles[indexToRemove].originalUrl) {
      URL.revokeObjectURL(updatedImageFiles[indexToRemove].originalUrl);
    }
    if (updatedImageFiles[indexToRemove].convertedUrl && updatedImageFiles[indexToRemove].convertedUrl?.startsWith('blob:')) {
      URL.revokeObjectURL(updatedImageFiles[indexToRemove].convertedUrl);
    }
    
    // Remove the image from the array
    updatedImageFiles.splice(indexToRemove, 1);
    
    setImageFiles(updatedImageFiles);
    
    // Update active index if needed
    if (activeImageIndex === indexToRemove) {
      setActiveImageIndex(updatedImageFiles.length > 0 ? 0 : -1);
    } else if (activeImageIndex > indexToRemove) {
      setActiveImageIndex(activeImageIndex - 1);
    }

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
    hasMultipleFormats,
    formatMismatchError,
    isCropping,
    cropResult,
    resizeDimensions,
    setResizeDimensions,
    maintainResizeAspectRatio,
    setMaintainResizeAspectRatio,
    handleFileUpload,
    handleConvert,
    handleBatchDownload,
    handleRemoveImage,
    handleStartCropping,
    handleCropComplete,
    handleCancelCrop
  };
};
