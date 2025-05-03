
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export type FormatOption = 'jpg' | 'png' | 'webp';

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
    const allFormats: FormatOption[] = ['jpg', 'png', 'webp'];
    
    // Determine current format from file type
    let currentFormat: FormatOption | null = null;
    if (currentFileType === 'image/jpeg') currentFormat = 'jpg';
    if (currentFileType === 'image/png') currentFormat = 'png';
    if (currentFileType === 'image/webp') currentFormat = 'webp';

    // Return all formats if no file uploaded yet
    if (!currentFormat) return allFormats;
    
    // Filter out the current format
    return allFormats.filter(format => format !== currentFormat);
  };

  const availableFormats = getAvailableFormats();

  // Helper function to get readable format name
  const getFormatName = (format: FormatOption) => {
    switch (format) {
      case 'jpg': return 'JPG';
      case 'png': return 'PNG';
      case 'webp': return 'WebP';
      default: return format.toUpperCase(); // This is causing the error
    }
  };

  // Handle format selection
  const handleFormatChange = (value: string) => {
    // Ensure value is a valid FormatOption before passing it to onFormatChange
    if (value === 'jpg' || value === 'png' || value === 'webp') {
      onFormatChange(value as FormatOption);
    }
  };

  // Handle quality slider change
  const handleSliderChange = (values: number[]) => {
    onQualityChange(values[0]);
  };

  // Check if quality settings should be shown (PNG doesn't use quality)
  const showQualitySettings = selectedFormat !== 'png';

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
