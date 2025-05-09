
import React from 'react';
import FileUploader from './FileUploader';
import ConversionOptions from './ConversionOptions';
import ImagePreview from './ImagePreview';
import ImageTypeDisplay from './ImageTypeDisplay';
import ImageCropper from './ImageCropper';
import { Button } from '@/components/ui/button';
import { ArrowRight, Crop } from 'lucide-react';
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
    resizeDimensions,
    setResizeDimensions,
    maintainResizeAspectRatio,
    setMaintainResizeAspectRatio,
    isCircularMode,
    setIsCircularMode,
    circleDiameter,
    setCircleDiameter,
    resizeApplied,
    applyResize,
    resetResize,
    handleFileUpload,
    handleConvert,
    handleRemoveImage,
    handleStartCropping,
    handleCropComplete,
    handleCancelCrop
  } = useImageConverter();

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Upload & Convert Image</h2>
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
                  
                  <div className="mt-6 space-y-6">
                    <div className="p-4 border border-border rounded-lg bg-card">
                      <h2 className="text-lg font-semibold mb-4">Conversion Options</h2>
                      <ConversionOptions
                        currentFileType={imageFile.file.type}
                        selectedFormat={selectedFormat}
                        quality={quality}
                        onFormatChange={setSelectedFormat}
                        onQualityChange={setQuality}
                      />
                    </div>
                    
                    <Button 
                      className="w-full bg-app-primary hover:bg-app-primary/90 text-white"
                      onClick={handleConvert}
                      disabled={isConverting}
                    >
                      {isConverting ? 'Converting...' : 'Convert & Download Image'}
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
      </div>
    </div>
  );
};

export default ImageConverter;
