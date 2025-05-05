
import React from 'react';
import { X } from 'lucide-react';
import { ImageFile } from '../utils/imageUtils';

interface ImageThumbnailsProps {
  imageFiles: ImageFile[];
  activeImageIndex: number;
  setActiveImageIndex: (index: number) => void;
  handleRemoveImage: (index: number) => void;
  isConverted?: boolean;
}

const ImageThumbnails: React.FC<ImageThumbnailsProps> = ({
  imageFiles,
  activeImageIndex,
  setActiveImageIndex,
  handleRemoveImage,
  isConverted = false
}) => {
  // Filter only the converted images if isConverted is true
  const filesToShow = isConverted
    ? imageFiles.filter(img => img.convertedUrl)
    : imageFiles;

  if (filesToShow.length === 0) return null;
  
  return (
    <div className="mt-6">
      <h3 className="text-md font-medium mb-2">
        {isConverted ? 'Converted Images' : `Uploaded Images (${imageFiles.length}/2)`}
      </h3>
      <div className="flex overflow-x-auto pb-2 gap-2">
        {filesToShow.map((image, index) => (
          <div 
            key={`${isConverted ? 'converted' : 'original'}-thumb-${index}`} 
            className="relative"
          >
            <div 
              className={`w-16 h-16 flex-shrink-0 rounded cursor-pointer overflow-hidden border-2 transition-all
                        ${activeImageIndex === index ? 'border-app-primary' : 'border-border'}`}
              onClick={() => setActiveImageIndex(index)}
            >
              <img 
                src={isConverted ? image.convertedUrl! : image.originalUrl} 
                alt={`${isConverted ? 'Converted' : 'Thumbnail'} ${index+1}`}
                className="w-full h-full object-cover" 
              />
            </div>
            {!isConverted && (
              <button
                onClick={() => handleRemoveImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600 transition-colors"
                title="Remove image"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageThumbnails;
