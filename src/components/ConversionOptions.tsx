
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export type FormatOption = 'jpg' | 'png' | 'webp' | 'bmp' | 'gif' | 'tiff' | 'avif' | 'ico' | 'jfif';

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
    const allFormats: FormatOption[] = ['jpg', 'png', 'webp', 'bmp', 'gif', 'tiff', 'avif', 'ico', 'jfif'];
    
    // Determine current format from file type
    let currentFormat: FormatOption | null = null;
    if (currentFileType === 'image/jpeg' || currentFileType === 'image/jfif') currentFormat = 'jpg';
    if (currentFileType === 'image/png') currentFormat = 'png';
    if (currentFileType === 'image/webp') currentFormat = 'webp';
    if (currentFileType === 'image/bmp') currentFormat = 'bmp';
    if (currentFileType === 'image/gif') currentFormat = 'gif';
    if (currentFileType === 'image/tiff') currentFormat = 'tiff';
    if (currentFileType === 'image/avif') currentFormat = 'avif';
    if (currentFileType === 'image/x-icon') currentFormat = 'ico';

    // Return all formats if no file uploaded yet
    if (!currentFormat) return allFormats;
    
    // Filter out the current format
    return allFormats.filter(format => format !== currentFormat);
  };

  const availableFormats = getAvailableFormats();

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
      case 'jfif': return 'JFIF';
    }
  };

  // Handle format selection
  const handleFormatChange = (value: string) => {
    // Ensure value is a valid FormatOption before passing it to onFormatChange
    if (['jpg', 'png', 'webp', 'bmp', 'gif', 'tiff', 'avif', 'ico', 'jfif'].includes(value)) {
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
