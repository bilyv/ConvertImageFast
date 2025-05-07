
import React from 'react';
import { ImageFile } from '../utils/imageUtils';

interface ImageTypeDisplayProps {
  imageFile: ImageFile | null;
}

const ImageTypeDisplay: React.FC<ImageTypeDisplayProps> = ({ imageFile }) => {
  if (!imageFile) return null;
  
  return (
    <div className="mt-4 p-3 bg-muted/30 rounded-lg border border-border">
      <p className="text-sm text-muted-foreground">
        <span className="font-medium">Image type:</span> {imageFile.fileTypeDisplay}
      </p>
    </div>
  );
};

export default ImageTypeDisplay;
