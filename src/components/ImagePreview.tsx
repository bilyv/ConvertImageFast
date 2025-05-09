
import React, { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ImagePreviewProps {
  originalImage: string;
  fileName: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ originalImage, fileName }) => {
  const [previewImage, setPreviewImage] = useState<string>(originalImage);
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  // Update preview image when original image changes
  React.useEffect(() => {
    setPreviewImage(originalImage);
  }, [originalImage]);

  return (
    <div className="rounded-lg overflow-hidden border border-border animate-slide-in">
      <div className="aspect-video flex items-center justify-center bg-muted/30 overflow-hidden relative">
        <img
          ref={imageRef}
          src={previewImage}
          alt="Original"
          className="object-contain max-h-full max-w-full"
        />

        {/* Hidden canvas for processing */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
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
