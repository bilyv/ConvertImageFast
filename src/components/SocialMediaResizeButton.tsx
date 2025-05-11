/**
 * SocialMediaResizeButton Component
 *
 * This component provides a button that opens a dialog with options to resize
 * an image for various social media platforms.
 */
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Share2, Download, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { optimizeForSocialMedia, socialMediaPlatforms } from '@/utils/socialMediaUtils';

// Custom platform icons
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const TikTokIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path>
    <path d="M15 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path>
    <path d="M15 8v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-4a4 4 0 0 1 4-4h8"></path>
  </svg>
);

const YouTubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const PinterestIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 12a4 4 0 1 0 8 0 4 4 0 0 0-8 0z"></path>
    <path d="M12 2v4"></path>
    <path d="M12 18v4"></path>
    <path d="M4.93 4.93l2.83 2.83"></path>
    <path d="M16.24 16.24l2.83 2.83"></path>
    <path d="M2 12h4"></path>
    <path d="M18 12h4"></path>
    <path d="M4.93 19.07l2.83-2.83"></path>
    <path d="M16.24 7.76l2.83-2.83"></path>
  </svg>
);

// Extended social media platforms with more options
const extendedPlatforms = [
  // Instagram
  {
    id: 'instagram-square',
    name: 'Instagram Post (1:1)',
    icon: 'instagram',
    width: 1080,
    height: 1080,
    format: 'jpg',
    category: 'Instagram'
  },
  {
    id: 'instagram-portrait',
    name: 'Instagram Post (4:5)',
    icon: 'instagram',
    width: 1080,
    height: 1350,
    format: 'jpg',
    category: 'Instagram'
  },
  {
    id: 'instagram-landscape',
    name: 'Instagram Post (16:9)',
    icon: 'instagram',
    width: 1080,
    height: 608,
    format: 'jpg',
    category: 'Instagram'
  },
  {
    id: 'instagram-story',
    name: 'Instagram Story (9:16)',
    icon: 'instagram',
    width: 1080,
    height: 1920,
    format: 'jpg',
    category: 'Instagram'
  },
  {
    id: 'instagram-profile',
    name: 'Instagram Profile Picture',
    icon: 'instagram',
    width: 320,
    height: 320,
    format: 'jpg',
    category: 'Instagram'
  },
  
  // TikTok
  {
    id: 'tiktok-video',
    name: 'TikTok Video Cover (9:16)',
    icon: 'tiktok',
    width: 1080,
    height: 1920,
    format: 'jpg',
    category: 'TikTok'
  },
  {
    id: 'tiktok-profile',
    name: 'TikTok Profile Picture',
    icon: 'tiktok',
    width: 200,
    height: 200,
    format: 'jpg',
    category: 'TikTok'
  },
  
  // YouTube
  {
    id: 'youtube-thumbnail',
    name: 'YouTube Thumbnail (16:9)',
    icon: 'youtube',
    width: 1280,
    height: 720,
    format: 'jpg',
    category: 'YouTube'
  },
  {
    id: 'youtube-channel-art',
    name: 'YouTube Channel Art',
    icon: 'youtube',
    width: 2560,
    height: 1440,
    format: 'jpg',
    category: 'YouTube'
  },
  {
    id: 'youtube-profile',
    name: 'YouTube Profile Picture',
    icon: 'youtube',
    width: 800,
    height: 800,
    format: 'jpg',
    category: 'YouTube'
  },
  
  // Twitter/X
  {
    id: 'twitter-post',
    name: 'Twitter/X Post Image',
    icon: 'twitter',
    width: 1200,
    height: 675,
    format: 'jpg',
    category: 'Twitter/X'
  },
  {
    id: 'twitter-profile',
    name: 'Twitter/X Profile Picture',
    icon: 'twitter',
    width: 400,
    height: 400,
    format: 'jpg',
    category: 'Twitter/X'
  },
  {
    id: 'twitter-header',
    name: 'Twitter/X Header Image',
    icon: 'twitter',
    width: 1500,
    height: 500,
    format: 'jpg',
    category: 'Twitter/X'
  },
  
  // Facebook
  {
    id: 'facebook-post',
    name: 'Facebook Post Image',
    icon: 'facebook',
    width: 1200,
    height: 630,
    format: 'jpg',
    category: 'Facebook'
  },
  {
    id: 'facebook-cover',
    name: 'Facebook Cover Photo',
    icon: 'facebook',
    width: 851,
    height: 315,
    format: 'jpg',
    category: 'Facebook'
  },
  {
    id: 'facebook-profile',
    name: 'Facebook Profile Picture',
    icon: 'facebook',
    width: 170,
    height: 170,
    format: 'jpg',
    category: 'Facebook'
  },
  
  // LinkedIn
  {
    id: 'linkedin-post',
    name: 'LinkedIn Post Image',
    icon: 'linkedin',
    width: 1200,
    height: 627,
    format: 'jpg',
    category: 'LinkedIn'
  },
  {
    id: 'linkedin-profile',
    name: 'LinkedIn Profile Picture',
    icon: 'linkedin',
    width: 400,
    height: 400,
    format: 'jpg',
    category: 'LinkedIn'
  },
  {
    id: 'linkedin-company',
    name: 'LinkedIn Company Page',
    icon: 'linkedin',
    width: 1128,
    height: 191,
    format: 'jpg',
    category: 'LinkedIn'
  },
  
  // Pinterest
  {
    id: 'pinterest-pin',
    name: 'Pinterest Pin (2:3)',
    icon: 'pinterest',
    width: 1000,
    height: 1500,
    format: 'jpg',
    category: 'Pinterest'
  },
  {
    id: 'pinterest-profile',
    name: 'Pinterest Profile Picture',
    icon: 'pinterest',
    width: 165,
    height: 165,
    format: 'jpg',
    category: 'Pinterest'
  }
];

// Group platforms by category
const platformCategories = extendedPlatforms.reduce((acc, platform) => {
  if (!acc[platform.category]) {
    acc[platform.category] = [];
  }
  acc[platform.category].push(platform);
  return acc;
}, {} as Record<string, typeof extendedPlatforms>);

// Get platform icon component
const getPlatformIcon = (icon: string) => {
  switch (icon) {
    case 'instagram':
      return <InstagramIcon />;
    case 'tiktok':
      return <TikTokIcon />;
    case 'youtube':
      return <YouTubeIcon />;
    case 'twitter':
      return <TwitterIcon />;
    case 'facebook':
      return <FacebookIcon />;
    case 'linkedin':
      return <LinkedinIcon />;
    case 'pinterest':
      return <PinterestIcon />;
    default:
      return <Share2 className="h-4 w-4" />;
  }
};

interface SocialMediaResizeButtonProps {
  /**
   * The URL of the image to resize
   */
  imageUrl: string;
  
  /**
   * The name of the image file
   */
  fileName: string;
  
  /**
   * Callback function to execute when a resized image is ready
   */
  onImageResized?: (resizedImageUrl: string, platform: any) => void;
}

const SocialMediaResizeButton: React.FC<SocialMediaResizeButtonProps> = ({
  imageUrl,
  fileName,
  onImageResized
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [resizedImageUrl, setResizedImageUrl] = useState<string | null>(null);
  const { toast } = useToast();

  // Handle platform selection
  const handlePlatformSelect = (platformId: string) => {
    setSelectedPlatform(platformId);
    setResizedImageUrl(null); // Reset any previous resized image
  };

  // Handle category selection
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSelectedPlatform(null); // Reset platform selection when category changes
    setResizedImageUrl(null); // Reset any previous resized image
  };

  // Get the selected platform object
  const getSelectedPlatform = () => {
    return extendedPlatforms.find(p => p.id === selectedPlatform);
  };

  // Handle resize button click
  const handleResize = async () => {
    const platform = getSelectedPlatform();
    if (!platform) return;
    
    setIsResizing(true);
    
    try {
      // Show toast notification
      toast({
        title: `Resizing for ${platform.name}`,
        description: `Converting to ${platform.width}x${platform.height}px ${platform.format.toUpperCase()}...`,
      });
      
      // Convert platform to the format expected by optimizeForSocialMedia
      const platformForOptimize = {
        ...platform,
        aspectRatio: platform.width / platform.height,
        maxFileSize: 30 * 1024 * 1024, // 30MB default
        description: platform.name
      };
      
      // Resize the image
      const optimizedImageUrl = await optimizeForSocialMedia(imageUrl, platformForOptimize);
      
      // Update state
      setResizedImageUrl(optimizedImageUrl);
      
      // Call the callback if provided
      if (onImageResized) {
        onImageResized(optimizedImageUrl, platform);
      }
      
      // Show success notification
      toast({
        title: 'Image Resized',
        description: `Your image has been resized for ${platform.name}`,
        variant: 'default',
      });
    } catch (error) {
      console.error('Error resizing image:', error);
      toast({
        title: 'Resize Failed',
        description: 'There was an error resizing your image. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsResizing(false);
    }
  };

  // Handle download button click
  const handleDownload = () => {
    if (!resizedImageUrl) return;
    
    const platform = getSelectedPlatform();
    if (!platform) return;
    
    // Generate a filename
    const fileExtension = platform.format === 'jpg' ? 'jpg' : 
                         platform.format === 'png' ? 'png' : 'webp';
    const baseFileName = fileName.split('.')[0] || 'image';
    const optimizedFileName = `${baseFileName}_${platform.id}.${fileExtension}`;
    
    // Create a download link
    const link = document.createElement('a');
    link.href = resizedImageUrl;
    link.download = optimizedFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: 'Image Downloaded',
      description: `Your resized image has been downloaded as ${optimizedFileName}`,
      variant: 'default',
    });
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setIsDialogOpen(true)}
        className="flex items-center gap-1"
      >
        <Share2 className="h-4 w-4 mr-2" />
        Resize for Social Media
      </Button>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Resize for Social Media</DialogTitle>
            <DialogDescription>
              Choose a platform and format to resize your image for social media
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            {/* Platform Category Selection */}
            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="category" className="text-sm font-medium">
                Platform
              </label>
              <Select
                value={selectedCategory || ''}
                onValueChange={handleCategorySelect}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a platform" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(platformCategories).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Format Selection (only shown if category is selected) */}
            {selectedCategory && (
              <div className="grid grid-cols-1 gap-2">
                <label htmlFor="format" className="text-sm font-medium">
                  Format
                </label>
                <Select
                  value={selectedPlatform || ''}
                  onValueChange={handlePlatformSelect}
                >
                  <SelectTrigger id="format">
                    <SelectValue placeholder="Select a format" />
                  </SelectTrigger>
                  <SelectContent>
                    {platformCategories[selectedCategory]?.map((platform) => (
                      <SelectItem key={platform.id} value={platform.id}>
                        <div className="flex items-center">
                          <span className="mr-2">{getPlatformIcon(platform.icon)}</span>
                          <span>{platform.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            {/* Selected Format Details */}
            {selectedPlatform && getSelectedPlatform() && (
              <div className="bg-muted/30 p-3 rounded-md text-sm">
                <div className="flex items-center mb-2">
                  <span className="mr-2">{getPlatformIcon(getSelectedPlatform()!.icon)}</span>
                  <span className="font-medium">{getSelectedPlatform()!.name}</span>
                </div>
                <div className="text-muted-foreground">
                  <p>Dimensions: {getSelectedPlatform()!.width} × {getSelectedPlatform()!.height} pixels</p>
                  <p>Format: {getSelectedPlatform()!.format.toUpperCase()}</p>
                  <p>Aspect Ratio: {getSelectedPlatform()!.width / getSelectedPlatform()!.height}</p>
                </div>
              </div>
            )}
            
            {/* Resized Image Preview */}
            {resizedImageUrl && (
              <div className="mt-2">
                <div className="aspect-video max-h-48 flex items-center justify-center mb-2 bg-muted/20 rounded-lg overflow-hidden">
                  <img
                    src={resizedImageUrl}
                    alt="Resized image"
                    className="object-contain max-h-full max-w-full"
                  />
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter className="sm:justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>
            <div className="flex gap-2">
              {resizedImageUrl ? (
                <Button
                  type="button"
                  onClick={handleDownload}
                  className="bg-app-primary hover:bg-app-primary/90 text-white"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleResize}
                  disabled={!selectedPlatform || isResizing}
                  className="bg-app-primary hover:bg-app-primary/90 text-white"
                >
                  {isResizing ? (
                    <>
                      <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
                      Resizing...
                    </>
                  ) : (
                    <>
                      <Share2 className="h-4 w-4 mr-2" />
                      Resize
                    </>
                  )}
                </Button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SocialMediaResizeButton;
