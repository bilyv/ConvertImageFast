import React from 'react';
import { Helmet } from 'react-helmet-async';
import ImageCompressorComponent from '../components/ImageCompressorComponent';
import BreadcrumbNav from '../components/BreadcrumbNav';
import Header from '../components/Header';

const ImageCompressor = () => {
  return (
    <div className="min-h-screen bg-app-background">
      {/* SEO Metadata */}
      <Helmet>
        <title>Image Compressor | ConvertImageFast | Free Online Tool</title>
        <meta name="description" content="Compress images online without losing quality. Reduce file size for web, email, or social media. Free, secure, browser-based tool with no registration required." />
        <meta name="keywords" content="image compressor, compress images, reduce image size, image optimization, free image compressor" />
        <link rel="canonical" href="https://convertimagefast.com/compress" />
      </Helmet>

      <Header />

      <main className="container mx-auto px-4 py-8">
        <BreadcrumbNav />

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Image Compressor</h1>
          <p className="text-muted-foreground mb-8">
            Compress your images to reduce file size while maintaining quality. Perfect for web, email, or social media.
          </p>

          <ImageCompressorComponent />
        </div>
      </main>
    </div>
  );
};

export default ImageCompressor;
