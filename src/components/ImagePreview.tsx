
/**
 * ImagePreview Component
 *
 * This component displays a preview of the image that has been uploaded or processed.
 * It shows the image in a container with the filename displayed below.
 *
 * The component automatically updates when the original image changes.
 */
import React, { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ImagePreviewProps {
  /**
   * The URL of the original or processed image to display
   * Can be a data URL or an object URL
   */
  originalImage: string;

  /**
   * The name of the file to display below the image
   */
  fileName: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ originalImage, fileName }) => {
  // State to hold the current preview image URL
  const [previewImage, setPreviewImage] = useState<string>(originalImage);

  // References to DOM elements for direct manipulation if needed
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Toast notifications for user feedback
  const { toast } = useToast();

  /**
   * Update the preview image whenever the original image changes
   * This ensures the preview always shows the most current version
   */
  React.useEffect(() => {
    setPreviewImage(originalImage);
  }, [originalImage]);

  /**
   * Render the image preview with the following elements:
   * - A container with rounded corners and a border
   * - The image itself, contained within the dimensions of the container
   * - A hidden canvas element for any image processing operations
   * - The filename displayed below the image
   */
  return (
    <div className="rounded-lg overflow-hidden border border-border animate-slide-in">
      {/* Image container with aspect ratio preservation */}
      <div className="aspect-video flex items-center justify-center bg-muted/30 overflow-hidden relative">
        <img
          ref={imageRef}
          src={previewImage}
          alt="Original"
          className="object-contain max-h-full max-w-full"
        />

        {/* Hidden canvas for image processing operations */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>

      {/* Filename display area */}
      <div className="p-3 bg-card">
        <p className="text-sm font-medium truncate" title={fileName}>
          {fileName}
        </p>
      </div>
    </div>
  );
};

export default ImagePreview;
