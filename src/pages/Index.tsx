
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import ImageConverter from '../components/ImageConverter';
import BreadcrumbNav from '../components/BreadcrumbNav';
import { MoonIcon, SunIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Check for system preference on initial load
  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-app-background'}`}>
      {/* SEO Metadata with enhanced information */}
      <Helmet>
        <title>Image Format Converter | PNG to JPG | WebP Converter Online</title>
        <meta name="description" content="Easily convert images between PNG, JPG, and WebP formats with our free online tool. Fast, secure, and no registration required." />
        <meta name="keywords" content="png to jpg converter, convert png to jpg online, jpg to png converter, webp to jpg converter, image format converter" />
        <link rel="canonical" href="https://imageconvert.app" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:title" content="Image Format Converter | PNG to JPG | WebP Converter Online" />
        <meta property="og:description" content="Easily convert images between PNG, JPG, and WebP formats with our free online tool. Fast, secure, and no registration required." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://imageconvert.app" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Image Format Converter | PNG to JPG | WebP Converter Online" />
        <meta name="twitter:description" content="Easily convert images between PNG, JPG, and WebP formats with our free online tool. Fast, secure, and no registration required." />
        
        {/* Schema.org structured data for FAQs */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How do I convert PNG to JPG online?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Simply upload your PNG image using our tool, select JPG as the output format, adjust the quality if needed, and click 'Convert'. Then download your converted JPG image."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I convert multiple images at once?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, our image converter supports batch processing. Upload multiple files, convert them all at once, and download them individually or as a batch."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Will converting from PNG to JPG lose transparency?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, JPG does not support transparency. When converting from PNG with transparency to JPG, transparent areas will become white. If you need to preserve transparency, consider using WebP as your output format instead."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What's the maximum file size for conversion?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "You can convert images up to 10MB each. This limit ensures optimal performance while still accommodating most common image sizes."
                  }
                }
              ]
            }
          `}
        </script>
        
        {/* Schema.org structured data for How-To */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "HowTo",
              "name": "How to Convert PNG to JPG",
              "description": "Step-by-step guide to convert PNG images to JPG format online.",
              "step": [
                {
                  "@type": "HowToStep",
                  "name": "Upload Image",
                  "text": "Click the upload button or drag and drop your PNG image into the upload area.",
                  "position": 1
                },
                {
                  "@type": "HowToStep",
                  "name": "Select Format",
                  "text": "Choose JPG as your output format from the dropdown menu.",
                  "position": 2
                },
                {
                  "@type": "HowToStep",
                  "name": "Adjust Settings",
                  "text": "Optionally, adjust the quality setting for your JPG output.",
                  "position": 3
                },
                {
                  "@type": "HowToStep",
                  "name": "Convert",
                  "text": "Click the 'Convert' button to process your image.",
                  "position": 4
                },
                {
                  "@type": "HowToStep",
                  "name": "Download",
                  "text": "Click the download button to save your converted JPG image.",
                  "position": 5
                }
              ]
            }
          `}
        </script>
      </Helmet>

      {/* Header Navigation */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <img src="/logo.png" alt="ImageConvert Logo - Online Image Format Converter" className="h-8 w-8" onError={(e) => e.currentTarget.style.display = 'none'} />
            <span className="text-xl font-bold text-app-primary">ImageConvert</span>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <a href="/" className="text-app-text hover:text-app-primary transition-colors" aria-label="Home page">Home</a>
            <a href="/#tools" className="text-app-text hover:text-app-primary transition-colors" aria-label="Image conversion tools">Tools</a>
            <a href="/#about" className="text-app-text hover:text-app-primary transition-colors" aria-label="About our image converter">About</a>
            <a href="/#contact" className="text-app-text hover:text-app-primary transition-colors" aria-label="Contact us">Contact</a>
          </nav>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={toggleDarkMode}
            className="ml-auto md:ml-0"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      {/* Breadcrumb Navigation */}
      <BreadcrumbNav />

      {/* Hero Section with SEO optimized content */}
      <section className="pt-12 pb-8 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-app-text mb-3">
            Image Format Converter: PNG to JPG, JPG to PNG, WebP Converter
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Instantly convert between PNG, JPG, and WebP formats with our free online tool.
            No signup required, and your images never leave your browser for maximum privacy and security.
          </p>
          
          {/* SEO-friendly format options */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="px-3 py-1 bg-app-primary/10 text-app-primary rounded-full text-sm">PNG to JPG Converter</span>
            <span className="px-3 py-1 bg-app-primary/10 text-app-primary rounded-full text-sm">JPG to PNG Converter</span>
            <span className="px-3 py-1 bg-app-primary/10 text-app-primary rounded-full text-sm">WebP to JPG Converter</span>
            <span className="px-3 py-1 bg-app-primary/10 text-app-primary rounded-full text-sm">PNG to WebP Converter</span>
          </div>
        </div>
      </section>
      
      {/* Main Content / Tool Section */}
      <main className="pb-12" id="tools">
        <ImageConverter />
      </main>
      
      {/* About Section with SEO content */}
      <section id="about" className="py-12 bg-muted/20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-app-text mb-8">About Our Image Format Converter</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Why Convert Image Formats?</h3>
              <p className="mb-4">
                Different image formats serve different purposes. PNG files support transparency but can be large, JPG files are compact 
                but don't support transparency, and WebP offers both transparency and compression, but isn't supported everywhere.
              </p>
              <p>
                Our image format converter helps you easily switch between these formats 
                for optimal file size, quality, and compatibility with various platforms.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3">Security & Privacy First</h3>
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

      {/* FAQ Section for SEO */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-app-text mb-8">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">How do I convert PNG to JPG online?</h3>
              <p>
                Simply upload your PNG image using our tool, select JPG as the output format, adjust the quality if needed, 
                and click "Convert". Then download your converted JPG image.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Can I convert multiple images at once?</h3>
              <p>
                Yes, our image converter supports batch processing. Upload multiple files, convert them all at once, 
                and download them individually or as a batch.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">What's the maximum file size for conversion?</h3>
              <p>
                You can convert images up to 10MB each. This limit ensures optimal performance while still accommodating most common image sizes.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Will converting from PNG to JPG lose transparency?</h3>
              <p>
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
            Feel free to reach out if you have any questions about our image conversion tools or need assistance.
          </p>
          <a href="mailto:contact@imageconvert.app" className="text-app-primary hover:underline">
            contact@imageconvert.app
          </a>
        </div>
      </section>
      
      {/* Footer with SEO optimized links */}
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
            <p>Convert PNG to JPG, JPG to PNG, WebP to JPG, PNG to WebP, and more - all for free, with no sign-up required.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
