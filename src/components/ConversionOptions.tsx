
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { getRecommendedFormat, isFormatSupported } from '../utils/imageUtils';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from 'lucide-react';

export type FormatOption = 'jpg' | 'png' | 'webp' | 'bmp' | 'gif' | 'tiff' | 'avif' | 'ico' | 'heic';

interface ConversionOptionsProps {
  currentFileType: string | null;
  selectedFormat: FormatOption;
  quality: number;
  onFormatChange: (format: FormatOption) => void;
  onQualityChange: (quality: number) => void;
}

const ConversionOptions: React.FC<ConversionOptionsProps> = ({
  currentFileType,
  selectedFormat,
  quality,
  onFormatChange,
  onQualityChange,
}) => {
  // Get available formats based on current file type (excluding current format)
  const getAvailableFormats = () => {
    const allFormats: FormatOption[] = ['jpg', 'png', 'webp', 'bmp', 'gif', 'tiff', 'avif', 'ico', 'heic'];
    
    // Determine current format from file type
    let currentFormat: FormatOption | null = null;
    if (currentFileType === 'image/jpeg') currentFormat = 'jpg';
    if (currentFileType === 'image/png') currentFormat = 'png';
    if (currentFileType === 'image/webp') currentFormat = 'webp';
    if (currentFileType === 'image/bmp') currentFormat = 'bmp';
    if (currentFileType === 'image/gif') currentFormat = 'gif';
    if (currentFileType === 'image/tiff') currentFormat = 'tiff';
    if (currentFileType === 'image/avif') currentFormat = 'avif';
    if (currentFileType === 'image/x-icon') currentFormat = 'ico';
    if (currentFileType === 'image/heic') currentFormat = 'heic';

    // Return all formats if no file uploaded yet
    if (!currentFormat) return allFormats;
    
    // Filter out the current format
    return allFormats.filter(format => format !== currentFormat);
  };

  const availableFormats = getAvailableFormats();
  const isCurrentFormatSupported = currentFileType ? isFormatSupported(selectedFormat) : true;
  const showFormatWarning = !isCurrentFormatSupported && !!currentFileType;

  // Helper function to get readable format name
  const getFormatName = (format: FormatOption): string => {
    switch (format) {
      case 'jpg': return 'JPG';
      case 'png': return 'PNG';
      case 'webp': return 'WebP';
      case 'bmp': return 'BMP';
      case 'gif': return 'GIF';
      case 'tiff': return 'TIFF';
      case 'avif': return 'AVIF';
      case 'ico': return 'ICO';
      case 'heic': return 'HEIC';
    }
  };

  // Handle format selection
  const handleFormatChange = (value: string) => {
    // Ensure value is a valid FormatOption before passing it to onFormatChange
    if (['jpg', 'png', 'webp', 'bmp', 'gif', 'tiff', 'avif', 'ico', 'heic'].includes(value)) {
      onFormatChange(value as FormatOption);
    }
  };

  // Handle quality slider change
  const handleSliderChange = (values: number[]) => {
    onQualityChange(values[0]);
  };

  // Check if quality settings should be shown (PNG doesn't use quality)
  const showQualitySettings = !['png', 'bmp', 'gif', 'ico'].includes(selectedFormat);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <label htmlFor="format-select" className="text-sm font-medium">
          Convert to:
        </label>
        <Select onValueChange={handleFormatChange} value={selectedFormat}>
          <SelectTrigger id="format-select" className="w-full">
            <SelectValue placeholder="Select format" />
          </SelectTrigger>
          <SelectContent>
            {availableFormats.map((format) => (
              <SelectItem key={format} value={format}>
                {getFormatName(format)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {showFormatWarning && (
          <Alert variant="warning" className="mt-2 bg-amber-50 text-amber-700 border-amber-200">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Browser-based conversion for this format may have limited support. For best results, consider a common format like JPG, PNG, or WebP.
            </AlertDescription>
          </Alert>
        )}
      </div>

      {showQualitySettings && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label htmlFor="quality-slider" className="text-sm font-medium">
              Quality:
            </label>
            <span className="text-sm font-medium">{quality}%</span>
          </div>
          <Slider
            id="quality-slider"
            value={[quality]}
            min={10}
            max={100}
            step={1}
            onValueChange={handleSliderChange}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Lower quality, smaller file</span>
            <span>Higher quality, larger file</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversionOptions;
