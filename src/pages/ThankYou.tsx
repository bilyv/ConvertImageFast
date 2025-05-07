
import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
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
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Thank You | Image Converter</title>
        <meta name="description" content="Thank you for using our image converter" />
      </Helmet>
      
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-lg w-full bg-white shadow-lg rounded-lg overflow-hidden border border-border">
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-app-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-app-primary">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h1>
            <p className="text-gray-600 mb-6">Your image has been successfully converted.</p>
            
            {imageData.convertedUrl && (
              <div className="mb-6">
                <div className="aspect-video max-h-48 flex items-center justify-center mb-4 bg-muted/20 rounded-lg overflow-hidden">
                  <img 
                    src={imageData.convertedUrl} 
                    alt="Converted image" 
                    className="object-contain max-h-full max-w-full"
                  />
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">
                  Filename: <span className="font-medium">{imageData.convertedFileName}</span>
                </p>
                
                <Button 
                  onClick={handleDownload}
                  className="bg-app-primary hover:bg-app-primary/90 text-white w-full"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Image
                </Button>
              </div>
            )}
            
            <div className="mt-6 pt-6 border-t border-gray-100">
              <Link to="/">
                <Button variant="outline" className="w-full">
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
