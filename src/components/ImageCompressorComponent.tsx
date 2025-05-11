import React, { useState, useCallback } from 'react';
import FileUploader from './FileUploader';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Download, ArrowRight, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { formatFileSize } from '@/utils/imageUtils';
import { compressImage, getMimeTypeFromExtension, getExtensionFromMimeType } from '@/utils/canvasCompression';

interface CompressedImage {
  file: File;
  originalUrl: string;
  compressedUrl: string;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
}

const ImageCompressorComponent: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [compressedImage, setCompressedImage] = useState<CompressedImage | null>(null);
  const [compressionLevel, setCompressionLevel] = useState<number>(70);
  const [maxWidthHeight, setMaxWidthHeight] = useState<number>(2048);
  const [outputFormat, setOutputFormat] = useState<'image/jpeg' | 'image/png' | 'image/webp'>('image/jpeg');
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const { toast } = useToast();

  // Handle file upload
  const handleFileUpload = useCallback((files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      setOriginalImage(file);
      setCompressedImage(null);

      // Show toast notification
      toast({
        title: "Image uploaded",
        description: `${file.name} (${formatFileSize(file.size)})`,
      });

      // Set default output format based on the uploaded file type
      const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const detectedFormat = getMimeTypeFromExtension(fileExt) as 'image/jpeg' | 'image/png' | 'image/webp';
      setOutputFormat(detectedFormat);
    }
  }, [toast]);

  // Handle compression
  const handleCompress = async () => {
    if (!originalImage) return;

    setIsCompressing(true);

    try {
      // Configure compression options using the selected output format
      const options = {
        maxWidthOrHeight: maxWidthHeight,
        quality: compressionLevel / 100,
        format: outputFormat,
        maintainOriginalSize: false
      };

      // Create object URL for the original image
      const originalUrl = URL.createObjectURL(originalImage);

      // Compress the image using Canvas API
      const compressionResult = await compressImage(originalImage, options);

      // Create a File object from the compressed Blob
      const compressedFile = new File(
        [compressionResult.blob],
        originalImage.name,
        { type: compressionResult.blob.type }
      );

      // Calculate compression ratio
      const originalSize = originalImage.size;
      const compressedSize = compressionResult.size;
      const compressionRatio = ((originalSize - compressedSize) / originalSize) * 100;

      // Set the compressed image data
      setCompressedImage({
        file: compressedFile,
        originalUrl,
        compressedUrl: compressionResult.url,
        originalSize,
        compressedSize,
        compressionRatio,
      });

      // Show success toast
      toast({
        title: "Compression complete",
        description: `Reduced by ${compressionRatio.toFixed(1)}% (${formatFileSize(originalSize)} → ${formatFileSize(compressedSize)})`,
      });
    } catch (error) {
      console.error('Error compressing image:', error);
      toast({
        title: "Compression failed",
        description: "There was an error compressing your image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCompressing(false);
    }
  };

  // Handle download
  const handleDownload = () => {
    if (!compressedImage) return;

    // Create a download link
    const link = document.createElement('a');
    link.href = compressedImage.compressedUrl;

    // Get the correct file extension based on the output format
    const outputExt = getExtensionFromMimeType(outputFormat);

    // Generate filename with compression info
    const compressionInfo = Math.round(compressedImage.compressionRatio);
    const timestamp = new Date().getTime().toString().slice(-6);
    link.download = `compressed_${compressionInfo}pct_${timestamp}.${outputExt}`;

    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show toast
    toast({
      title: "Download started",
      description: "Your compressed image is being downloaded.",
    });
  };

  // Handle reset
  const handleReset = () => {
    // Clean up object URLs to prevent memory leaks
    if (compressedImage) {
      URL.revokeObjectURL(compressedImage.originalUrl);
      URL.revokeObjectURL(compressedImage.compressedUrl);
    }

    setOriginalImage(null);
    setCompressedImage(null);
  };

  // Clean up object URLs when component unmounts
  React.useEffect(() => {
    return () => {
      if (compressedImage) {
        URL.revokeObjectURL(compressedImage.originalUrl);
        URL.revokeObjectURL(compressedImage.compressedUrl);
      }
    };
  }, [compressedImage]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Upload Image to Compress</h2>
          <FileUploader
            onFileUpload={handleFileUpload}
            hasExistingFile={!!originalImage}
          />

          {originalImage && (
            <>
              <div className="mt-6 space-y-6">
                <div className="p-4 border border-border rounded-lg bg-card">
                  <h2 className="text-lg font-semibold mb-4">Compression Options</h2>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="compression-level">Compression Level: {compressionLevel}%</Label>
                        <span className="text-sm text-muted-foreground">
                          {compressionLevel < 30 ? 'High Compression' :
                           compressionLevel < 70 ? 'Balanced' : 'High Quality'}
                        </span>
                      </div>
                      <Slider
                        id="compression-level"
                        min={1}
                        max={100}
                        step={1}
                        value={[compressionLevel]}
                        onValueChange={(value) => setCompressionLevel(value[0])}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="max-dimension">Max Dimension: {maxWidthHeight}px</Label>
                        <span className="text-sm text-muted-foreground">
                          {maxWidthHeight < 1000 ? 'Small' :
                           maxWidthHeight < 2000 ? 'Medium' : 'Large'}
                        </span>
                      </div>
                      <Slider
                        id="max-dimension"
                        min={256}
                        max={4096}
                        step={256}
                        value={[maxWidthHeight]}
                        onValueChange={(value) => setMaxWidthHeight(value[0])}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Output Format</Label>
                      <RadioGroup
                        value={outputFormat}
                        onValueChange={(value) => setOutputFormat(value as 'image/jpeg' | 'image/png' | 'image/webp')}
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="image/jpeg" id="format-jpeg" />
                          <Label htmlFor="format-jpeg" className="cursor-pointer">
                            JPEG <span className="text-xs text-muted-foreground">(Smaller size, lossy)</span>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="image/png" id="format-png" />
                          <Label htmlFor="format-png" className="cursor-pointer">
                            PNG <span className="text-xs text-muted-foreground">(Larger size, lossless)</span>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="image/webp" id="format-webp" />
                          <Label htmlFor="format-webp" className="cursor-pointer">
                            WebP <span className="text-xs text-muted-foreground">(Best compression, modern)</span>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full bg-app-primary hover:bg-app-primary/90 text-white"
                  onClick={handleCompress}
                  disabled={isCompressing}
                >
                  {isCompressing ? 'Compressing...' : 'Compress Image'}
                  {!isCompressing && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </div>

              {compressedImage && (
                <div className="mt-6 space-y-6">
                  <div className="p-4 border border-border rounded-lg bg-card">
                    <h2 className="text-lg font-semibold mb-4">Compression Results</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="font-medium">Original Image</p>
                        <div className="relative aspect-video bg-muted rounded-md overflow-hidden">
                          <img
                            src={compressedImage.originalUrl}
                            alt="Original"
                            className="object-contain w-full h-full"
                          />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Size: {formatFileSize(compressedImage.originalSize)}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <p className="font-medium">Compressed Image</p>
                        <div className="relative aspect-video bg-muted rounded-md overflow-hidden">
                          <img
                            src={compressedImage.compressedUrl}
                            alt="Compressed"
                            className="object-contain w-full h-full"
                          />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Size: {formatFileSize(compressedImage.compressedSize)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-muted rounded-md">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Size Reduction</p>
                          <p className="text-sm text-muted-foreground">
                            Reduced by {compressedImage.compressionRatio.toFixed(1)}%
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatFileSize(compressedImage.originalSize - compressedImage.compressedSize)} Saved</p>
                          <p className="text-sm text-muted-foreground">
                            {formatFileSize(compressedImage.originalSize)} → {formatFileSize(compressedImage.compressedSize)}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 pt-2 border-t border-border">
                        <div className="flex justify-between items-center">
                          <p className="text-sm">
                            <span className="font-medium">Output Format:</span> {getExtensionFromMimeType(outputFormat).toUpperCase()}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">Quality:</span> {compressionLevel}%
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      className="flex-1 bg-app-primary hover:bg-app-primary/90 text-white"
                      onClick={handleDownload}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Compressed Image
                    </Button>

                    <Button
                      variant="outline"
                      onClick={handleReset}
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Start Over
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageCompressorComponent;
