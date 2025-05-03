
import React, { useState, useRef } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { FileImage } from 'lucide-react';

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload }) => {
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
      const file = e.dataTransfer.files[0];
      validateAndProcessFile(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      validateAndProcessFile(file);
    }
  };

  const validateAndProcessFile = (file: File) => {
    // Validate image file
    const validImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validImageTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image (JPG, PNG, or WebP).",
        variant: "destructive"
      });
      return;
    }

    // File size validation (max 10MB)
    const maxSizeMB = 10;
    if (file.size > maxSizeMB * 1024 * 1024) {
      toast({
        title: "File too large",
        description: `Please upload an image smaller than ${maxSizeMB}MB.`,
        variant: "destructive"
      });
      return;
    }

    onFileUpload(file);
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer ${
        isDragging ? 'drop-zone-active' : 'border-muted-foreground/30 hover:border-muted-foreground/50'
      }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleButtonClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
      />
      <div className="flex flex-col items-center justify-center">
        <FileImage className="h-12 w-12 text-app-primary mb-3" />
        <p className="text-lg font-medium mb-1">Drag & drop an image here</p>
        <p className="text-sm text-muted-foreground mb-3">
          or click to browse (JPG, PNG, WebP)
        </p>
        <button
          type="button"
          className="bg-app-primary text-white font-medium rounded-md px-4 py-2 hover:bg-app-primary/90 focus:outline-none focus:ring-2 focus:ring-app-primary/50"
          onClick={(e) => {
            e.stopPropagation();
            handleButtonClick();
          }}
        >
          Select Image
        </button>
      </div>
    </div>
  );
};

export default FileUploader;
