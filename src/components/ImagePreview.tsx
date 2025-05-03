
import React from 'react';

interface ImagePreviewProps {
  originalImage: string;
  fileName: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ originalImage, fileName }) => {
  return (
    <div className="rounded-lg overflow-hidden border border-border animate-slide-in">
      <div className="aspect-video flex items-center justify-center bg-muted/30 overflow-hidden">
        <img
          src={originalImage}
          alt="Original"
          className="object-contain max-h-full max-w-full"
        />
      </div>
      <div className="p-3 bg-card">
        <p className="text-sm font-medium truncate" title={fileName}>
          {fileName}
        </p>
      </div>
    </div>
  );
};

export default ImagePreview;
