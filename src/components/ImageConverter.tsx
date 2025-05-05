
import React from 'react';
import FileUploader from './FileUploader';
import ConversionOptions from './ConversionOptions';
import ImagePreview from './ImagePreview';
import ConvertedImage from './ConvertedImage';
import ImageThumbnails from './ImageThumbnails';
import ImageTypeDisplay from './ImageTypeDisplay';
import FormatMismatchAlert from './FormatMismatchAlert';
import { Button } from '@/components/ui/button';
import { Download, ArrowRight } from 'lucide-react';
import { useImageConverter } from '../hooks/useImageConverter';

const MAX_IMAGES = 2;

const ImageConverter: React.FC = () => {
  const {
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
    handleFileUpload,
    handleConvert,
    handleBatchDownload,
    handleRemoveImage
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
          
          <FormatMismatchAlert 
            formatMismatchError={formatMismatchError} 
            hasMultipleFormats={hasMultipleFormats} 
          />
          
          {imageFiles.length > 0 && (
            <>
              <ImageTypeDisplay imageFiles={imageFiles} />

              <ImageThumbnails 
                imageFiles={imageFiles}
                activeImageIndex={activeImageIndex}
                setActiveImageIndex={setActiveImageIndex}
                handleRemoveImage={handleRemoveImage}
              />

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
          <ImageThumbnails 
            imageFiles={imageFiles}
            activeImageIndex={activeImageIndex}
            setActiveImageIndex={setActiveImageIndex}
            handleRemoveImage={handleRemoveImage}
            isConverted={true}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageConverter;
