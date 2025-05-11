
/**
 * ImagePreview Component
 *
 * This component displays a preview of the image that has been uploaded or processed.
 * It shows the image in a container with the filename displayed below.
 * It also provides a "Create Puzzle" button for supported image formats.
 *
 * The component automatically updates when the original image changes.
 */
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Puzzle } from 'lucide-react';
import { isPuzzleSupportedFormat } from '@/utils/puzzleUtils';
import SocialMediaDropdown from './SocialMediaDropdown';

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

  /**
   * The MIME type of the image file
   */
  fileType: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ originalImage, fileName, fileType }) => {
  // State to hold the current preview image URL
  const [previewImage, setPreviewImage] = useState<string>(originalImage);

  // References to DOM elements for direct manipulation if needed
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Toast notifications for user feedback
  const { toast } = useToast();

  // Navigation hook for redirecting to the puzzle page
  const navigate = useNavigate();

  /**
   * Update the preview image whenever the original image changes
   * This ensures the preview always shows the most current version
   */
  React.useEffect(() => {
    setPreviewImage(originalImage);
  }, [originalImage]);

  /**
   * Handle the create puzzle button click
   * Simply navigates to the puzzle page
   */
  const handleCreatePuzzle = () => {
    // Simply navigate to the puzzle page
    navigate('/puzzle');

    toast({
      title: 'Create a Puzzle',
      description: 'Upload an image to create your custom puzzle.',
      variant: 'default'
    });
  };

  /**
   * Render the image preview with the following elements:
   * - A container with rounded corners and a border
   * - The image itself, contained within the dimensions of the container
   * - A hidden canvas element for any image processing operations
   * - The filename displayed below the image
   * - A "Create Puzzle" button for supported formats
   */
  return (
    <>
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
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium truncate" title={fileName}>
              {fileName}
            </p>

            {/* Action buttons */}
            <div className="flex items-center gap-2">
              {/* Social Media Dropdown */}
              <SocialMediaDropdown
                imageUrl={originalImage}
                fileName={fileName}
                onPlatformSelect={(platformId) => {
                  // The platform selection is handled by the dropdown component
                  // and saved in localStorage for use in the thank you page
                }}
              />

              {/* Create Puzzle button */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleCreatePuzzle}
                className="flex items-center gap-1"
              >
                <Puzzle className="h-4 w-4" />
                Create Puzzle
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImagePreview;
