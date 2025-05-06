
import React from 'react';
import { FileImage } from 'lucide-react';
import { ImageFile } from '../utils/imageUtils';
import { Badge } from '@/components/ui/badge';

interface ImageTypeDisplayProps {
  imageFiles: ImageFile[];
}

const ImageTypeDisplay: React.FC<ImageTypeDisplayProps> = ({ imageFiles }) => {
  if (imageFiles.length === 0) return null;
  
  // Check if all images are of the same type
  const allSameType = imageFiles.every(image => image.fileType === imageFiles[0].fileType);
  
  return (
    <div className="mt-4 p-3 bg-muted/30 rounded-md border border-border">
      <div className="flex items-center space-x-2">
        <FileImage className="h-4 w-4 text-app-primary" />
        <span className="text-sm font-medium">Image Types:</span>
        {imageFiles.length > 1 && (
          <Badge 
            variant={allSameType ? "default" : "destructive"} 
            className="text-xs">
            {allSameType ? "Matching Formats" : "Mixed Formats"}
          </Badge>
        )}
      </div>
      <div className="mt-2 space-y-1">
        {imageFiles.map((image, index) => (
          <div key={`type-${index}`} className="flex justify-between items-center text-sm">
            <span className="truncate max-w-[70%]">{image.file.name}</span>
            <Badge 
              variant="outline" 
              className="bg-app-primary/10 text-app-primary border-app-primary/20">
              {image.fileTypeDisplay}
            </Badge>
          </div>
        ))}
      </div>
      {imageFiles.length > 1 && !allSameType && (
        <p className="mt-2 text-xs text-destructive">
          Warning: Converting images with different formats may lead to inconsistent results.
        </p>
      )}
    </div>
  );
};

export default ImageTypeDisplay;
