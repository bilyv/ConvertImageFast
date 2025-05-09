
import React, { useState, useEffect, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Slider } from "@/components/ui/slider";

export type FormatOption = 'jpg' | 'png' | 'webp' | 'bmp' | 'gif' | 'tiff' | 'avif' | 'ico' | 'jfif' | 'heic' | 'raw' | 'psd' | 'ai' | 'svg' | 'jp2' | 'cr2' | 'nef' | 'arw' | 'dng' | 'exr' | 'pbm' | 'pcx';

interface ConversionOptionsProps {
  currentFileType: string | null;
  selectedFormat: FormatOption | null;
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
    const allFormats: FormatOption[] = [
      'jpg', 'png', 'webp', 'bmp', 'gif', 'tiff', 'avif', 'ico', 'jfif',
      'heic', 'raw', 'psd', 'ai', 'svg', 'jp2', 'cr2', 'nef', 'arw', 'dng', 'exr', 'pbm', 'pcx'
    ];

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
      case 'heic': return 'HEIC';
      case 'raw': return 'RAW';
      case 'psd': return 'PSD';
      case 'ai': return 'AI';
      case 'svg': return 'SVG';
      case 'jp2': return 'JP2';
      case 'cr2': return 'CR2';
      case 'nef': return 'NEF';
      case 'arw': return 'ARW';
      case 'dng': return 'DNG';
      case 'exr': return 'EXR';
      case 'pbm': return 'PBM';
      case 'pcx': return 'PCX';
    }
  };

  // State for search input
  const [searchQuery, setSearchQuery] = useState('');

  // State for display value in the input field
  const [displayValue, setDisplayValue] = useState<string>(
    selectedFormat ? getFormatName(selectedFormat) : ''
  );

  // State to track animation when format is selected
  const [isFormatSelected, setIsFormatSelected] = useState<boolean>(!!selectedFormat);

  // Update display value when selected format changes
  useEffect(() => {
    if (selectedFormat) {
      setDisplayValue(getFormatName(selectedFormat));
      setIsFormatSelected(true);
    } else {
      setIsFormatSelected(false);
    }
  }, [selectedFormat]);

  // Filter formats based on search query
  const filteredFormats = useMemo(() => {
    if (!searchQuery.trim()) {
      // Show no examples when no search
      return [];
    }

    return availableFormats.filter(format =>
      format.toLowerCase().includes(searchQuery.toLowerCase()) ||
      getFormatName(format).toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, availableFormats]);

  // Handle format selection
  const handleFormatSelect = (value: string) => {
    // Ensure value is a valid FormatOption before passing it to onFormatChange
    if ([
      'jpg', 'png', 'webp', 'bmp', 'gif', 'tiff', 'avif', 'ico', 'jfif',
      'heic', 'raw', 'psd', 'ai', 'svg', 'jp2', 'cr2', 'nef', 'arw', 'dng', 'exr', 'pbm', 'pcx'
    ].includes(value)) {
      // First set animation state to false to reset animation
      setIsFormatSelected(false);

      // Use setTimeout to create a small delay for the animation reset
      setTimeout(() => {
        onFormatChange(value as FormatOption);
        setDisplayValue(getFormatName(value as FormatOption));
        setSearchQuery(''); // Clear search query but keep display value
        setIsFormatSelected(true); // Trigger animation
      }, 50);
    }
  };

  // Handle quality slider change
  const handleSliderChange = (values: number[]) => {
    onQualityChange(values[0]);
  };

  // Check if quality settings should be shown (PNG doesn't use quality)
  const showQualitySettings = selectedFormat && !['png', 'bmp', 'gif', 'ico'].includes(selectedFormat);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <label htmlFor="format-select" className="text-sm font-medium">
          Convert to:
        </label>

        <div className="relative">
          <Command className="rounded-lg border shadow-sm">
            <div className="flex items-center border-b px-3">
              <Search className="h-4 w-4 shrink-0 opacity-50 mr-2" />
              {isFormatSelected && displayValue && searchQuery === '' ? (
                <div className="flex items-center">
                  <div
                    className={`
                      flex items-center px-2 py-1 rounded-md border border-app-primary/60
                      bg-app-primary/10 text-sm font-medium text-app-primary
                      transition-all duration-300 ease-in-out animate-slide-in
                    `}
                  >
                    {displayValue}
                  </div>
                  <CommandInput
                    placeholder="Search for image formats..."
                    value={searchQuery}
                    onValueChange={(value) => {
                      setSearchQuery(value);
                      if (value === '') {
                        // When user clears the search, restore the display value
                        setDisplayValue(selectedFormat ? getFormatName(selectedFormat) : '');
                      }
                    }}
                    className="flex h-9 w-full rounded-md bg-transparent py-3 text-sm outline-none
                      placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 ml-2"
                    showSearchIcon={false}
                  />
                </div>
              ) : (
                <CommandInput
                  placeholder="Search for image formats..."
                  value={searchQuery}
                  onValueChange={(value) => {
                    setSearchQuery(value);
                    if (value === '') {
                      // When user clears the search, restore the display value
                      setDisplayValue(selectedFormat ? getFormatName(selectedFormat) : '');
                    }
                  }}
                  className="flex h-9 w-full rounded-md bg-transparent py-3 text-sm outline-none
                    placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                  showSearchIcon={false}
                />
              )}
            </div>
            <CommandList>
              {searchQuery.trim() === '' && (
                <CommandEmpty>
                  {displayValue
                    ? <span className="text-app-primary">Selected: <strong>{displayValue}</strong></span>
                    : "Type to search for image formats..."
                  }
                </CommandEmpty>
              )}
              {searchQuery.trim() !== '' && filteredFormats.length === 0 && (
                <CommandEmpty>No format found</CommandEmpty>
              )}
              <CommandGroup>
                {filteredFormats.map((format) => (
                  <CommandItem
                    key={format}
                    value={format}
                    onSelect={handleFormatSelect}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-app-primary/20 flex items-center justify-center">
                        {selectedFormat === format && (
                          <div className="h-2 w-2 rounded-full bg-app-primary" />
                        )}
                      </div>
                      <span>{getFormatName(format)}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
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
