
import React from 'react';
import { ImageFile, getFileTypeDisplay, isJfifImage, isHeicImage } from '../utils/imageUtils';

interface ImageTypeDisplayProps {
  imageFile: ImageFile | null;
}

const ImageTypeDisplay: React.FC<ImageTypeDisplayProps> = ({ imageFile }) => {
  if (!imageFile) return null;

  // Determine the correct file type display
  let displayType = imageFile.fileTypeDisplay;

  // Special handling for files that might be misidentified
  if (imageFile.file) {
    // Check for JFIF files
    if (isJfifImage(imageFile.file)) {
      displayType = 'JFIF Image (.jfif)';
    }
    // Check for HEIC files
    else if (isHeicImage(imageFile.file) && displayType !== 'HEIC Image (.heic)') {
      displayType = 'HEIC Image (.heic)';
    }
    // If still unknown, try to determine from file name
    else if (displayType === 'Unknown Image Format') {
      const typeFromName = getFileTypeDisplay(imageFile.file.name);
      if (typeFromName !== 'Unknown Image Format') {
        displayType = typeFromName;
      }
    }
  }

  return (
    <div className="mt-4 p-3 bg-muted/30 rounded-lg border border-border">
      <p className="text-sm text-muted-foreground">
        <span className="font-medium">Image type:</span> {displayType}
      </p>
    </div>
  );
};

export default ImageTypeDisplay;
