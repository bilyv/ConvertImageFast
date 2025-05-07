
import React from 'react';
import FileUploader from './FileUploader';
import ConversionOptions from './ConversionOptions';
import ImagePreview from './ImagePreview';
import ConvertedImage from './ConvertedImage';
import ImageTypeDisplay from './ImageTypeDisplay';
import ImageCropper from './ImageCropper';
import FormatMismatchAlert from './FormatMismatchAlert';
import { Button } from '@/components/ui/button';
import { Crop, ArrowRight } from 'lucide-react';
import { useImageConverter } from '../hooks/useImageConverter';

const MAX_IMAGES = 1; // Now we only allow 1 image

const ImageConverter: React.FC = () => {
  const {
    imageFiles,
    selectedFormat,
    setSelectedFormat,
    quality,
    setQuality,
    isConverting,
    activeImageIndex,
    isCropping,
    cropResult,
    handleFileUpload,
    handleConvert,
    handleDownload,
    handleRemoveImage,
    handleStartCropping,
    handleCropComplete,
    handleCancelCrop
  } = useImageConverter(MAX_IMAGES);

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
          
          {imageFiles.length > 0 && (
            <>
              <ImageTypeDisplay imageFiles={imageFiles} />

              {activeImageIndex >= 0 && activeImageIndex < imageFiles.length && !isCropping && (
                <>
                  <div className="mt-4">
                    <ImagePreview 
                      originalImage={cropResult || imageFiles[activeImageIndex].originalUrl} 
                      fileName={imageFiles[activeImageIndex].file.name} 
                    />
                    <div className="mt-2 flex justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleStartCropping}
                        className="flex items-center"
                      >
                        <Crop className="h-4 w-4 mr-1" />
                        Crop Image
                      </Button>
                    </div>
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
                      className="w-full bg-app-primary hover:bg-app-primary/90 text-white mt-4 conversion-button"
                      onClick={handleConvert}
                      disabled={isConverting}
                    >
                      {isConverting ? 'Converting...' : 'Convert Image'}
                      {!isConverting && <ArrowRight className="ml-2 h-4 w-4 animate-slide-right" />}
                    </Button>
                  </div>
                </>
              )}
              
              {isCropping && activeImageIndex >= 0 && activeImageIndex < imageFiles.length && (
                <div className="mt-4 space-y-4">
                  <h2 className="text-xl font-semibold">Crop Image</h2>
                  <ImageCropper 
                    imageUrl={imageFiles[activeImageIndex].originalUrl}
                    onCropComplete={handleCropComplete}
                    onCancel={handleCancelCrop}
                  />
                </div>
              )}
            </>
          )}
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Output</h2>
          </div>

          {activeImageIndex >= 0 && activeImageIndex < imageFiles.length ? (
            <ConvertedImage
              convertedImage={imageFiles[activeImageIndex].convertedUrl}
              convertedFileName={imageFiles[activeImageIndex].convertedFileName}
              isConverting={isConverting}
            />
          ) : (
            <div className="rounded-lg overflow-hidden border border-border h-64 flex items-center justify-center bg-muted/30">
              <p className="text-muted-foreground text-sm">Convert an image to see the result</p>
            </div>
          )}
          
          {imageFiles.length > 0 && imageFiles[0].convertedUrl && (
            <div className="mt-4 flex justify-end">
              <Button 
                variant="outline"
                onClick={handleDownload}
                className="bg-app-accent hover:bg-app-accent/90 text-white border-none"
              >
                Download Converted Image
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageConverter;
