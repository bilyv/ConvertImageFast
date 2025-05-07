
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
  maxFiles = 2 
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
      const droppedFiles = Array.from(e.dataTransfer.files);
      validateAndProcessFiles(droppedFiles);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      validateAndProcessFiles(selectedFiles);
    }
  };

  const validateAndProcessFiles = (files: File[]) => {
    // Check if adding these files would exceed the maximum
    const remainingSlots = maxFiles - currentFileCount;
    
    if (remainingSlots <= 0) {
      toast({
        title: "Maximum images reached",
        description: `You can only upload a maximum of ${maxFiles} images.`,
        variant: "destructive"
      });
      return;
    }
    
    // Limit to the remaining slots
    const filesToProcess = files.slice(0, remainingSlots);
    
    if (filesToProcess.length < files.length) {
      toast({
        title: "Some files were skipped",
        description: `Only ${remainingSlots} more image${remainingSlots !== 1 ? 's' : ''} can be uploaded (maximum ${maxFiles}).`,
        variant: "destructive"
      });
    }
    
    // Filter valid image types
    const validImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const validFiles = filesToProcess.filter(file => validImageTypes.includes(file.type));
    
    // Check if any files were invalid
    if (validFiles.length < filesToProcess.length) {
      toast({
        title: "Some files were skipped",
        description: "Only JPG, PNG, and WebP images are supported.",
        variant: "destructive"
      });
    }
    
    // Check file size for each valid file (max 10MB)
    const maxSizeMB = 10;
    const sizeValidFiles = validFiles.filter(file => file.size <= maxSizeMB * 1024 * 1024);
    
    if (sizeValidFiles.length < validFiles.length) {
      toast({
        title: "Some files were skipped",
        description: `Files must be smaller than ${maxSizeMB}MB.`,
        variant: "destructive"
      });
    }

    if (sizeValidFiles.length > 0) {
      onFileUpload(sizeValidFiles);
      toast({
        title: "Upload successful",
        description: `${sizeValidFiles.length} image${sizeValidFiles.length > 1 ? 's' : ''} uploaded.`,
      });
    } else {
      toast({
        title: "No valid images",
        description: "Please upload JPG, PNG, or WebP images smaller than 10MB.",
        variant: "destructive"
      });
    }
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
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        multiple
        disabled={isUploadDisabled}
      />
      <div className="flex flex-col items-center justify-center">
        <FileImage className={`h-12 w-12 ${isUploadDisabled ? 'text-muted-foreground/50' : 'text-app-primary'} mb-3`} />
        {isUploadDisabled ? (
          <p className="text-lg font-medium mb-1">Maximum images reached</p>
        ) : (
          <>
            <p className="text-lg font-medium mb-1">Drag & drop images here</p>
            <p className="text-sm text-muted-foreground mb-3">
              or click to browse (JPG, PNG, WebP)
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
          {isUploadDisabled ? 'Maximum Reached' : 'Select Images'}
        </button>
        <p className="text-xs text-muted-foreground mt-2">
          Maximum {maxFiles} images • Multiple files supported • Max 10MB per file
        </p>
      </div>
    </div>
  );
};

export default FileUploader;
