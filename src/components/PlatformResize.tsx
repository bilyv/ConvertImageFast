
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export interface PlatformSize {
  id: string;
  name: string;
  width: number;
  height: number;
  description: string;
  icon?: React.ReactNode;
}

interface PlatformResizeProps {
  onSelectSize: (width: number, height: number) => void;
}

const PlatformResize: React.FC<PlatformResizeProps> = ({ onSelectSize }) => {
  // Popular platform dimensions
  const platformSizes: PlatformSize[] = [
    {
      id: 'instagram-post',
      name: 'Instagram Post',
      width: 1080,
      height: 1080,
      description: 'Square 1:1 format for Instagram feed posts'
    },
    {
      id: 'instagram-story',
      name: 'Instagram Story',
      width: 1080,
      height: 1920,
      description: 'Vertical 9:16 format for Instagram stories'
    },
    {
      id: 'tiktok-video',
      name: 'TikTok Video',
      width: 1080,
      height: 1920,
      description: 'Vertical 9:16 format for TikTok videos'
    },
    {
      id: 'youtube-thumbnail',
      name: 'YouTube Thumbnail',
      width: 1280,
      height: 720,
      description: '16:9 format for YouTube video thumbnails'
    },
    {
      id: 'facebook-post',
      name: 'Facebook Post',
      width: 1200,
      height: 630,
      description: 'Rectangular format for Facebook posts'
    },
    {
      id: 'twitter-post',
      name: 'X/Twitter Post',
      width: 1200,
      height: 675,
      description: '16:9 format for Twitter image posts'
    }
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium">Resize for platforms:</h3>
      <div className="flex flex-wrap gap-2">
        {platformSizes.map((platform) => (
          <Tooltip key={platform.id}>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="border-app-primary/30 hover:border-app-primary hover:bg-app-primary/5"
                onClick={() => onSelectSize(platform.width, platform.height)}
              >
                {platform.name}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p className="text-xs">{platform.description}</p>
              <p className="text-xs font-medium mt-1">{platform.width} x {platform.height} px</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};

export default PlatformResize;
