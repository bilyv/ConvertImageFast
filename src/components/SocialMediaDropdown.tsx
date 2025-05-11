/**
 * SocialMediaDropdown Component
 *
 * This component provides a dropdown menu for optimizing images for various social media platforms.
 * It allows users to quickly convert their images to platform-specific sizes and formats.
 */
import React, { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Share2, Instagram, Twitter, Facebook, Linkedin, Download, Check } from 'lucide-react';
import { SocialMediaPlatform, optimizeForSocialMedia, socialMediaPlatforms } from '@/utils/socialMediaUtils';
import { useToast } from '@/hooks/use-toast';

// Custom Pinterest icon since it's not in Lucide
const PinterestIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    <circle cx="12" cy="12" r="10"></circle>
  </svg>
);

interface SocialMediaDropdownProps {
  /**
   * The URL of the image to optimize
   */
  imageUrl: string;

  /**
   * The name of the image file
   */
  fileName: string;

  /**
   * Callback function to execute when a platform is selected
   */
  onPlatformSelect?: (platformId: string) => void;

  /**
   * Callback function to execute when optimization starts
   */
  onOptimizationStart?: () => void;

  /**
   * Callback function to execute when optimization completes
   */
  onOptimizationComplete?: () => void;
}

const SocialMediaDropdown: React.FC<SocialMediaDropdownProps> = ({
  imageUrl,
  fileName,
  onPlatformSelect,
  onOptimizationStart,
  onOptimizationComplete
}) => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [selectedPlatformId, setSelectedPlatformId] = useState<string | null>(null);
  const { toast } = useToast();

  // Load selected platform from localStorage on component mount
  useEffect(() => {
    const savedPlatform = localStorage.getItem('selectedSocialMediaPlatform');
    if (savedPlatform) {
      setSelectedPlatformId(savedPlatform);
    }
  }, []);

  // Get platform icon component
  const getPlatformIcon = (platform: SocialMediaPlatform) => {
    switch (platform.icon) {
      case 'instagram':
        return <Instagram className="h-4 w-4 mr-2" />;
      case 'twitter':
        return <Twitter className="h-4 w-4 mr-2" />;
      case 'facebook':
        return <Facebook className="h-4 w-4 mr-2" />;
      case 'linkedin':
        return <Linkedin className="h-4 w-4 mr-2" />;
      case 'pinterest':
        return <span className="mr-2"><PinterestIcon /></span>;
      default:
        return <Share2 className="h-4 w-4 mr-2" />;
    }
  };

  // Handle platform selection
  const handlePlatformSelect = async (platform: SocialMediaPlatform) => {
    try {
      // If the platform is already selected, deselect it
      if (selectedPlatformId === platform.id) {
        setSelectedPlatformId(null);
        localStorage.removeItem('selectedSocialMediaPlatform');
        localStorage.removeItem('socialMediaOptimizedImage');
        localStorage.removeItem('socialMediaOptimizedFileName');

        toast({
          title: 'Selection Cleared',
          description: `${platform.name} optimization has been deselected.`,
          variant: 'default',
        });

        if (onPlatformSelect) onPlatformSelect('');
        return;
      }

      setIsOptimizing(true);
      if (onOptimizationStart) onOptimizationStart();

      // Show toast notification
      toast({
        title: `Optimizing for ${platform.name}`,
        description: `Converting to ${platform.width}x${platform.height}px ${platform.format.toUpperCase()}...`,
      });

      // Optimize the image
      const optimizedImageUrl = await optimizeForSocialMedia(imageUrl, platform);

      // Generate a filename
      const fileExtension = platform.format === 'jpg' ? 'jpg' :
                           platform.format === 'png' ? 'png' : 'webp';
      const baseFileName = fileName.split('.')[0] || 'image';
      const optimizedFileName = `${baseFileName}_${platform.id}.${fileExtension}`;

      // Save the selection and optimized image in localStorage
      localStorage.setItem('selectedSocialMediaPlatform', platform.id);
      localStorage.setItem('socialMediaOptimizedImage', optimizedImageUrl);
      localStorage.setItem('socialMediaOptimizedFileName', optimizedFileName);

      // Update state
      setSelectedPlatformId(platform.id);

      // Call the callback if provided
      if (onPlatformSelect) onPlatformSelect(platform.id);

      // Show success notification
      toast({
        title: 'Platform Selected',
        description: `Your image will be optimized for ${platform.name}`,
        variant: 'default',
      });
    } catch (error) {
      console.error('Error optimizing image:', error);
      toast({
        title: 'Optimization Failed',
        description: 'There was an error optimizing your image. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsOptimizing(false);
      if (onOptimizationComplete) onOptimizationComplete();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={selectedPlatformId ? "default" : "outline"}
          size="sm"
          className={`flex items-center gap-1 ${selectedPlatformId ? 'bg-blue-500 hover:bg-blue-600' : ''}`}
          disabled={isOptimizing}
        >
          {selectedPlatformId ? (
            <Check className="h-4 w-4" />
          ) : (
            <Share2 className="h-4 w-4" />
          )}
          {isOptimizing ? 'Optimizing...' : selectedPlatformId ? 'Platform Selected' : 'Social Media'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Optimize for Platform</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Instagram Options */}
        <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">Instagram</DropdownMenuLabel>
        {socialMediaPlatforms
          .filter(platform => platform.icon === 'instagram')
          .map(platform => (
            <DropdownMenuItem
              key={platform.id}
              onClick={() => handlePlatformSelect(platform)}
              disabled={isOptimizing}
              className="relative"
            >
              {getPlatformIcon(platform)}
              <div className="flex flex-col flex-1">
                <span>{platform.name}</span>
                <span className="text-xs text-muted-foreground">
                  {platform.width}x{platform.height}px, {platform.format.toUpperCase()}
                </span>
              </div>
              {selectedPlatformId === platform.id && (
                <Check className="h-4 w-4 text-blue-500 ml-2" />
              )}
            </DropdownMenuItem>
          ))
        }

        <DropdownMenuSeparator />

        {/* Other Platforms */}
        <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">Other Platforms</DropdownMenuLabel>
        {socialMediaPlatforms
          .filter(platform => platform.icon !== 'instagram')
          .map(platform => (
            <DropdownMenuItem
              key={platform.id}
              onClick={() => handlePlatformSelect(platform)}
              disabled={isOptimizing}
              className="relative"
            >
              {getPlatformIcon(platform)}
              <div className="flex flex-col flex-1">
                <span>{platform.name}</span>
                <span className="text-xs text-muted-foreground">
                  {platform.width}x{platform.height}px, {platform.format.toUpperCase()}
                </span>
              </div>
              {selectedPlatformId === platform.id && (
                <Check className="h-4 w-4 text-blue-500 ml-2" />
              )}
            </DropdownMenuItem>
          ))
        }
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SocialMediaDropdown;
