
import React, { useState, useRef } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { FileImage } from 'lucide-react';

interface FileUploaderProps {
  onFileUpload: (files: File[]) => void;
  currentFileCount: number;
  maxFiles?: number;
}

const FileUploader: React.FC<FileUploaderProps> = ({ 
  onFileUpload, 
  currentFileCount, 
  maxFiles = 1  // Default to 1 now
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];  // Take only the first file
      validateAndProcessFile(droppedFile);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];  // Take only the first file
      validateAndProcessFile(selectedFile);
    }
  };

  const validateAndProcessFile = (file: File) => {
    // Check if we already have an image
    if (currentFileCount >= maxFiles) {
      toast({
        title: "Image already uploaded",
        description: "Please remove the current image before uploading a new one.",
        variant: "destructive"
      });
      return;
    }
    
    // Filter valid image types (now including JFIF)
    const validImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/bmp', 'image/gif', 'image/tiff', 'image/avif', 'image/x-icon', 'image/jfif'];
    if (!validImageTypes.includes(file.type)) {
      toast({
        title: "Unsupported file type",
        description: "Please upload a supported image format (JPG, PNG, WebP, BMP, GIF, TIFF, AVIF, ICO, JFIF).",
        variant: "destructive"
      });
      return;
    }
    
    // Check file size (max 10MB)
    const maxSizeMB = 10;
    if (file.size > maxSizeMB * 1024 * 1024) {
      toast({
        title: "File too large",
        description: `Please upload an image smaller than ${maxSizeMB}MB.`,
        variant: "destructive"
      });
      return;
    }

    onFileUpload([file]);
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const isUploadDisabled = currentFileCount >= maxFiles;

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
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={!isUploadDisabled ? handleFileInputChange : undefined}
        accept="image/jpeg,image/png,image/webp,image/bmp,image/gif,image/tiff,image/avif,image/x-icon,image/jfif"
        className="hidden"
        disabled={isUploadDisabled}
      />
      <div className="flex flex-col items-center justify-center">
        <FileImage className={`h-12 w-12 ${isUploadDisabled ? 'text-muted-foreground/50' : 'text-app-primary'} mb-3 ${isUploadDisabled ? '' : 'animate-pulse'}`} />
        {isUploadDisabled ? (
          <p className="text-lg font-medium mb-1">Image already uploaded</p>
        ) : (
          <>
            <p className="text-lg font-medium mb-1">Drag & drop an image here</p>
            <p className="text-sm text-muted-foreground mb-3">
              or click to browse
            </p>
          </>
        )}
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
          {isUploadDisabled ? 'Remove Current Image' : 'Select Image'}
        </button>
        <p className="text-xs text-muted-foreground mt-2">
          Supported formats: JPG, PNG, WebP, BMP, GIF, TIFF, AVIF, ICO, JFIF • Max 10MB
        </p>
      </div>
    </div>
  );
};

export default FileUploader;
