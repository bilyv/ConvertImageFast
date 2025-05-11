
/**
 * FileUploader Component
 *
 * This component provides a drag-and-drop interface and file selection button
 * for uploading image files. It supports:
 * - Drag and drop functionality
 * - File selection via system dialog
 * - File type validation
 * - File size validation
 * - Disabled state when an image is already uploaded
 */
import React, { useState, useRef } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { FileImage } from 'lucide-react';
import { isSupportedFileType } from '@/utils/imageUtils';

interface FileUploaderProps {
  /**
   * Callback function that receives the uploaded files
   * @param files Array of File objects that were uploaded
   */
  onFileUpload: (files: File[]) => void;

  /**
   * Whether there's already a file uploaded
   * When true, the uploader will be disabled
   */
  hasExistingFile?: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onFileUpload,
  hasExistingFile = false
}) => {
  // Track whether a file is being dragged over the drop zone
  const [isDragging, setIsDragging] = useState(false);

  // Reference to the hidden file input element
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Toast notifications for user feedback
  const { toast } = useToast();

  /**
   * Handle when a file is dragged into the drop zone
   * Sets the isDragging state to true to show visual feedback
   */
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  /**
   * Handle when a file is dragged out of the drop zone
   * Resets the isDragging state
   */
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  /**
   * Handle when a file is being dragged over the drop zone
   * Prevents default browser behavior
   */
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  /**
   * Handle when a file is dropped onto the drop zone
   * Processes the first file from the drop event
   */
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0]; // Take only the first file
      validateAndProcessFile(droppedFile);
    }
  };

  /**
   * Handle when a file is selected via the file input
   * Processes the first file from the selection
   */
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]; // Take only the first file
      validateAndProcessFile(selectedFile);
    }
  };

  /**
   * Validate and process the uploaded file
   *
   * Checks:
   * 1. File type is supported (JPG, PNG, WebP, JFIF)
   * 2. File size is within limits (max 10MB)
   *
   * If validation passes, calls the onFileUpload callback
   */
  const validateAndProcessFile = (file: File) => {
    // Validate file type using the isSupportedFileType utility function
    // This checks both MIME type and file extension for better compatibility
    if (!isSupportedFileType(file.type) && !isSupportedFileType(file.name)) {
      toast({
        title: "Unsupported file format",
        description: "Only JPG, PNG, WebP, JFIF, BMP, GIF, HEIC, SVG, PDF, TIFF, and ICO files are supported.",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (max 10MB)
    const maxSizeMB = 10;
    if (file.size > maxSizeMB * 1024 * 1024) {
      toast({
        title: "File too large",
        description: `File must be smaller than ${maxSizeMB}MB.`,
        variant: "destructive"
      });
      return;
    }

    // Pass the validated file to the parent component
    onFileUpload([file]);
  };

  /**
   * Trigger the hidden file input when the button is clicked
   */
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Flag to determine if the uploader is in a disabled state
  const isUploadDisabled = hasExistingFile;

  /**
   * Render the file uploader component with:
   * - A drop zone area with visual feedback for drag states
   * - A hidden file input triggered by the button
   * - Visual indicators for enabled/disabled states
   * - Clear instructions for the user
   */
  return (
    <div
      className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all ${
        isDragging ? 'drop-zone-active' : 'border-muted-foreground/30 hover:border-muted-foreground/50'
      } ${isUploadDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      onDragEnter={!isUploadDisabled ? handleDragEnter : undefined}
      onDragLeave={!isUploadDisabled ? handleDragLeave : undefined}
      onDragOver={!isUploadDisabled ? handleDragOver : undefined}
      onDrop={!isUploadDisabled ? handleDrop : undefined}
      onClick={!isUploadDisabled ? handleButtonClick : undefined}
      aria-disabled={isUploadDisabled}
    >
      {/* Hidden file input element, triggered by button click */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={!isUploadDisabled ? handleFileInputChange : undefined}
        accept="image/jpeg,image/png,image/webp,image/jfif,image/bmp,image/gif,image/heic,image/heif,image/svg+xml,application/pdf,image/tiff,image/x-icon,image/vnd.microsoft.icon"
        className="hidden"
        disabled={isUploadDisabled}
        aria-label="Upload image file"
      />

      {/* Content container */}
      <div className="flex flex-col items-center justify-center">
        {/* File icon */}
        <FileImage className={`h-12 w-12 ${isUploadDisabled ? 'text-muted-foreground/50' : 'text-app-primary'} mb-3`} />

        {/* Conditional content based on disabled state */}
        {isUploadDisabled ? (
          <p className="text-lg font-medium mb-1">Image already uploaded</p>
        ) : (
          <>
            <p className="text-lg font-medium mb-1">Drag & drop image here</p>
            <p className="text-sm text-muted-foreground mb-3">
              or click to browse (JPG, PNG, WebP, JFIF, BMP, GIF, HEIC, SVG, PDF, TIFF, ICO)
            </p>
          </>
        )}

        {/* Upload button */}
        <button
          type="button"
          className={`${
            isUploadDisabled
              ? 'bg-muted text-muted-foreground cursor-not-allowed'
              : 'bg-app-primary text-white hover:bg-app-primary/90'
          } font-medium rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-app-primary/50`}
          onClick={(e) => {
            e.stopPropagation();
            if (!isUploadDisabled) handleButtonClick();
          }}
          disabled={isUploadDisabled}
        >
          {isUploadDisabled ? 'Replace Image' : 'Select Image'}
        </button>

        {/* File restrictions information */}
        <p className="text-xs text-muted-foreground mt-2">
          Maximum 1 image • Max 10MB per file
        </p>
      </div>
    </div>
  );
};

export default FileUploader;
