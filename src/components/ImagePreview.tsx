
import React, { useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import PlatformResize from './PlatformResize';
import ResizeControl from './ResizeControl';
import { Button } from '@/components/ui/button';
import { Search, Maximize } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ImagePreviewProps {
  originalImage: string;
  fileName: string;
}

interface SimilarImage {
  id: string;
  url: string;
  title: string;
  format: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ originalImage, fileName }) => {
  const [resizeDimensions, setResizeDimensions] = useState<{width?: number; height?: number}>({});
  const [maintainResizeAspectRatio, setMaintainResizeAspectRatio] = useState<boolean>(true);
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [formatFilter, setFormatFilter] = useState<string>('all');
  const [similarImages, setSimilarImages] = useState<SimilarImage[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const handlePlatformSizeSelect = (width: number, height: number) => {
    setResizeDimensions({ width, height });
    // Here you would typically update the parent component with these dimensions
    // This is just a UI change for now - full functionality would require lifting state up
  };

  const handleSearch = () => {
    setIsSearching(true);
    // Simulate API call with a timeout
    setTimeout(() => {
      // Mock results - in a real app, this would be from an API
      const mockResults: SimilarImage[] = [
        { 
          id: '1', 
          url: 'https://images.unsplash.com/photo-1682687220777-2c60708d6889', 
          title: 'Mountain landscape', 
          format: 'jpg' 
        },
        { 
          id: '2', 
          url: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538', 
          title: 'Ocean view', 
          format: 'png' 
        },
        { 
          id: '3', 
          url: 'https://images.unsplash.com/photo-1682687220208-22d7a2543e88', 
          title: 'Forest trail', 
          format: 'webp' 
        },
        { 
          id: '4', 
          url: 'https://images.unsplash.com/photo-1682687220923-c5dca8769ad4', 
          title: 'Desert sunset', 
          format: 'tiff' 
        },
      ];
      
      // Filter by format if needed
      const filteredResults = formatFilter === 'all' 
        ? mockResults 
        : mockResults.filter(img => img.format === formatFilter);
      
      // Filter by search query if provided
      const searchResults = searchQuery.trim() === '' 
        ? filteredResults 
        : filteredResults.filter(img => 
            img.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            img.format.toLowerCase().includes(searchQuery.toLowerCase())
          );
      
      setSimilarImages(searchResults);
      setIsSearching(false);
    }, 1000);
    
    setSearchModalOpen(true);
  };

  return (
    <div className="rounded-lg overflow-hidden border border-border animate-slide-in">
      <div className="aspect-video flex items-center justify-center bg-muted/30 overflow-hidden relative">
        <img
          src={originalImage}
          alt="Original"
          className="object-contain max-h-full max-w-full"
        />
        
        {/* Resize button - top right */}
        <div className="absolute top-2 right-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="bg-background/80 backdrop-blur-sm hover:bg-background rounded-full w-8 h-8"
              >
                <Maximize className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4" side="bottom" align="end">
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Resize for platforms</h4>
                <PlatformResize onSelectSize={handlePlatformSizeSelect} />
                
                <div className="pt-2 border-t border-border">
                  <h4 className="text-sm font-medium mb-2">Custom size:</h4>
                  <ResizeControl 
                    resizeDimensions={resizeDimensions}
                    setResizeDimensions={setResizeDimensions}
                    maintainAspectRatio={maintainResizeAspectRatio}
                    setMaintainAspectRatio={setMaintainResizeAspectRatio}
                    show={true}
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        
        {/* Search button - top left */}
        <div className="absolute top-2 left-2">
          <Button
            variant="outline"
            size="icon"
            className="bg-background/80 backdrop-blur-sm hover:bg-background rounded-full w-8 h-8"
            onClick={handleSearch}
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="p-3 bg-card">
        <p className="text-sm font-medium truncate" title={fileName}>
          {fileName}
        </p>
      </div>

      {/* Search Modal */}
      <Dialog open={searchModalOpen} onOpenChange={setSearchModalOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Similar Images</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Input 
                  placeholder="Search by file name or format" 
                  value={searchQuery} 
                  onChange={e => setSearchQuery(e.target.value)} 
                />
              </div>
              <Tabs defaultValue="all" onValueChange={setFormatFilter}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="jpg">JPG</TabsTrigger>
                  <TabsTrigger value="png">PNG</TabsTrigger>
                  <TabsTrigger value="webp">WebP</TabsTrigger>
                </TabsList>
              </Tabs>
              <Button onClick={handleSearch}>Search</Button>
            </div>

            {isSearching ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {similarImages.length > 0 ? (
                  similarImages.map((image) => (
                    <div key={image.id} className="border rounded-lg overflow-hidden">
                      <div className="aspect-square bg-muted/30 relative">
                        <img 
                          src={image.url} 
                          alt={image.title} 
                          className="object-cover h-full w-full"
                        />
                      </div>
                      <div className="p-2">
                        <p className="text-sm truncate">{image.title}</p>
                        <p className="text-xs text-muted-foreground">{image.format.toUpperCase()}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8">
                    <p>No similar images found</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImagePreview;
