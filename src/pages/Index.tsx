import React from 'react';
import { Helmet } from 'react-helmet-async';
import ImageConverter from '../components/ImageConverter';
import BreadcrumbNav from '../components/BreadcrumbNav';
import { GooeyText } from '@/components/ui/gooey-text';
import ConversionAnimation from '../components/ConversionAnimation';

const Index = () => {
  return (
    <div className="min-h-screen bg-app-background">
      {/* Enhanced SEO Metadata with cropping functionality mentioned */}
      <Helmet>
        <title>Image Format Converter | Crop, Convert PNG, JPG, WebP, JFIF | Free Online Tool</title>
        <meta name="description" content="Free online image converter with cropping functionality. Convert between PNG, JPG, WebP, JFIF, BMP, GIF and more formats. No registration required - process images directly in your browser." />
        <meta name="keywords" content="image converter, image cropper, crop and convert, png to jpg converter, jpg to png, webp converter, jfif converter, image format converter, free image converter, online image tools, crop images online" />
        <link rel="canonical" href="https://imageconvert.app" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:title" content="Image Format Converter | Crop, Convert PNG, JPG, WebP, JFIF" />
        <meta property="og:description" content="Free online image converter with cropping functionality. Convert between PNG, JPG, WebP, JFIF, BMP, GIF and more formats. No registration required - process images directly in your browser." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://imageconvert.app" />
        <meta property="og:image" content="https://imageconvert.app/og-image.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Image Format Converter | Crop, Convert PNG, JPG, WebP, JFIF" />
        <meta name="twitter:description" content="Free online image converter with cropping functionality. Convert between PNG, JPG, WebP, JFIF, BMP, GIF and more formats. No registration required - process images directly in your browser." />
        <meta name="twitter:image" content="https://imageconvert.app/twitter-image.jpg" />
        
        {/* Additional SEO metadata */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="ImageConvert.app" />
        
        {/* Schema.org structured data */}
        <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Image Format Converter",
          "url": "https://imageconvert.app",
          "description": "Free online image converter with cropping functionality. Convert between PNG, JPG, WebP, JFIF, BMP, GIF and more formats.",
          "applicationCategory": "Multimedia",
          "offers": {
            "@type": "Offer",
            "price": "0"
          },
          "featureList": ["Image format conversion", "Image cropping", "Browser-based processing", "No registration required"]
        }
        `}</script>
      </Helmet>

      {/* Header Navigation with Animation */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col items-center justify-center">
          <div className="flex items-center space-x-1">
            <img src="/logo.png" alt="ImageConvert Logo - Online Image Format Converter" className="h-8 w-8" onError={(e) => e.currentTarget.style.display = 'none'} />
            <div className="h-10 w-64">
              <GooeyText 
                texts={["ImageConvert", "Image Format Converter"]} 
                morphTime={1.5}
                cooldownTime={2}
                className="font-bold"
                textClassName="text-app-primary text-xl"
              />
            </div>
          </div>
          
          {/* Add the animation component here */}
          <div className="w-full mt-2">
            <ConversionAnimation />
          </div>
        </div>
      </header>

      {/* Breadcrumb Navigation */}
      <BreadcrumbNav />

      {/* Hero Section */}
      <section className="pt-12 pb-8 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-app-text mb-3">
            Image Format Converter: Crop & Convert to Multiple Formats
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Instantly crop and convert images between PNG, JPG, WebP, JFIF, BMP, GIF, and more formats with our free online tool.
            No signup required, and your images never leave your browser for maximum privacy and security.
          </p>
          
          {/* SEO-friendly format options with JFIF included */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="px-3 py-1 bg-app-primary/10 text-app-primary rounded-full text-sm">Crop Images Online</span>
            <span className="px-3 py-1 bg-app-primary/10 text-app-primary rounded-full text-sm">PNG to JPG Converter</span>
            <span className="px-3 py-1 bg-app-primary/10 text-app-primary rounded-full text-sm">JPG to PNG Converter</span>
            <span className="px-3 py-1 bg-app-primary/10 text-app-primary rounded-full text-sm">WebP to JPG Converter</span>
            <span className="px-3 py-1 bg-app-primary/10 text-app-primary rounded-full text-sm">PNG to WebP Converter</span>
            <span className="px-3 py-1 bg-app-primary/10 text-app-primary rounded-full text-sm">JFIF to PNG Converter</span>
            <span className="px-3 py-1 bg-app-primary/10 text-app-primary rounded-full text-sm">JFIF to JPG Converter</span>
            <span className="px-3 py-1 bg-app-primary/10 text-app-primary rounded-full text-sm">Convert Image Formats</span>
          </div>
        </div>
      </section>
      
      {/* Main Content / Tool Section */}
      <main className="pb-12" id="tools">
        <ImageConverter />
      </main>
      
      {/* About Section with enhanced design and cropping information */}
      <section id="about" className="py-12 bg-muted/20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="relative flex items-center justify-center mb-8">
            <div className="h-0.5 bg-gradient-to-r from-transparent via-app-primary/50 to-transparent w-full"></div>
            <h2 className="text-2xl md:text-3xl font-bold text-center text-app-text bg-muted/20 px-6 absolute">
              About Our Image Converter
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-app-primary">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-app-primary mr-2"></span>
                Crop & Convert Images Online
              </h3>
              <p className="mb-4">
                Our tool allows you to both crop and convert your images in one place. Crop unwanted areas from your images 
                before converting them to your desired format for the perfect result.
              </p>
              <p>
                With support for PNG, JPG, WebP, JFIF, BMP, GIF, and more formats, you can easily prepare your images 
                for any project or platform.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-app-accent">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-app-accent mr-2"></span>
                Security & Privacy First
              </h3>
              <p className="mb-4">
                Our image converter processes your files directly in your browser. Your images are never uploaded to any server, 
                ensuring complete privacy and security for your sensitive content.
              </p>
              <p>
                After 30 minutes, all processed images are automatically removed from your browser's memory for added privacy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section with improved design and cropping information */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="relative flex items-center justify-center mb-10">
            <div className="h-0.5 bg-gradient-to-r from-transparent via-app-accent/50 to-transparent w-full"></div>
            <h2 className="text-2xl md:text-3xl font-bold text-center text-app-text bg-app-background px-6 absolute">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-muted">
              <h3 className="text-lg font-semibold mb-3 text-app-primary">How do I crop and convert an image?</h3>
              <p className="pl-5 border-l-2 border-app-primary/30">
                Upload your image using our tool, click the "Crop Image" button to select the area you want to keep, 
                then select your desired output format and click "Convert". You can then download your cropped and converted image.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-muted">
              <h3 className="text-lg font-semibold mb-3 text-app-primary">What is a JFIF file?</h3>
              <p className="pl-5 border-l-2 border-app-primary/30">
                JFIF (JPEG File Interchange Format) is essentially a JPEG image format. Our converter can handle JFIF files 
                just like regular JPEG files, allowing you to convert them to PNG, WebP, or other formats as needed.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-muted">
              <h3 className="text-lg font-semibold mb-3 text-app-primary">Can I convert multiple images at once?</h3>
              <p className="pl-5 border-l-2 border-app-primary/30">
                Yes, our image converter supports batch processing. Upload multiple files of the same format, convert them all at once, 
                and download them individually or as a batch.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-muted">
              <h3 className="text-lg font-semibold mb-3 text-app-primary">Will converting from PNG to JPG lose transparency?</h3>
              <p className="pl-5 border-l-2 border-app-primary/30">
                Yes, JPG does not support transparency. When converting from PNG with transparency to JPG, transparent areas will become white.
                If you need to preserve transparency, consider using WebP as your output format instead.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-12 bg-muted/20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-app-text mb-4">Have Questions?</h2>
          <p className="mb-6">
            Feel free to reach out if you have any questions about our image conversion and cropping tools or need assistance.
          </p>
          <a href="mailto:contact@imageconvert.app" className="text-app-primary hover:underline">
            contact@imageconvert.app
          </a>
        </div>
      </section>
      
      {/* Footer with SEO optimized links including cropping functionality */}
      <footer className="border-t py-6 text-muted-foreground text-sm">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-center md:justify-between items-center">
            <p>© 2025 ImageConvert - Your images remain private and are processed entirely in your browser.</p>
            <div className="flex space-x-4 mt-3 md:mt-0">
              <a href="/privacy" className="hover:text-app-primary transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-app-primary transition-colors">Terms</a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-app-primary transition-colors">GitHub</a>
            </div>
          </div>
          <div className="mt-4 text-xs text-center text-muted-foreground/70">
            <p>Crop images and convert between PNG, JPG, WebP, JFIF, BMP, GIF, and more formats - all for free, with no sign-up required.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
