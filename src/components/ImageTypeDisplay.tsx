
import React from 'react';
import { FileType } from 'lucide-react';
import { ImageFile } from '../utils/imageUtils';

interface ImageTypeDisplayProps {
  imageFiles: ImageFile[];
}

const ImageTypeDisplay: React.FC<ImageTypeDisplayProps> = ({ imageFiles }) => {
  if (imageFiles.length === 0) return null;
  
  return (
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
  );
};

export default ImageTypeDisplay;
