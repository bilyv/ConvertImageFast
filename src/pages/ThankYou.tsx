
import React, { useState } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Download, ArrowLeft, Share2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import SocialMediaResizeButton from '@/components/SocialMediaResizeButton';
import { useToast } from '@/hooks/use-toast';

const ThankYou: React.FC = () => {
  const location = useLocation();
  const imageData = location.state?.imageData;
  const { toast } = useToast();

  // State for social media resized image
  const [resizedImage, setResizedImage] = useState<{
    url: string;
    platform: {
      id: string;
      name: string;
      width: number;
      height: number;
      format: string;
    };
  } | null>(null);

  // If no image data was passed, redirect to home
  if (!imageData) {
    return <Navigate to="/" replace />;
  }

  // Handle when an image is resized for social media
  const handleImageResized = (resizedImageUrl: string, platform: any) => {
    setResizedImage({
      url: resizedImageUrl,
      platform: platform
    });

    toast({
      title: 'Image Resized',
      description: `Your image has been resized for ${platform.name}`,
      variant: 'default'
    });
  };

  // Function to handle image download
  const handleDownload = () => {
    // Check if there's a resized image
    if (resizedImage) {
      const fileExtension = resizedImage.platform.format === 'jpg' ? 'jpg' :
                           resizedImage.platform.format === 'png' ? 'png' : 'webp';
      const baseFileName = imageData.convertedFileName?.split('.')[0] || 'image';
      const optimizedFileName = `${baseFileName}_${resizedImage.platform.id}.${fileExtension}`;

      const link = document.createElement('a');
      link.href = resizedImage.url;
      link.download = optimizedFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: 'Image Downloaded',
        description: `Your resized image has been downloaded as ${optimizedFileName}`,
        variant: 'default'
      });
    }
    // Check if there's a social media optimized image
    else if (imageData.socialMedia) {
      const link = document.createElement('a');
      link.href = imageData.socialMedia.optimizedUrl;
      link.download = imageData.socialMedia.optimizedFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clear the social media data from localStorage after download
      localStorage.removeItem('selectedSocialMediaPlatform');
      localStorage.removeItem('socialMediaOptimizedImage');
      localStorage.removeItem('socialMediaOptimizedFileName');
    }
    // Otherwise, download the regular converted image
    else if (imageData.convertedUrl) {
      const link = document.createElement('a');
      link.href = imageData.convertedUrl;
      link.download = imageData.convertedFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-app-background">
      <Helmet>
        <title>Conversion Complete | ConvertImageFast</title>
        <meta name="description" content="Your image has been successfully converted. Download your converted image now." />
      </Helmet>

      {/* Header Navigation */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-center">
          <div className="flex items-center space-x-3">
            <img src="/green-file-icon.png" alt="ConvertImageFast Logo" className="h-10 w-10" />
            <span className="text-xl font-bold text-app-primary">ConvertImageFast</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden border border-border">
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-app-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-app-primary">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>

            <h1 className="text-2xl font-bold text-gray-800 mb-2" id="success-heading">Success! Your Image is Ready</h1>
            <p className="text-gray-600 mb-6">
              {imageData.socialMedia
                ? 'Your image has been optimized for social media.'
                : 'Your image has been successfully converted.'}
            </p>

            {(imageData.convertedUrl || imageData.socialMedia || resizedImage) && (
              <div className="mb-6">
                <div className="aspect-video max-h-48 flex items-center justify-center mb-4 bg-muted/20 rounded-lg overflow-hidden">
                  <img
                    src={resizedImage ? resizedImage.url :
                         imageData.socialMedia ? imageData.socialMedia.optimizedUrl :
                         imageData.convertedUrl}
                    alt="Converted image"
                    className={`object-contain max-h-full max-w-full ${imageData.isCircularMode && !resizedImage ? 'rounded-full' : ''}`}
                  />
                </div>

                <p className="text-sm text-muted-foreground mb-2">
                  {resizedImage ?
                    `${imageData.convertedFileName?.split('.')[0] || 'image'}_${resizedImage.platform.id}.${resizedImage.platform.format}` :
                    imageData.socialMedia ?
                      imageData.socialMedia.optimizedFileName :
                      imageData.convertedFileName}
                  {!resizedImage && !imageData.socialMedia && imageData.format &&
                    <span className="ml-1">• {imageData.format.toUpperCase()}</span>}
                </p>

                {resizedImage && (
                  <p className="text-xs text-muted-foreground mb-2 flex items-center">
                    <span className="inline-flex items-center justify-center bg-green-500 text-white rounded-full h-4 w-4 mr-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </span>
                    Resized for {resizedImage.platform.name}
                  </p>
                )}

                {imageData.socialMedia && !resizedImage && (
                  <p className="text-xs text-muted-foreground mb-2 flex items-center">
                    <span className="inline-flex items-center justify-center bg-blue-500 text-white rounded-full h-4 w-4 mr-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                    </span>
                    Optimized for social media
                  </p>
                )}

                {resizedImage && (
                  <p className="text-xs text-muted-foreground mb-4">
                    Dimensions: {resizedImage.platform.width}×{resizedImage.platform.height} px
                  </p>
                )}

                {imageData.resizeDimensions && !imageData.socialMedia && !resizedImage && (
                  <p className="text-xs text-muted-foreground mb-4">
                    {imageData.isCircularMode
                      ? `Circular image • ${imageData.resizeDimensions.width}×${imageData.resizeDimensions.height} px`
                      : `Dimensions: ${imageData.resizeDimensions.width}×${imageData.resizeDimensions.height} px`}
                  </p>
                )}

                <div className="flex flex-col gap-3">
                  <Button
                    onClick={handleDownload}
                    className="bg-app-primary hover:bg-app-primary/90 text-white w-full"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {resizedImage
                      ? 'Download Resized Image'
                      : imageData.socialMedia
                        ? 'Download Optimized Image'
                        : 'Download Converted Image'}
                  </Button>

                  {/* Social Media Resize Button */}
                  <SocialMediaResizeButton
                    imageUrl={imageData.convertedUrl || imageData.originalUrl}
                    fileName={imageData.convertedFileName || imageData.originalFileName || 'image.jpg'}
                    onImageResized={handleImageResized}
                  />
                </div>
              </div>
            )}

            <div className="mt-4 pt-4 border-t border-gray-100">
              <Link to="/">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Convert Another Image
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ThankYou;
