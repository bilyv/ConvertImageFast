/**
 * Social Media Utilities
 * 
 * This file contains utilities for optimizing images for various social media platforms.
 * It includes specifications for image dimensions and formats for each platform.
 */

import { FormatOption } from '@/components/ConversionOptions';

/**
 * Interface for social media platform specifications
 */
export interface SocialMediaPlatform {
  id: string;
  name: string;
  icon: string;
  width: number;
  height: number;
  format: FormatOption;
  aspectRatio?: number;
  maxFileSize?: number; // in bytes
  description: string;
}

/**
 * List of supported social media platforms with their image specifications
 */
export const socialMediaPlatforms: SocialMediaPlatform[] = [
  {
    id: 'instagram-square',
    name: 'Instagram Post',
    icon: 'instagram',
    width: 1080,
    height: 1080,
    format: 'jpg',
    aspectRatio: 1,
    maxFileSize: 30 * 1024 * 1024, // 30MB
    description: 'Square post (1:1) - optimal for feed posts'
  },
  {
    id: 'instagram-portrait',
    name: 'Instagram Portrait',
    icon: 'instagram',
    width: 1080,
    height: 1350,
    format: 'jpg',
    aspectRatio: 4/5,
    maxFileSize: 30 * 1024 * 1024, // 30MB
    description: 'Portrait (4:5) - maximizes screen space in feed'
  },
  {
    id: 'instagram-story',
    name: 'Instagram Story',
    icon: 'instagram',
    width: 1080,
    height: 1920,
    format: 'jpg',
    aspectRatio: 9/16,
    maxFileSize: 30 * 1024 * 1024, // 30MB
    description: 'Story/Reel (9:16) - full-screen vertical format'
  },
  {
    id: 'twitter',
    name: 'Twitter/X',
    icon: 'twitter',
    width: 1200,
    height: 675,
    format: 'webp',
    aspectRatio: 16/9,
    maxFileSize: 5 * 1024 * 1024, // 5MB
    description: 'Timeline image (16:9) - optimal for tweets'
  },
  {
    id: 'facebook-post',
    name: 'Facebook Post',
    icon: 'facebook',
    width: 1200,
    height: 630,
    format: 'jpg',
    aspectRatio: 1.91,
    maxFileSize: 30 * 1024 * 1024, // 30MB
    description: 'Feed post (1.91:1) - optimal for timeline'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: 'linkedin',
    width: 1200,
    height: 627,
    format: 'jpg',
    aspectRatio: 1.91,
    maxFileSize: 5 * 1024 * 1024, // 5MB
    description: 'Share image (1.91:1) - optimal for feed'
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    icon: 'pinterest',
    width: 1000,
    height: 1500,
    format: 'jpg',
    aspectRatio: 2/3,
    maxFileSize: 20 * 1024 * 1024, // 20MB
    description: 'Pin (2:3) - optimal for Pinterest feed'
  }
];

/**
 * Get a social media platform by ID
 * 
 * @param id The ID of the platform to retrieve
 * @returns The platform object or undefined if not found
 */
export const getPlatformById = (id: string): SocialMediaPlatform | undefined => {
  return socialMediaPlatforms.find(platform => platform.id === id);
};

/**
 * Resize and convert an image for a specific social media platform
 * 
 * @param imageUrl The URL of the image to convert
 * @param platform The social media platform to optimize for
 * @returns Promise that resolves to a data URL of the optimized image
 */
export const optimizeForSocialMedia = (
  imageUrl: string,
  platform: SocialMediaPlatform
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // Handle CORS issues
    
    img.onload = () => {
      try {
        // Create a canvas with the target dimensions
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error("Failed to create canvas context"));
          return;
        }
        
        // Set canvas dimensions to the target size
        canvas.width = platform.width;
        canvas.height = platform.height;
        
        // Fill the background with white (for images with transparency)
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Calculate dimensions to maintain aspect ratio
        const originalAspectRatio = img.width / img.height;
        const targetAspectRatio = platform.width / platform.height;
        
        let drawWidth, drawHeight, offsetX = 0, offsetY = 0;
        
        if (originalAspectRatio > targetAspectRatio) {
          // Image is wider than target: crop sides
          drawHeight = platform.height;
          drawWidth = img.width * (drawHeight / img.height);
          offsetX = (platform.width - drawWidth) / 2;
        } else {
          // Image is taller than target: crop top/bottom
          drawWidth = platform.width;
          drawHeight = img.height * (drawWidth / img.width);
          offsetY = (platform.height - drawHeight) / 2;
        }
        
        // Draw the image centered on the canvas
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        
        // Convert to the appropriate format
        let mimeType = 'image/jpeg';
        let quality = 0.9;
        
        if (platform.format === 'png') {
          mimeType = 'image/png';
          quality = 1.0;
        } else if (platform.format === 'webp') {
          mimeType = 'image/webp';
          quality = 0.9;
        }
        
        // Get the data URL
        const dataUrl = canvas.toDataURL(mimeType, quality);
        resolve(dataUrl);
      } catch (error) {
        reject(error);
      }
    };
    
    img.onerror = (error) => {
      reject(new Error(`Failed to load image: ${error}`));
    };
    
    img.src = imageUrl;
  });
};
