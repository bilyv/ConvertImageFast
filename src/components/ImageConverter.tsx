
import React, { useState, useEffect } from 'react';
import FileUploader from './FileUploader';
import ConversionOptions, { FormatOption } from './ConversionOptions';
import ImagePreview from './ImagePreview';
import ConvertedImage from './ConvertedImage';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import { ArrowRight, Download, X, FileType, AlertTriangle } from 'lucide-react';

interface ImageFile {
  file: File;
  originalUrl: string;
  convertedUrl: string | null;
  convertedFileName: string;
  fileType: string;
  fileTypeDisplay: string;
}

const ImageConverter: React.FC = () => {
  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  const [selectedFormat, setSelectedFormat] = useState<FormatOption>('jpg');
  const [quality, setQuality] = useState<number>(85);
  const [isConverting, setIsConverting] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(-1);
  const [hasMultipleFormats, setHasMultipleFormats] = useState(false);
  const [formatMismatchError, setFormatMismatchError] = useState(false);
  const { toast } = useToast();
  
  const MAX_IMAGES = 2;

  // Get readable format name from mimetype
  const getFileTypeDisplay = (mimeType: string): string => {
    switch (mimeType) {
      case 'image/jpeg': return 'JPEG';
      case 'image/png': return 'PNG';
      case 'image/webp': return 'WebP';
      case 'image/bmp': return 'BMP';
      case 'image/gif': return 'GIF';
      case 'image/tiff': return 'TIFF';
      case 'image/avif': return 'AVIF';
      case 'image/x-icon': return 'ICO';
      default: return 'Unknown';
    }
  };

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
    if (imageFiles.length + uploadedFiles.length > MAX_IMAGES) {
      toast({
        title: "Upload limit exceeded",
        description: `You can only upload a maximum of ${MAX_IMAGES} images.`,
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

  // Generate file name for the converted image
  const getConvertedFileName = (file: File, format: FormatOption) => {
    // Extract name without extension
    const originalName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
    return `${originalName}.${format}`;
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
        
        // Create canvas for image conversion
        const img = new Image();
        img.src = imageFile.originalUrl;
        
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () => reject(new Error("Failed to load image"));
        });

        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error("Failed to create canvas context");
        
        // Draw image on canvas
        ctx.drawImage(img, 0, 0);
        
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

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
          <FileUploader 
            onFileUpload={handleFileUpload} 
            currentFileCount={imageFiles.length}
            maxFiles={MAX_IMAGES}
          />
          
          {formatMismatchError && (
            <Alert className="mt-4 bg-red-50 border-red-200">
              <AlertTriangle className="h-4 w-4 text-red-600 mr-2" />
              <AlertDescription className="text-red-800">
                <strong>Error:</strong> Images have different formats. Please upload images with the same format for batch conversion.
              </AlertDescription>
            </Alert>
          )}
          
          {hasMultipleFormats && !formatMismatchError && (
            <Alert className="mt-4 bg-amber-50 border-amber-200">
              <AlertDescription className="text-amber-800">
                <strong>Notice:</strong> You've uploaded images with different formats. All selected images will be converted to the same output format.
              </AlertDescription>
            </Alert>
          )}
          
          {imageFiles.length > 0 && (
            <>
              {/* Image Type Display */}
              <div className="mt-4 p-3 bg-muted/30 rounded-md border border-border">
                <div className="flex items-center space-x-2">
                  <FileType className="h-4 w-4 text-app-primary" />
                  <span className="text-sm font-medium">Image Types:</span>
                </div>
                <div className="mt-2 space-y-1">
                  {imageFiles.map((image, index) => (
                    <div key={`type-${index}`} className="flex justify-between items-center text-sm">
                      <span className="truncate max-w-[70%]">{image.file.name}</span>
                      <span className="bg-app-primary/10 text-app-primary px-2 py-0.5 rounded-full text-xs">
                        {image.fileTypeDisplay}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-md font-medium mb-2">Uploaded Images ({imageFiles.length}/{MAX_IMAGES})</h3>
                <div className="flex overflow-x-auto pb-2 gap-2">
                  {imageFiles.map((image, index) => (
                    <div 
                      key={`thumb-${index}`} 
                      className="relative"
                    >
                      <div 
                        className={`w-16 h-16 flex-shrink-0 rounded cursor-pointer overflow-hidden border-2 transition-all
                                  ${activeImageIndex === index ? 'border-app-primary' : 'border-border'}`}
                        onClick={() => setActiveImageIndex(index)}
                      >
                        <img 
                          src={image.originalUrl} 
                          alt={`Thumbnail ${index+1}`}
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600 transition-colors"
                        title="Remove image"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {activeImageIndex >= 0 && activeImageIndex < imageFiles.length && (
                <>
                  <div className="mt-4">
                    <ImagePreview 
                      originalImage={imageFiles[activeImageIndex].originalUrl} 
                      fileName={imageFiles[activeImageIndex].file.name} 
                    />
                  </div>
                  
                  <div className="mt-6 space-y-4">
                    <h2 className="text-xl font-semibold">Conversion Options</h2>
                    <ConversionOptions
                      currentFileType={imageFiles[activeImageIndex].file.type}
                      selectedFormat={selectedFormat}
                      quality={quality}
                      onFormatChange={setSelectedFormat}
                      onQualityChange={setQuality}
                    />
                    
                    <Button 
                      className="w-full bg-app-primary hover:bg-app-primary/90 text-white mt-4"
                      onClick={handleConvert}
                      disabled={isConverting || formatMismatchError}
                    >
                      {isConverting ? 'Converting...' : `Convert ${imageFiles.length > 1 ? 'All Images' : 'Image'}`}
                      {!isConverting && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Output</h2>
            {imageFiles.some(img => img.convertedUrl) && (
              <Button 
                variant="outline"
                onClick={handleBatchDownload}
                className="bg-app-accent hover:bg-app-accent/90 text-white border-none"
              >
                <Download className="h-4 w-4 mr-1" />
                Download All
              </Button>
            )}
          </div>

          {activeImageIndex >= 0 && activeImageIndex < imageFiles.length ? (
            <ConvertedImage
              convertedImage={imageFiles[activeImageIndex].convertedUrl}
              convertedFileName={imageFiles[activeImageIndex].convertedFileName}
              isConverting={isConverting}
            />
          ) : (
            <div className="rounded-lg overflow-hidden border border-border h-64 flex items-center justify-center bg-muted/30">
              <p className="text-muted-foreground text-sm">Select an image to convert</p>
            </div>
          )}
          
          {/* Show thumbnails of all converted images */}
          {imageFiles.some(img => img.convertedUrl) && (
            <div className="mt-6">
              <h3 className="text-md font-medium mb-2">Converted Images</h3>
              <div className="flex overflow-x-auto pb-2 gap-2">
                {imageFiles.map((image, index) => (
                  image.convertedUrl && (
                    <div 
                      key={`converted-thumb-${index}`} 
                      className={`w-16 h-16 flex-shrink-0 rounded cursor-pointer overflow-hidden border-2 transition-all
                                ${activeImageIndex === index ? 'border-app-primary' : 'border-border'}`}
                      onClick={() => setActiveImageIndex(index)}
                    >
                      <img 
                        src={image.convertedUrl} 
                        alt={`Converted ${index+1}`}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  )
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageConverter;
