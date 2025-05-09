
import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Download, ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const ThankYou: React.FC = () => {
  const location = useLocation();
  const imageData = location.state?.imageData;

  // If no image data was passed, redirect to home
  if (!imageData) {
    return <Navigate to="/" replace />;
  }

  // Function to handle image download
  const handleDownload = () => {
    if (imageData.convertedUrl) {
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
            <p className="text-gray-600 mb-6">Your image has been successfully converted.</p>

            {imageData.convertedUrl && (
              <div className="mb-6">
                <div className="aspect-video max-h-48 flex items-center justify-center mb-4 bg-muted/20 rounded-lg overflow-hidden">
                  <img
                    src={imageData.convertedUrl}
                    alt="Converted image"
                    className={`object-contain max-h-full max-w-full ${imageData.isCircularMode ? 'rounded-full' : ''}`}
                  />
                </div>

                <p className="text-sm text-muted-foreground mb-2">
                  {imageData.convertedFileName}
                  {imageData.format && <span className="ml-1">• {imageData.format.toUpperCase()}</span>}
                </p>
                {imageData.resizeDimensions && (
                  <p className="text-xs text-muted-foreground mb-4">
                    {imageData.isCircularMode
                      ? `Circular image • ${imageData.resizeDimensions.width}×${imageData.resizeDimensions.height} px`
                      : `Dimensions: ${imageData.resizeDimensions.width}×${imageData.resizeDimensions.height} px`}
                  </p>
                )}

                <Button
                  onClick={handleDownload}
                  className="bg-app-primary hover:bg-app-primary/90 text-white w-full"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Image
                </Button>
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
