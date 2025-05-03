
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download } from 'lucide-react';

interface ConvertedImageProps {
  convertedImage: string | null;
  convertedFileName: string;
  isConverting: boolean;
}

const ConvertedImage: React.FC<ConvertedImageProps> = ({
  convertedImage,
  convertedFileName,
  isConverting,
}) => {
  // If no converted image yet or still converting, show a placeholder
  if (isConverting) {
    return (
      <div className="rounded-lg overflow-hidden border border-border h-full flex items-center justify-center bg-muted/30">
        <div className="flex flex-col items-center justify-center p-6">
          <div className="h-8 w-8 border-4 border-app-primary/30 border-t-app-primary rounded-full animate-spin mb-4"></div>
          <p className="text-sm font-medium">Converting image...</p>
        </div>
      </div>
    );
  }

  if (!convertedImage) {
    return (
      <div className="rounded-lg overflow-hidden border border-border h-full flex items-center justify-center bg-muted/30">
        <p className="text-muted-foreground text-sm">Converted image will appear here</p>
      </div>
    );
  }

  // Handle download of the converted image
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = convertedImage;
    link.download = convertedFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="rounded-lg overflow-hidden border border-border animate-slide-in">
      <div className="aspect-video flex items-center justify-center bg-muted/30 overflow-hidden">
        <img
          src={convertedImage}
          alt="Converted"
          className="object-contain max-h-full max-w-full"
        />
      </div>
      <div className="p-3 bg-card flex justify-between items-center">
        <p className="text-sm font-medium truncate" title={convertedFileName}>
          {convertedFileName}
        </p>
        <Button
          variant="outline"
          size="sm"
          className="bg-app-accent hover:bg-app-accent/90 text-white border-none"
          onClick={handleDownload}
        >
          <Download className="h-4 w-4 mr-1" />
          Download
        </Button>
      </div>
    </div>
  );
};

export default ConvertedImage;
