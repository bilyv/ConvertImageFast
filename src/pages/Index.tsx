
import React from 'react';
import { Helmet } from 'react-helmet-async';
import ImageConverter from '../components/ImageConverter';
import BreadcrumbNav from '../components/BreadcrumbNav';
import { GooeyText } from '@/components/ui/gooey-text';

const Index = () => {
  return (
    <div className="min-h-screen bg-app-background">
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
        
        {/* Schema.org structured data */}
        {/* ... keep existing code (schema.org structured data for FAQs and How-To) */}
      </Helmet>

      {/* Header Navigation - Removed links and kept only the logo/title */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-center">
          <div className="flex items-center space-x-1">
            <img src="/logo.png" alt="ImageConvert Logo - Online Image Format Converter" className="h-8 w-8" onError={(e) => e.currentTarget.style.display = 'none'} />
            <div className="h-10 w-64"> {/* Fixed height and width for the title */}
              <GooeyText 
                texts={["ImageConvert", "Image Format Converter"]} 
                morphTime={1.5}
                cooldownTime={2}
                className="font-bold"
                textClassName="text-app-primary text-xl"
              />
            </div>
          </div>
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
      
      {/* About Section with enhanced design */}
      <section id="about" className="py-12 bg-muted/20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="relative flex items-center justify-center mb-8">
            <div className="h-0.5 bg-gradient-to-r from-transparent via-app-primary/50 to-transparent w-full"></div>
            <h2 className="text-2xl md:text-3xl font-bold text-center text-app-text bg-muted/20 px-6 absolute">
              About Our Image Format Converter
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-app-primary">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-app-primary mr-2"></span>
                Why Convert Image Formats?
              </h3>
              <p className="mb-4">
                Different image formats serve different purposes. PNG files support transparency but can be large, JPG files are compact 
                but don't support transparency, and WebP offers both transparency and compression, but isn't supported everywhere.
              </p>
              <p>
                Our image format converter helps you easily switch between these formats 
                for optimal file size, quality, and compatibility with various platforms.
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

      {/* FAQ Section with improved design */}
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
              <h3 className="text-lg font-semibold mb-3 text-app-primary">How do I convert PNG to JPG online?</h3>
              <p className="pl-5 border-l-2 border-app-primary/30">
                Simply upload your PNG image using our tool, select JPG as the output format, adjust the quality if needed, 
                and click "Convert". Then download your converted JPG image.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-muted">
              <h3 className="text-lg font-semibold mb-3 text-app-primary">Can I convert multiple images at once?</h3>
              <p className="pl-5 border-l-2 border-app-primary/30">
                Yes, our image converter supports batch processing. Upload multiple files, convert them all at once, 
                and download them individually or as a batch.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-muted">
              <h3 className="text-lg font-semibold mb-3 text-app-primary">What's the maximum file size for conversion?</h3>
              <p className="pl-5 border-l-2 border-app-primary/30">
                You can convert images up to 10MB each. This limit ensures optimal performance while still accommodating most common image sizes.
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
