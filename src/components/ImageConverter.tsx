
import React, { useState, useEffect } from 'react';
import FileUploader from './FileUploader';
import ConversionOptions, { FormatOption } from './ConversionOptions';
import ImagePreview from './ImagePreview';
import ConvertedImage from './ConvertedImage';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import { ArrowRight } from 'lucide-react';

const ImageConverter: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [convertedImage, setConvertedImage] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<FormatOption>('jpg');
  const [quality, setQuality] = useState<number>(85);
  const [isConverting, setIsConverting] = useState(false);
  const { toast } = useToast();

  // When a file is uploaded, update state and reset converted image
  const handleFileUpload = (uploadedFile: File) => {
    setFile(uploadedFile);
    setConvertedImage(null);
    
    // Create URL for preview
    const imageUrl = URL.createObjectURL(uploadedFile);
    setOriginalImage(imageUrl);
    
    // Set default format based on uploaded file type
    const fileType = uploadedFile.type;
    if (fileType === 'image/jpeg') {
      setSelectedFormat('png');  // Default to PNG if JPG is uploaded
    } else if (fileType === 'image/png') {
      setSelectedFormat('jpg');  // Default to JPG if PNG is uploaded
    } else if (fileType === 'image/webp') {
      setSelectedFormat('png');  // Default to PNG if WebP is uploaded
    }
  };

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      if (originalImage) URL.revokeObjectURL(originalImage);
      if (convertedImage && convertedImage.startsWith('blob:')) {
        URL.revokeObjectURL(convertedImage);
      }
    };
  }, [originalImage, convertedImage]);

  // Handle conversion process
  const handleConvert = async () => {
    if (!file || !originalImage) {
      toast({
        title: "No image selected",
        description: "Please upload an image first.",
        variant: "destructive"
      });
      return;
    }

    setIsConverting(true);

    try {
      // Create canvas for image conversion
      const img = new Image();
      img.src = originalImage;
      
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
      const qualityOption = selectedFormat !== 'png' ? quality / 100 : undefined;
      
      // Convert to new format
      const convertedImageUrl = canvas.toDataURL(mimeType, qualityOption);
      setConvertedImage(convertedImageUrl);

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

  // Generate file name for the converted image
  const getConvertedFileName = () => {
    if (!file) return '';
    
    // Extract name without extension
    const originalName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
    return `${originalName}.${selectedFormat}`;
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
          <FileUploader onFileUpload={handleFileUpload} />
          
          {originalImage && (
            <>
              <div className="mt-6">
                <ImagePreview originalImage={originalImage} fileName={file?.name || ''} />
              </div>
              
              <div className="mt-6 space-y-4">
                <h2 className="text-xl font-semibold">Conversion Options</h2>
                <ConversionOptions
                  currentFileType={file?.type || null}
                  selectedFormat={selectedFormat}
                  quality={quality}
                  onFormatChange={setSelectedFormat}
                  onQualityChange={setQuality}
                />
                
                <Button 
                  className="w-full bg-app-primary hover:bg-app-primary/90 text-white mt-4"
                  onClick={handleConvert}
                  disabled={isConverting}
                >
                  {isConverting ? 'Converting...' : 'Convert Image'}
                  {!isConverting && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </div>
            </>
          )}
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Output</h2>
          <ConvertedImage
            convertedImage={convertedImage}
            convertedFileName={getConvertedFileName()}
            isConverting={isConverting}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageConverter;
