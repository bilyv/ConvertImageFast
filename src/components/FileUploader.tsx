
import React, { useState, useRef } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { FileImage } from 'lucide-react';

interface FileUploaderProps {
  onFileUpload: (files: File[]) => void;
  hasExistingFile?: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({ 
  onFileUpload, 
  hasExistingFile = false
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
      const droppedFile = e.dataTransfer.files[0]; // Take only the first file
      validateAndProcessFile(droppedFile);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]; // Take only the first file
      validateAndProcessFile(selectedFile);
    }
  };

  const validateAndProcessFile = (file: File) => {
    // Filter valid image types (now including JFIF)
    const validImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jfif'];
    
    if (!validImageTypes.includes(file.type)) {
      toast({
        title: "Unsupported file format",
        description: "Only JPG, PNG, WebP, and JFIF images are supported.",
        variant: "destructive"
      });
      return;
    }
    
    // Check file size (max 10MB)
    const maxSizeMB = 10;
    if (file.size > maxSizeMB * 1024 * 1024) {
      toast({
        title: "File too large",
        description: `File must be smaller than ${maxSizeMB}MB.`,
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

  const isUploadDisabled = hasExistingFile;

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
        accept="image/jpeg,image/png,image/webp,image/jfif"
        className="hidden"
        disabled={isUploadDisabled}
      />
      <div className="flex flex-col items-center justify-center">
        <FileImage className={`h-12 w-12 ${isUploadDisabled ? 'text-muted-foreground/50' : 'text-app-primary'} mb-3`} />
        {isUploadDisabled ? (
          <p className="text-lg font-medium mb-1">Image already uploaded</p>
        ) : (
          <>
            <p className="text-lg font-medium mb-1">Drag & drop image here</p>
            <p className="text-sm text-muted-foreground mb-3">
              or click to browse (JPG, PNG, WebP, JFIF)
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
          {isUploadDisabled ? 'Replace Image' : 'Select Image'}
        </button>
        <p className="text-xs text-muted-foreground mt-2">
          Maximum 1 image • Max 10MB per file
        </p>
      </div>
    </div>
  );
};

export default FileUploader;
