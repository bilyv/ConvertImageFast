
import React from 'react';
import { Helmet } from 'react-helmet-async';
import ImageConverter from '../components/ImageConverter';
import { FileImage, Crop, Image, ArrowRight } from 'lucide-react';

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col bg-app-background">
      <Helmet>
        <title>Image Format Converter - Crop, Convert & Transform Your Images</title>
        <meta name="description" content="Free online tool to convert images between formats. Crop, convert from PNG to JPG, JPG to PNG, WebP to JPG, and more. No download required." />
        <meta name="keywords" content="image converter, image crop, png to jpg, jpg to png, webp converter, image format, online converter, image crop tool, image transformation, jfif converter" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Image Format Converter - Crop & Convert Images Online" />
        <meta property="og:description" content="Free online tool to convert images between formats. Crop, convert from PNG to JPG, JPG to PNG, WebP to JPG, and more." />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Image Format Converter - Crop & Convert Images Online" />
        <meta name="twitter:description" content="Free online tool to convert images between formats. Crop, convert from PNG to JPG, JPG to PNG, WebP to JPG, and more." />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://imageconverter.example.com/" />
      </Helmet>
      
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-app-primary">Image Format Converter</h1>
        </div>
      </header>
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Hero section */}
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm mb-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Convert & Crop Your Images</h2>
              <p className="text-lg text-gray-600 mb-6">
                Free online tool to convert between image formats and crop your images. No downloads required.
              </p>
              
              {/* Animation of moving crop images */}
              <div className="relative h-16 overflow-hidden mb-6">
                <div className="flex gap-3 absolute animate-crop-movement">
                  <div className="flex items-center px-3 py-1 bg-app-primary/10 rounded-full">
                    <FileImage className="h-5 w-5 text-app-primary mr-2" />
                    <span className="text-sm font-medium">PNG</span>
                    <ArrowRight className="h-4 w-4 mx-2" />
                    <span className="text-sm font-medium">JPG</span>
                  </div>
                  <div className="flex items-center px-3 py-1 bg-app-accent/10 rounded-full">
                    <FileImage className="h-5 w-5 text-app-accent mr-2" />
                    <span className="text-sm font-medium">JPG</span>
                    <ArrowRight className="h-4 w-4 mx-2" />
                    <span className="text-sm font-medium">WebP</span>
                  </div>
                  <div className="flex items-center px-3 py-1 bg-app-primary/10 rounded-full">
                    <Crop className="h-5 w-5 text-app-primary mr-2" />
                    <span className="text-sm font-medium">Crop</span>
                  </div>
                  <div className="flex items-center px-3 py-1 bg-app-accent/10 rounded-full">
                    <FileImage className="h-5 w-5 text-app-accent mr-2" />
                    <span className="text-sm font-medium">WebP</span>
                    <ArrowRight className="h-4 w-4 mx-2" />
                    <span className="text-sm font-medium">PNG</span>
                  </div>
                  <div className="flex items-center px-3 py-1 bg-app-primary/10 rounded-full">
                    <Image className="h-5 w-5 text-app-primary mr-2" />
                    <span className="text-sm font-medium">JFIF</span>
                    <ArrowRight className="h-4 w-4 mx-2" />
                    <span className="text-sm font-medium">PNG</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <ImageConverter />
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Image Format Converter • Your images are processed in your browser and are never uploaded to a server.
          </p>
        </div>
      </footer>
    </div>
  );
}
