
import React from 'react';
import FileUploader from './FileUploader';
import ConversionOptions from './ConversionOptions';
import ImagePreview from './ImagePreview';
import ConvertedImage from './ConvertedImage';
import ImageTypeDisplay from './ImageTypeDisplay';
import ImageCropper from './ImageCropper';
import FormatMismatchAlert from './FormatMismatchAlert';
import { Button } from '@/components/ui/button';
import { Download, ArrowRight, Crop } from 'lucide-react';
import { useImageConverter } from '../hooks/useImageConverter';

const ImageConverter: React.FC = () => {
  const {
    imageFile,
    selectedFormat,
    setSelectedFormat,
    quality,
    setQuality,
    isConverting,
    isCropping,
    cropResult,
    handleFileUpload,
    handleConvert,
    handleDownload,
    handleRemoveImage,
    handleStartCropping,
    handleCropComplete,
    handleCancelCrop
  } = useImageConverter();

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
          <FileUploader 
            onFileUpload={handleFileUpload} 
            hasExistingFile={!!imageFile}
          />
          
          {imageFile && (
            <>
              <ImageTypeDisplay imageFile={imageFile} />

              {!isCropping && (
                <>
                  <div className="mt-4">
                    <ImagePreview 
                      originalImage={cropResult || imageFile.originalUrl} 
                      fileName={imageFile.file.name} 
                    />
                    <div className="mt-2 flex justify-between">
                      <Button
                        variant="outline" 
                        size="sm"
                        onClick={handleRemoveImage}
                        className="text-destructive hover:text-destructive"
                      >
                        Remove Image
                      </Button>
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
                      currentFileType={imageFile.file.type}
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
              
              {isCropping && (
                <div className="mt-4 space-y-4">
                  <h2 className="text-xl font-semibold">Crop Image</h2>
                  <ImageCropper 
                    imageUrl={imageFile.originalUrl}
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
            {imageFile?.convertedUrl && (
              <Button 
                variant="outline"
                onClick={handleDownload}
                className="bg-app-accent hover:bg-app-accent/90 text-white border-none"
              >
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            )}
          </div>

          {imageFile ? (
            <ConvertedImage
              convertedImage={imageFile.convertedUrl}
              convertedFileName={imageFile.convertedFileName}
              isConverting={isConverting}
            />
          ) : (
            <div className="rounded-lg overflow-hidden border border-border h-64 flex items-center justify-center bg-muted/30">
              <p className="text-muted-foreground text-sm">Upload an image to convert</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageConverter;
