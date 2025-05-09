
import React from 'react';
import { Helmet } from 'react-helmet-async';
import ImageConverter from '../components/ImageConverter';
import BreadcrumbNav from '../components/BreadcrumbNav';

const Index = () => {
  return (
    <div className="min-h-screen bg-app-background">
      {/* Enhanced SEO Metadata with platform-specific resizing and cropping functionality mentioned */}
      <Helmet>
        <title>ConvertImageFast | Resize for Social Media, Crop & Convert Images | Free Online Tool</title>
        <meta name="description" content="Free online image converter with platform-specific resizing for Instagram, TikTok, YouTube & more. Convert between PNG, JPG, WebP, JFIF formats with cropping functionality. No registration required." />
        <meta name="keywords" content="image converter, social media image resizer, instagram resize, tiktok image size, youtube thumbnail, image cropper, crop and convert, png to jpg converter, jpg to png, webp converter, jfif converter, image format converter" />
        <link rel="canonical" href="https://convertimagefast.com" />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="ConvertImageFast | Resize for Social Media, Crop & Convert Images" />
        <meta property="og:description" content="Free online image converter with platform-specific resizing for Instagram, TikTok, YouTube & more. Convert between PNG, JPG, WebP, JFIF formats with cropping functionality." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://convertimagefast.com" />
        <meta property="og:image" content="/og-image.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ConvertImageFast | Resize for Social Media, Crop & Convert Images" />
        <meta name="twitter:description" content="Free online image converter with platform-specific resizing for Instagram, TikTok, YouTube & more. Convert between PNG, JPG, WebP, JFIF formats with cropping functionality." />
        <meta name="twitter:image" content="/twitter-image.jpg" />

        {/* Additional SEO metadata */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="ConvertImageFast.com" />

        {/* Schema.org structured data */}
        <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "ConvertImageFast",
          "url": "https://convertimagefast.com",
          "description": "Free online image converter with platform-specific resizing for Instagram, TikTok, YouTube & more. Convert between PNG, JPG, WebP, JFIF formats with cropping functionality.",
          "applicationCategory": "Multimedia",
          "offers": {
            "@type": "Offer",
            "price": "0"
          },
          "featureList": ["Image format conversion", "Social media image resizing", "Image cropping", "Browser-based processing", "No registration required"]
        }
        `}</script>
      </Helmet>

      {/* Header Navigation */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-center">
          <div className="flex items-center space-x-3">
            <img src="/green-file-icon.png" alt="ConvertImageFast Logo" className="h-10 w-10" />
            <h1 className="text-xl font-bold text-app-primary">ConvertImageFast</h1>
          </div>
        </div>
      </header>

      {/* Breadcrumb Navigation */}
      <BreadcrumbNav />

      {/* Hero Section with SEO optimized content and platform-specific resizing mentioned */}
      <section className="pt-12 pb-8 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-app-text mb-3">
            ConvertImageFast: Resize for Social Media & Convert Formats
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Instantly resize images for Instagram, TikTok, YouTube and more platforms. Crop and convert between
            PNG, JPG, WebP, JFIF, and other formats with our free online tool.
            No signup required, and your images never leave your browser.
          </p>

          {/* SEO-friendly format options */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="px-3 py-1 bg-app-primary/10 text-app-primary rounded-full text-sm">Instagram Post Size</span>
            <span className="px-3 py-1 bg-app-primary/10 text-app-primary rounded-full text-sm">TikTok Video Format</span>
            <span className="px-3 py-1 bg-app-primary/10 text-app-primary rounded-full text-sm">YouTube Thumbnail</span>
            <span className="px-3 py-1 bg-app-primary/10 text-app-primary rounded-full text-sm">Twitter Image Size</span>
            <span className="px-3 py-1 bg-app-primary/10 text-app-primary rounded-full text-sm">Facebook Post Format</span>
            <span className="px-3 py-1 bg-app-primary/10 text-app-primary rounded-full text-sm">PNG to JPG Converter</span>
            <span className="px-3 py-1 bg-app-primary/10 text-app-primary rounded-full text-sm">JFIF Format Support</span>
          </div>
        </div>
      </section>

      {/* Main Content / Tool Section */}
      <main className="pb-12" id="tools">
        <ImageConverter />
      </main>

      {/* About Section with enhanced design and social media resize information */}
      <section id="about" className="py-12 bg-muted/20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="relative flex items-center justify-center mb-8">
            <div className="h-0.5 bg-gradient-to-r from-transparent via-app-primary/50 to-transparent w-full"></div>
            <h2 className="text-2xl md:text-3xl font-bold text-center text-app-text bg-muted/20 px-6 absolute">
              About ConvertImageFast
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-app-primary">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-app-primary mr-2"></span>
                Social Media Optimization
              </h3>
              <p className="mb-4">
                Our tool makes it easy to resize your images for the perfect fit on Instagram, TikTok, YouTube,
                Twitter, Facebook and other platforms. No need to remember dimensions—simply select your
                target platform and convert.
              </p>
              <p>
                With support for PNG, JPG, WebP, JFIF, and other formats, your images will be ready for any social media platform.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-app-accent">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-app-accent mr-2"></span>
                Privacy & Security
              </h3>
              <p className="mb-4">
                Our image converter processes your files directly in your browser. Your images are never uploaded to any server,
                ensuring complete privacy and security for your content.
              </p>
              <p>
                After 30 minutes, all processed images are automatically removed from your browser's memory for added privacy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section with improved design and platform-specific information */}
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
              <h3 className="text-lg font-semibold mb-3 text-app-primary">What social media platforms are supported?</h3>
              <p className="pl-5 border-l-2 border-app-primary/30">
                We support optimized image sizes for Instagram (posts and stories), TikTok, YouTube thumbnails,
                Twitter/X posts, Facebook posts, and more. Simply select your target platform and our tool will
                automatically apply the optimal dimensions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-muted">
              <h3 className="text-lg font-semibold mb-3 text-app-primary">Does JFIF format work with this converter?</h3>
              <p className="pl-5 border-l-2 border-app-primary/30">
                Yes, our converter fully supports JFIF (JPEG File Interchange Format) files. You can convert JFIF
                files to PNG, WebP, or other formats, and vice versa. JFIF files are handled just like regular JPEG files.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-muted">
              <h3 className="text-lg font-semibold mb-3 text-app-primary">Will resizing my image affect its quality?</h3>
              <p className="pl-5 border-l-2 border-app-primary/30">
                Resizing an image can potentially affect its quality. For best results, we recommend starting with a high-resolution
                image and scaling down rather than scaling up. You can also adjust the quality slider for JPG and WebP formats
                to balance file size and image quality.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-muted">
              <h3 className="text-lg font-semibold mb-3 text-app-primary">Why should I crop before resizing for social media?</h3>
              <p className="pl-5 border-l-2 border-app-primary/30">
                Cropping before resizing lets you control exactly which part of your image appears in the final result. This is
                especially important for platforms with fixed aspect ratios like Instagram, where you want to ensure the subject
                of your image remains properly framed after resizing.
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
            Feel free to reach out if you have any questions about our image conversion and resizing tools.
          </p>
          <a href="mailto:contact@convertimagefast.com" className="text-app-primary hover:underline">
            contact@convertimagefast.com
          </a>
        </div>
      </section>

      {/* Footer with SEO optimized links */}
      <footer className="border-t py-6 text-muted-foreground text-sm">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-center md:justify-between items-center">
            <p>© 2025 ConvertImageFast - Your images remain private and are processed entirely in your browser.</p>
            <div className="flex space-x-4 mt-3 md:mt-0">
              <a href="/privacy" className="hover:text-app-primary transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-app-primary transition-colors">Terms</a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-app-primary transition-colors">GitHub</a>
            </div>
          </div>
          <div className="mt-4 text-xs text-center text-muted-foreground/70">
            <p>Resize images for social media, crop and convert between PNG, JPG, WebP, JFIF, and more formats - all for free, with no sign-up required.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
