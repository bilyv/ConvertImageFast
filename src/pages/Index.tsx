
import React from 'react';
import { Helmet } from 'react-helmet-async';
import ImageConverter from '../components/ImageConverter';
import BreadcrumbNav from '../components/BreadcrumbNav';
import Header from '../components/Header';
import { getCurrentDateISO, getCurrentDateTimeISO } from '../utils/dateUtils';

const Index = () => {
  return (
    <div className="min-h-screen bg-app-background">
      {/* Enhanced SEO Metadata with platform-specific resizing and cropping functionality mentioned */}
      <Helmet>
        <title>ConvertImageFast | Best Free Online Image Converter, Compressor & Puzzle Maker | PNG, JPG, WebP, BMP, GIF, HEIC</title>
        <meta name="google-site-verification" content="26RA6xhWCIbfb50QJ1gv8ou-B_56ppgoTswXY_hk" />
        <meta name="description" content="Instantly convert, compress, and create puzzles from images in PNG, JPG, WebP, BMP, GIF, and HEIC formats. Optimize for Instagram, TikTok, YouTube and other social media platforms. Reduce file size without losing quality. All with our free online tool." />
        <meta name="keywords" content="convert image online, png to jpg converter, jpg to png converter, webp converter, bmp converter, gif converter, heic converter, jfif converter, svg converter, pdf to image, tiff converter, ico converter, image format converter, resize image for instagram, tiktok image size, youtube thumbnail maker, free image converter, online image resizer, crop image online, convert image without upload, image compressor, reduce file size, create image puzzle, compress jpg without losing quality, optimize images for web, convert heic to jpg, convert webp to jpg, convert png to webp, convert jpg to webp, convert svg to png, convert pdf to jpg, convert tiff to jpg, convert ico to png" />
        <link rel="canonical" href="https://convertimagefast.com" />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="ConvertImageFast | Best Free Online Image Converter, Compressor & Puzzle Maker | PNG, JPG, WebP, BMP, GIF, HEIC" />
        <meta property="og:description" content="Instantly convert, compress, and create puzzles from images in PNG, JPG, WebP, BMP, GIF, and HEIC formats. Optimize for Instagram, TikTok, YouTube and other social media platforms. Reduce file size without losing quality. All with our free online tool." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://convertimagefast.com" />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:image:alt" content="ConvertImageFast - Online Image Converter, Compressor & Puzzle Maker for PNG, JPG, WebP, BMP, GIF, HEIC" />
        <meta property="og:site_name" content="ConvertImageFast" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:updated_time" content={getCurrentDateTimeISO()} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ConvertImageFast | Best Free Online Image Converter, Compressor & Puzzle Maker | PNG, JPG, WebP, BMP, GIF, HEIC" />
        <meta name="twitter:description" content="Instantly convert, compress, and create puzzles from images in PNG, JPG, WebP, BMP, GIF, and HEIC formats. Optimize for Instagram, TikTok, YouTube and other social media platforms. Reduce file size without losing quality. All with our free online tool." />
        <meta name="twitter:image" content="/twitter-image.jpg" />
        <meta name="twitter:image:alt" content="ConvertImageFast - Online Image Converter, Compressor & Puzzle Maker for PNG, JPG, WebP, BMP, GIF, HEIC" />

        {/* Additional SEO metadata */}
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="author" content="ConvertImageFast.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* Schema.org structured data - WebApplication */}
        <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "ConvertImageFast",
          "url": "https://convertimagefast.com",
          "description": "Instantly convert, compress, and create puzzles from images in PNG, JPG, WebP, BMP, GIF, and HEIC formats. Optimize for Instagram, TikTok, YouTube and other social media platforms. Reduce file size without losing quality. All with our free online tool.",
          "applicationCategory": "MultimediaApplication",
          "operatingSystem": "All",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "featureList": [
            "PNG to JPG conversion",
            "JPG to PNG conversion",
            "WebP to JPG conversion",
            "WebP to PNG conversion",
            "BMP to JPG conversion",
            "BMP to PNG conversion",
            "GIF to JPG conversion",
            "GIF to PNG conversion",
            "HEIC to JPG conversion",
            "HEIC to PNG conversion",
            "JFIF to JPG conversion",
            "SVG to PNG conversion",
            "PDF to JPG conversion",
            "TIFF to JPG conversion",
            "ICO to PNG conversion",
            "Social media image resizing for Instagram",
            "Social media image resizing for TikTok",
            "Social media image resizing for YouTube",
            "Social media image resizing for Twitter/X",
            "Social media image resizing for Facebook",
            "Social media image resizing for LinkedIn",
            "Social media image resizing for Pinterest",
            "Image compression with quality control",
            "Create interactive image puzzles",
            "Shareable puzzles with custom difficulty",
            "Image cropping",
            "Batch image processing",
            "Browser-based processing",
            "No registration required",
            "Privacy-focused image conversion"
          ],
          "screenshot": "/og-image.jpg",
          "softwareVersion": "1.1",
          "dateModified": "${getCurrentDateISO()}",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "156",
            "bestRating": "5",
            "worstRating": "1"
          }
        }
        `}</script>

        {/* Schema.org structured data - Organization */}
        <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "ConvertImageFast",
          "url": "https://convertimagefast.com",
          "logo": "/green-file-icon.png",
          "description": "ConvertImageFast is a free online tool for converting, compressing, and creating puzzles from images in PNG, JPG, WebP, BMP, GIF, HEIC, JFIF, SVG, PDF, TIFF, and ICO formats.",
          "dateModified": "${getCurrentDateISO()}",
          "sameAs": [
            "https://github.com/bilyv/ConvertImageFast"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "email": "ntwaribrian92@gmail.com",
            "contactType": "customer service",
            "availableLanguage": ["English"]
          },
          "keywords": "image converter, image compressor, puzzle maker, PNG to JPG, JPG to PNG, WebP converter, HEIC converter, social media image resizer"
        }
        `}</script>
      </Helmet>

      {/* Header Navigation */}
      <Header />

      {/* Breadcrumb Navigation */}
      <BreadcrumbNav />

      {/* Hero Section with SEO optimized content and platform-specific resizing mentioned */}
      <section className="pt-12 pb-8 px-4" aria-labelledby="main-heading">
        <div className="max-w-5xl mx-auto text-center">
          <h1 id="main-heading" className="text-3xl md:text-4xl font-bold text-app-text mb-3">
            ConvertImageFast: #1 Free Online Image Converter, Compressor & Puzzle Maker
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            Instantly convert, compress, and create puzzles from images in <strong>PNG</strong>, <strong>JPG</strong>, <strong>WebP</strong>, <strong>BMP</strong>, <strong>GIF</strong>, <strong>HEIC</strong>, <strong>JFIF</strong>, <strong>SVG</strong>, <strong>PDF</strong>, <strong>TIFF</strong>, and <strong>ICO</strong> formats.
            Optimize for Instagram, TikTok, YouTube and other social media platforms. Reduce file size without losing quality. All with our free online tool.
          </p>
          <p className="text-md text-muted-foreground max-w-2xl mx-auto mb-6">
            <span className="font-semibold text-app-primary">100% Free</span> • <span className="font-semibold text-app-primary">No Registration</span> • <span className="font-semibold text-app-primary">Privacy-Focused</span> • <span className="font-semibold text-app-primary">Browser-Based</span>
          </p>

          {/* SEO-friendly format options with links */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <a href="#convert-png-jpg" className="px-3 py-1 bg-app-primary/10 text-app-primary rounded-full text-sm hover:bg-app-primary/20 transition-colors">PNG to JPG Converter</a>
            <a href="#convert-jpg-png" className="px-3 py-1 bg-app-primary/10 text-app-primary rounded-full text-sm hover:bg-app-primary/20 transition-colors">JPG to PNG Converter</a>
            <a href="#convert-webp" className="px-3 py-1 bg-app-primary/10 text-app-primary rounded-full text-sm hover:bg-app-primary/20 transition-colors">WebP Converter</a>
            <a href="#convert-bmp-gif" className="px-3 py-1 bg-app-primary/10 text-app-primary rounded-full text-sm hover:bg-app-primary/20 transition-colors">BMP & GIF Support</a>
            <a href="#convert-heic" className="px-3 py-1 bg-app-primary/10 text-app-primary rounded-full text-sm hover:bg-app-primary/20 transition-colors">HEIC Converter</a>
            <a href="#convert-jfif" className="px-3 py-1 bg-app-primary/10 text-app-primary rounded-full text-sm hover:bg-app-primary/20 transition-colors">JFIF Converter</a>
            <a href="#convert-svg" className="px-3 py-1 bg-app-primary/10 text-app-primary rounded-full text-sm hover:bg-app-primary/20 transition-colors">SVG Converter</a>
            <a href="#convert-pdf" className="px-3 py-1 bg-app-primary/10 text-app-primary rounded-full text-sm hover:bg-app-primary/20 transition-colors">PDF to Image</a>
            <a href="#convert-tiff" className="px-3 py-1 bg-app-primary/10 text-app-primary rounded-full text-sm hover:bg-app-primary/20 transition-colors">TIFF Converter</a>
            <a href="#convert-ico" className="px-3 py-1 bg-app-primary/10 text-app-primary rounded-full text-sm hover:bg-app-primary/20 transition-colors">ICO Converter</a>
            <a href="/compress" className="px-3 py-1 bg-app-primary/10 text-app-primary rounded-full text-sm hover:bg-app-primary/20 transition-colors">Image Compressor</a>
            <a href="/puzzle" className="px-3 py-1 bg-app-primary/10 text-app-primary rounded-full text-sm hover:bg-app-primary/20 transition-colors">Create Puzzle</a>
          </div>

          {/* Social media platform options with links */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <a href="#instagram-size" className="px-3 py-1 bg-app-accent/10 text-app-accent rounded-full text-sm hover:bg-app-accent/20 transition-colors">Instagram Post Size</a>
            <a href="#tiktok-format" className="px-3 py-1 bg-app-accent/10 text-app-accent rounded-full text-sm hover:bg-app-accent/20 transition-colors">TikTok Video Format</a>
            <a href="#youtube-thumbnail" className="px-3 py-1 bg-app-accent/10 text-app-accent rounded-full text-sm hover:bg-app-accent/20 transition-colors">YouTube Thumbnail</a>
            <a href="#twitter-size" className="px-3 py-1 bg-app-accent/10 text-app-accent rounded-full text-sm hover:bg-app-accent/20 transition-colors">Twitter Image Size</a>
            <a href="#facebook-format" className="px-3 py-1 bg-app-accent/10 text-app-accent rounded-full text-sm hover:bg-app-accent/20 transition-colors">Facebook Post Format</a>
          </div>

          {/* Quick benefits section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-app-primary mb-2">Fast Conversion</h3>
              <p className="text-sm">Convert images in seconds with our optimized algorithms</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-app-primary mb-2">Image Compression</h3>
              <p className="text-sm">Reduce file size while maintaining image quality</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-app-primary mb-2">Create Puzzles</h3>
              <p className="text-sm">Turn any image into an interactive, shareable puzzle</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-app-primary mb-2">Privacy Protected</h3>
              <p className="text-sm">Your images never leave your browser - 100% secure</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content / Tool Section */}
      <main className="pb-12" id="tools">
        <div className="max-w-5xl mx-auto px-4 mb-8">
          <h2 id="converter-heading" className="text-2xl md:text-3xl font-bold text-center text-app-text mb-6 pt-4">
            Free Online Image Converter, Compressor & Puzzle Maker
          </h2>
          <p className="text-center max-w-3xl mx-auto mb-4">
            Select your image, choose your desired format, and customize settings as needed.
            Convert, compress, or create puzzles - all with our free online tools.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <a href="#convert-png-jpg" className="px-4 py-2 bg-app-primary/10 text-app-primary rounded-md text-sm hover:bg-app-primary/20 transition-colors">Convert PNG to JPG</a>
            <a href="#convert-jpg-png" className="px-4 py-2 bg-app-primary/10 text-app-primary rounded-md text-sm hover:bg-app-primary/20 transition-colors">Convert JPG to PNG</a>
            <a href="#convert-webp" className="px-4 py-2 bg-app-primary/10 text-app-primary rounded-md text-sm hover:bg-app-primary/20 transition-colors">Convert WebP</a>
            <a href="#convert-bmp-gif" className="px-4 py-2 bg-app-primary/10 text-app-primary rounded-md text-sm hover:bg-app-primary/20 transition-colors">Convert BMP & GIF</a>
            <a href="#convert-heic" className="px-4 py-2 bg-app-primary/10 text-app-primary rounded-md text-sm hover:bg-app-primary/20 transition-colors">Convert HEIC</a>
            <a href="#convert-jfif" className="px-4 py-2 bg-app-primary/10 text-app-primary rounded-md text-sm hover:bg-app-primary/20 transition-colors">Convert JFIF</a>
            <a href="#convert-svg" className="px-4 py-2 bg-app-primary/10 text-app-primary rounded-md text-sm hover:bg-app-primary/20 transition-colors">Convert SVG</a>
            <a href="#convert-pdf" className="px-4 py-2 bg-app-primary/10 text-app-primary rounded-md text-sm hover:bg-app-primary/20 transition-colors">Convert PDF to Image</a>
            <a href="#convert-tiff" className="px-4 py-2 bg-app-primary/10 text-app-primary rounded-md text-sm hover:bg-app-primary/20 transition-colors">Convert TIFF</a>
            <a href="#convert-ico" className="px-4 py-2 bg-app-primary/10 text-app-primary rounded-md text-sm hover:bg-app-primary/20 transition-colors">Convert ICO</a>
            <a href="/compress" className="px-4 py-2 bg-app-primary/10 text-app-primary rounded-md text-sm hover:bg-app-primary/20 transition-colors">Compress Images</a>
            <a href="/puzzle" className="px-4 py-2 bg-app-primary/10 text-app-primary rounded-md text-sm hover:bg-app-primary/20 transition-colors">Create Puzzle</a>
            <a href="#instagram-size" className="px-4 py-2 bg-app-primary/10 text-app-primary rounded-md text-sm hover:bg-app-primary/20 transition-colors">Resize for Social Media</a>
          </div>
        </div>
        <ImageConverter />

        {/* Features Section */}
        <div id="features" className="max-w-5xl mx-auto px-4 mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-app-text mb-8 pt-4">
            Key Features of Our Image Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-3 text-app-primary">Multiple Format Support</h3>
              <p>Convert between <a href="#convert-png-jpg" className="text-app-primary hover:underline">PNG</a>, <a href="#convert-jpg-png" className="text-app-primary hover:underline">JPG</a>, <a href="#convert-webp" className="text-app-primary hover:underline">WebP</a>, <a href="#convert-bmp-gif" className="text-app-primary hover:underline">BMP</a>, <a href="#convert-bmp-gif" className="text-app-primary hover:underline">GIF</a>, <a href="#convert-heic" className="text-app-primary hover:underline">HEIC</a>, <a href="#convert-jfif" className="text-app-primary hover:underline">JFIF</a>, <a href="#convert-svg" className="text-app-primary hover:underline">SVG</a>, <a href="#convert-pdf" className="text-app-primary hover:underline">PDF</a>, <a href="#convert-tiff" className="text-app-primary hover:underline">TIFF</a>, and <a href="#convert-ico" className="text-app-primary hover:underline">ICO</a> formats with perfect quality preservation.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-3 text-app-primary">Image Compression</h3>
              <p>Reduce file size while maintaining quality with our <a href="/compress" className="text-app-primary hover:underline">image compressor</a>. Perfect for web, email, and social media sharing.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-3 text-app-primary">Interactive Puzzles</h3>
              <p>Transform any image into a fun, <a href="/puzzle" className="text-app-primary hover:underline">interactive puzzle</a> that you can share with friends and family. Customize difficulty and grid size.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-3 text-app-primary">Social Media Optimization</h3>
              <p>Resize images for <a href="#instagram-size" className="text-app-primary hover:underline">Instagram</a>, <a href="#tiktok-format" className="text-app-primary hover:underline">TikTok</a>, <a href="#youtube-thumbnail" className="text-app-primary hover:underline">YouTube</a>, <a href="#twitter-size" className="text-app-primary hover:underline">Twitter</a>, <a href="#facebook-format" className="text-app-primary hover:underline">Facebook</a>, and other platforms with optimal dimensions.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-3 text-app-primary">Batch Processing</h3>
              <p>Convert and process multiple images at once, saving you time and effort. Perfect for handling large collections of photos.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-3 text-app-primary">Privacy First</h3>
              <p>Your images never leave your browser. Learn more about our <a href="#about" className="text-app-primary hover:underline">privacy-focused approach</a> to image processing.</p>
            </div>
          </div>
        </div>
      </main>

      {/* About Section with enhanced design and social media resize information */}
      <section id="about" className="py-12 bg-muted/20" aria-labelledby="about-heading">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 id="about-heading" className="text-2xl md:text-3xl font-bold text-app-text mb-4 inline-block relative">
              About ConvertImageFast
              <div className="h-1 bg-app-primary/50 w-full absolute bottom-0 left-0 rounded-full"></div>
            </h2>
          </div>

          <div className="mb-8">
            <p className="text-center max-w-3xl mx-auto mb-8">
              <strong>ConvertImageFast</strong> is the leading online image toolkit that prioritizes speed, privacy, and ease of use.
              Our platform allows you to convert between multiple image formats, compress images without quality loss, create interactive puzzles, and optimize for various social media platforms without any technical knowledge.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div id="convert-png-jpg" className="bg-white p-6 rounded-lg shadow-md border-l-4 border-app-primary">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-app-primary mr-2"></span>
                Image Format Conversion
              </h3>
              <p className="mb-4">
                Instantly convert, compress, and create puzzles from images in PNG, JPG, WebP, BMP, GIF, HEIC, JFIF, SVG, PDF, TIFF, and ICO formats.
                Optimize for Instagram, TikTok, YouTube and other social media platforms. Reduce file size without losing quality.
                Our tool preserves image quality while optimizing file size for faster loading times.
              </p>
              <ul className="list-disc pl-5 mb-4 space-y-1">
                <li id="convert-png-jpg"><strong>PNG to JPG</strong>: Reduce file size while maintaining quality</li>
                <li id="convert-jpg-png"><strong>JPG to PNG</strong>: Add transparency and improve quality</li>
                <li id="convert-webp"><strong>WebP Conversion</strong>: Convert to and from this modern format</li>
                <li id="convert-heic"><strong>HEIC Support</strong>: Convert Apple's HEIC format to standard formats</li>
                <li id="convert-jfif"><strong>JFIF Conversion</strong>: Convert JPEG File Interchange Format</li>
                <li id="convert-svg"><strong>SVG Support</strong>: Convert vector graphics to raster formats</li>
                <li id="convert-pdf"><strong>PDF to Image</strong>: Extract images from PDF documents</li>
                <li id="convert-tiff"><strong>TIFF Conversion</strong>: Convert high-quality TIFF images</li>
                <li id="convert-ico"><strong>ICO Support</strong>: Convert icon files to standard formats</li>
              </ul>
            </div>

            <div id="image-compression" className="bg-white p-6 rounded-lg shadow-md border-l-4 border-app-primary">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-app-primary mr-2"></span>
                Image Compression
              </h3>
              <p className="mb-4">
                Our <a href="/compress" className="text-app-primary hover:underline">image compressor</a> reduces file size while maintaining visual quality. Perfect for websites, email attachments, and social media uploads.
              </p>
              <ul className="list-disc pl-5 mb-4 space-y-1">
                <li><strong>Quality Control</strong>: Adjust compression level to balance size and quality</li>
                <li><strong>Format Selection</strong>: Choose the best format for your needs (JPG, PNG, WebP)</li>
                <li><strong>Size Comparison</strong>: See before/after file sizes to gauge compression efficiency</li>
                <li><strong>Batch Processing</strong>: Compress multiple images at once to save time</li>
                <li><strong>Preview</strong>: See the compressed result before downloading</li>
              </ul>
            </div>

            <div id="puzzle-creation" className="bg-white p-6 rounded-lg shadow-md border-l-4 border-app-primary">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-app-primary mr-2"></span>
                Interactive Puzzle Maker
              </h3>
              <p className="mb-4">
                Transform any image into a fun, interactive puzzle with our <a href="/puzzle" className="text-app-primary hover:underline">puzzle maker</a>. Create and share puzzles with friends and family.
              </p>
              <ul className="list-disc pl-5 mb-4 space-y-1">
                <li><strong>Customizable Difficulty</strong>: Choose from easy, medium, or hard settings</li>
                <li><strong>Adjustable Grid Size</strong>: Select from 2x2, 3x3, 4x4, or 5x5 grids</li>
                <li><strong>Multiple Interaction Modes</strong>: Drag-and-drop or click-to-swap pieces</li>
                <li><strong>Shareable Puzzles</strong>: Generate links to share your puzzles with others</li>
                <li><strong>Download Option</strong>: Save your completed puzzles as images</li>
              </ul>
            </div>

            <div id="instagram-size" className="bg-white p-6 rounded-lg shadow-md border-l-4 border-app-primary">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-app-primary mr-2"></span>
                Social Media Optimization
              </h3>
              <p className="mb-4">
                Resize your images for the perfect fit on all major social media platforms. No need to remember dimensions—simply select your
                target platform and our tool will handle the rest.
              </p>
              <ul className="list-disc pl-5 mb-4 space-y-1">
                <li id="instagram-size"><strong>Instagram</strong>: Posts, Stories, and Profile Pictures</li>
                <li id="tiktok-format"><strong>TikTok</strong>: Video thumbnails and profile images</li>
                <li id="youtube-thumbnail"><strong>YouTube</strong>: Thumbnails and channel art</li>
                <li id="twitter-size"><strong>Twitter/X</strong>: Post images and profile pictures</li>
                <li id="facebook-format"><strong>Facebook</strong>: Posts, covers, and profile pictures</li>
                <li id="linkedin-format"><strong>LinkedIn</strong>: Posts, profile pictures, company pages</li>
                <li id="pinterest-format"><strong>Pinterest</strong>: Pins (2:3 ratio), profile images</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-app-accent">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-app-accent mr-2"></span>
                Privacy & Security
              </h3>
              <p className="mb-4">
                All our tools process your files <strong>directly in your browser</strong>. Your images are never uploaded to any server,
                ensuring complete privacy and security for your content.
              </p>
              <p className="mb-4">
                After 30 minutes, all processed images are automatically removed from your browser's memory for added privacy.
              </p>
              <p>
                <strong>Zero tracking</strong>, <strong>zero data collection</strong>, and <strong>zero compromises</strong> on your privacy.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-app-accent">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-app-accent mr-2"></span>
                Advanced Features
              </h3>
              <p className="mb-4">
                ConvertImageFast offers more than just basic tools:
              </p>
              <ul className="list-disc pl-5 mb-4 space-y-1">
                <li><strong>Batch Processing</strong>: Convert multiple images at once</li>
                <li><strong>Custom Dimensions</strong>: Resize to exact pixel specifications</li>
                <li><strong>Quality Control</strong>: Adjust compression levels for optimal results</li>
                <li><strong>Cropping Tools</strong>: Focus on the important parts of your image</li>
                <li><strong>Instant Preview</strong>: See results before downloading</li>
                <li><strong>Format Preservation</strong>: Remember your preferred formats</li>
                <li><strong>Cross-Platform Support</strong>: Works on all modern browsers and devices</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section with improved design and platform-specific information */}
      <section id="faq" className="py-12" aria-labelledby="faq-heading">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 id="faq-heading" className="text-2xl md:text-3xl font-bold text-app-text mb-4 inline-block relative">
              Frequently Asked Questions
              <div className="h-1 bg-app-accent/50 w-full absolute bottom-0 left-0 rounded-full"></div>
            </h2>
            <p className="max-w-3xl mx-auto">
              Find answers to common questions about our image conversion and resizing tools. Can't find what you're looking for? <a href="#contact" className="text-app-primary hover:underline">Contact us</a>.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-muted">
              <h3 className="text-lg font-semibold mb-3 text-app-primary">What image formats does ConvertImageFast support?</h3>
              <div className="pl-5 border-l-2 border-app-primary/30">
                <p>
                  ConvertImageFast supports all major image formats including:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li><strong>PNG</strong> - Great for images with transparency and lossless compression</li>
                  <li><strong>JPG/JPEG</strong> - Ideal for photographs and complex images with small file sizes</li>
                  <li><strong>WebP</strong> - Modern format with excellent compression and transparency support</li>
                  <li><strong>JFIF</strong> - JPEG File Interchange Format, compatible with most image viewers</li>
                  <li><strong>GIF</strong> - For simple animations and graphics with limited colors</li>
                  <li><strong>BMP</strong> - Uncompressed bitmap format for high-quality images</li>
                  <li><strong>TIFF</strong> - High-quality format for professional use and printing</li>
                  <li><strong>HEIC/HEIF</strong> - Apple's High Efficiency Image Format with superior compression</li>
                  <li><strong>SVG</strong> - Scalable Vector Graphics format for logos and illustrations</li>
                  <li><strong>PDF</strong> - Extract and convert images from PDF documents</li>
                  <li><strong>ICO</strong> - Icon file format for website favicons and application icons</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-muted">
              <h3 className="text-lg font-semibold mb-3 text-app-primary">What tools does ConvertImageFast offer?</h3>
              <div className="pl-5 border-l-2 border-app-primary/30">
                <p>
                  ConvertImageFast offers a comprehensive suite of image tools:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li><strong>Image Converter</strong>: Convert between multiple image formats</li>
                  <li><strong>Image Compressor</strong>: Reduce file size while maintaining quality</li>
                  <li><strong>Puzzle Maker</strong>: Create interactive puzzles from your images</li>
                  <li><strong>Social Media Resizer</strong>: Optimize images for various platforms</li>
                  <li><strong>Cropping Tool</strong>: Focus on the important parts of your image</li>
                  <li><strong>Batch Processing</strong>: Handle multiple images simultaneously</li>
                </ul>
                <p className="mt-2">
                  All tools are free to use, with no registration required, and process your images directly in your browser for maximum privacy.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-muted">
              <h3 className="text-lg font-semibold mb-3 text-app-primary">How does the image compression tool work?</h3>
              <div className="pl-5 border-l-2 border-app-primary/30">
                <p>
                  Our image compression tool uses advanced algorithms to reduce file size while maintaining visual quality:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Upload your image in any supported format</li>
                  <li>Choose your desired output format (JPG, PNG, or WebP)</li>
                  <li>Adjust the quality level to balance size and visual quality</li>
                  <li>Set maximum dimensions if needed</li>
                  <li>Click "Compress" to process your image</li>
                  <li>Compare before/after sizes and download the compressed result</li>
                </ul>
                <p className="mt-2">
                  The compression is performed entirely in your browser using the Canvas API, ensuring your images never leave your device.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-muted">
              <h3 className="text-lg font-semibold mb-3 text-app-primary">How do I create and share image puzzles?</h3>
              <div className="pl-5 border-l-2 border-app-primary/30">
                <p>
                  Creating and sharing puzzles with ConvertImageFast is easy:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Upload any image in our supported formats</li>
                  <li>Choose your puzzle difficulty (easy, medium, hard)</li>
                  <li>Select grid size (2x2, 3x3, 4x4, or 5x5)</li>
                  <li>Pick your preferred interaction mode (drag-and-drop or click-to-swap)</li>
                  <li>Click "Create Puzzle" to generate your puzzle</li>
                  <li>Solve the puzzle or share it immediately</li>
                  <li>Use the "Share" button to generate a link that others can use to play your puzzle</li>
                </ul>
                <p className="mt-2">
                  Puzzles can be shared via direct link, social media, or email. No account required!
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-muted">
              <h3 className="text-lg font-semibold mb-3 text-app-primary">What social media platforms are supported for image resizing?</h3>
              <div className="pl-5 border-l-2 border-app-primary/30">
                <p>
                  We support optimized image sizes for all major social media platforms:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li><strong>Instagram</strong>: Posts (1:1, 4:5, 16:9), Stories (9:16), Profile Pictures</li>
                  <li><strong>TikTok</strong>: Video covers (9:16), Profile images</li>
                  <li><strong>YouTube</strong>: Thumbnails (16:9), Channel art, Profile pictures</li>
                  <li><strong>Twitter/X</strong>: Post images, Profile pictures, Header images</li>
                  <li><strong>Facebook</strong>: Posts, Cover photos, Profile pictures</li>
                  <li><strong>LinkedIn</strong>: Posts, Profile pictures, Company pages</li>
                  <li><strong>Pinterest</strong>: Pins (2:3 ratio), Profile images</li>
                </ul>
                <p className="mt-2">
                  Simply select your target platform and our tool will automatically apply the optimal dimensions.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-muted">
              <h3 className="text-lg font-semibold mb-3 text-app-primary">Is ConvertImageFast really free to use?</h3>
              <div className="pl-5 border-l-2 border-app-primary/30">
                <p>
                  Yes, ConvertImageFast is completely free to use with no hidden fees or premium features. We don't require registration,
                  account creation, or any personal information. Our service is supported by minimal, non-intrusive advertisements.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-muted">
              <h3 className="text-lg font-semibold mb-3 text-app-primary">Is my data safe when using ConvertImageFast?</h3>
              <div className="pl-5 border-l-2 border-app-primary/30">
                <p>
                  Absolutely. ConvertImageFast processes all images directly in your browser. Your images are never uploaded to our servers,
                  ensuring complete privacy and security. After 30 minutes, all processed images are automatically removed from your browser's
                  memory for added privacy.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-muted">
              <h3 className="text-lg font-semibold mb-3 text-app-primary">Will resizing my image affect its quality?</h3>
              <div className="pl-5 border-l-2 border-app-primary/30">
                <p>
                  Resizing an image can potentially affect its quality. For best results, we recommend:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Starting with a high-resolution image and scaling down rather than scaling up</li>
                  <li>Using the quality slider for JPG and WebP formats to balance file size and image quality</li>
                  <li>Choosing the appropriate format for your needs (PNG for graphics, JPG for photos)</li>
                  <li>Using our "Maintain aspect ratio" option to prevent distortion</li>
                </ul>
                <p className="mt-2">
                  Our algorithms are optimized to preserve as much quality as possible during conversion and resizing.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Schema for Rich Results */}
        <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What image formats does ConvertImageFast support?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "ConvertImageFast supports all major image formats including PNG (great for images with transparency and lossless compression), JPG/JPEG (ideal for photographs and complex images with small file sizes), WebP (modern format with excellent compression and transparency support), JFIF (JPEG File Interchange Format, compatible with most image viewers), GIF (for simple animations and graphics with limited colors), BMP (uncompressed bitmap format for high-quality images), TIFF (high-quality format for professional use and printing), HEIC/HEIF (Apple's High Efficiency Image Format with superior compression), SVG (Scalable Vector Graphics format for logos and illustrations), PDF (extract and convert images from PDF documents), and ICO (Icon file format for website favicons and application icons)."
              }
            },
            {
              "@type": "Question",
              "name": "What tools does ConvertImageFast offer?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "ConvertImageFast offers a comprehensive suite of image tools: Image Converter (convert between multiple image formats), Image Compressor (reduce file size while maintaining quality), Puzzle Maker (create interactive puzzles from your images), Social Media Resizer (optimize images for various platforms), Cropping Tool (focus on the important parts of your image), and Batch Processing (handle multiple images simultaneously). All tools are free to use, with no registration required, and process your images directly in your browser for maximum privacy."
              }
            },
            {
              "@type": "Question",
              "name": "How does the image compression tool work?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our image compression tool uses advanced algorithms to reduce file size while maintaining visual quality. Upload your image in any supported format, choose your desired output format (JPG, PNG, or WebP), adjust the quality level to balance size and visual quality, set maximum dimensions if needed, click 'Compress' to process your image, and compare before/after sizes before downloading the compressed result. The compression is performed entirely in your browser using the Canvas API, ensuring your images never leave your device."
              }
            },
            {
              "@type": "Question",
              "name": "How do I create and share image puzzles?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Creating and sharing puzzles with ConvertImageFast is easy: Upload any image in our supported formats, choose your puzzle difficulty (easy, medium, hard), select grid size (2x2, 3x3, 4x4, or 5x5), pick your preferred interaction mode (drag-and-drop or click-to-swap), click 'Create Puzzle' to generate your puzzle, solve the puzzle or share it immediately, and use the 'Share' button to generate a link that others can use to play your puzzle. Puzzles can be shared via direct link, social media, or email. No account required!"
              }
            },
            {
              "@type": "Question",
              "name": "What social media platforms are supported for image resizing?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We support optimized image sizes for all major social media platforms including Instagram (Posts in 1:1, 4:5, 16:9 ratios, Stories in 9:16, Profile Pictures), TikTok (Video covers in 9:16, Profile images), YouTube (Thumbnails in 16:9, Channel art, Profile pictures), Twitter/X (Post images, Profile pictures, Header images), Facebook (Posts, Cover photos, Profile pictures), LinkedIn (Posts, Profile pictures, Company pages), and Pinterest (Pins in 2:3 ratio, Profile images). Simply select your target platform and our tool will automatically apply the optimal dimensions."
              }
            },
            {
              "@type": "Question",
              "name": "Is ConvertImageFast really free to use?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, ConvertImageFast is completely free to use with no hidden fees or premium features. We don't require registration, account creation, or any personal information. Our service is supported by minimal, non-intrusive advertisements."
              }
            },
            {
              "@type": "Question",
              "name": "Is my data safe when using ConvertImageFast?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Absolutely. ConvertImageFast processes all images directly in your browser. Your images are never uploaded to our servers, ensuring complete privacy and security. After 30 minutes, all processed images are automatically removed from your browser's memory for added privacy."
              }
            },
            {
              "@type": "Question",
              "name": "Will resizing my image affect its quality?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Resizing an image can potentially affect its quality. For best results, we recommend starting with a high-resolution image and scaling down rather than scaling up, using the quality slider for JPG and WebP formats to balance file size and image quality, choosing the appropriate format for your needs (PNG for graphics, JPG for photos), and using our 'Maintain aspect ratio' option to prevent distortion. Our algorithms are optimized to preserve as much quality as possible during conversion and resizing."
              }
            }
          ]
        }
        `}</script>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 bg-muted/20" aria-labelledby="contact-heading">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 id="contact-heading" className="text-2xl md:text-3xl font-bold text-app-text mb-4 inline-block relative">
            Contact Us
            <div className="h-1 bg-app-primary/50 w-full absolute bottom-0 left-0 rounded-full"></div>
          </h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Have questions about our <a href="#tools" className="text-app-primary hover:underline">image converter</a>,
            <a href="#instagram-size" className="text-app-primary hover:underline">social media resizing</a>, or
            <a href="#convert-png-jpg" className="text-app-primary hover:underline">format conversion</a>?
            We're here to help! Reach out to our team for assistance.
          </p>
          <div className="flex flex-col items-center justify-center space-y-4">
            <a href="mailto:ntwaribrian92@gmail.com" className="text-app-primary hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              ntwaribrian92@gmail.com
            </a>
            <p className="text-sm text-muted-foreground">
              We typically respond within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Footer with SEO optimized links */}
      <footer className="border-t py-8 text-muted-foreground text-sm">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-base mb-3 text-app-primary">Image Converters</h3>
              <ul className="space-y-2">
                <li><a href="#convert-png-jpg" className="hover:text-app-primary transition-colors">PNG to JPG Converter</a></li>
                <li><a href="#convert-jpg-png" className="hover:text-app-primary transition-colors">JPG to PNG Converter</a></li>
                <li><a href="#convert-webp" className="hover:text-app-primary transition-colors">WebP Converter</a></li>
                <li><a href="#convert-bmp-gif" className="hover:text-app-primary transition-colors">BMP Converter</a></li>
                <li><a href="#convert-bmp-gif" className="hover:text-app-primary transition-colors">GIF Converter</a></li>
                <li><a href="#convert-heic" className="hover:text-app-primary transition-colors">HEIC Converter</a></li>
                <li><a href="#convert-jfif" className="hover:text-app-primary transition-colors">JFIF Converter</a></li>
                <li><a href="#convert-svg" className="hover:text-app-primary transition-colors">SVG Converter</a></li>
                <li><a href="#convert-pdf" className="hover:text-app-primary transition-colors">PDF to Image</a></li>
                <li><a href="#convert-tiff" className="hover:text-app-primary transition-colors">TIFF Converter</a></li>
                <li><a href="#convert-ico" className="hover:text-app-primary transition-colors">ICO Converter</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-base mb-3 text-app-primary">Image Tools</h3>
              <ul className="space-y-2">
                <li><a href="/compress" className="hover:text-app-primary transition-colors">Image Compressor</a></li>
                <li><a href="/puzzle" className="hover:text-app-primary transition-colors">Create Image Puzzle</a></li>
                <li><a href="#image-compression" className="hover:text-app-primary transition-colors">Reduce File Size</a></li>
                <li><a href="#puzzle-creation" className="hover:text-app-primary transition-colors">Interactive Puzzles</a></li>
                <li><a href="#tools" className="hover:text-app-primary transition-colors">Batch Processing</a></li>
                <li><a href="#tools" className="hover:text-app-primary transition-colors">Image Cropping</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-base mb-3 text-app-primary">Social Media Tools</h3>
              <ul className="space-y-2">
                <li><a href="#instagram-size" className="hover:text-app-primary transition-colors">Instagram Image Resizer</a></li>
                <li><a href="#tiktok-format" className="hover:text-app-primary transition-colors">TikTok Image Resizer</a></li>
                <li><a href="#youtube-thumbnail" className="hover:text-app-primary transition-colors">YouTube Thumbnail Maker</a></li>
                <li><a href="#twitter-size" className="hover:text-app-primary transition-colors">Twitter Image Resizer</a></li>
                <li><a href="#facebook-format" className="hover:text-app-primary transition-colors">Facebook Image Resizer</a></li>
                <li><a href="#linkedin-format" className="hover:text-app-primary transition-colors">LinkedIn Image Resizer</a></li>
                <li><a href="#pinterest-format" className="hover:text-app-primary transition-colors">Pinterest Pin Resizer</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-base mb-3 text-app-primary">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#about" className="hover:text-app-primary transition-colors">About ConvertImageFast</a></li>
                <li><a href="#faq-heading" className="hover:text-app-primary transition-colors">FAQ</a></li>
                <li><a href="#contact" className="hover:text-app-primary transition-colors">Contact Us</a></li>
                <li><a href="/privacy" className="hover:text-app-primary transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-app-primary transition-colors">Terms of Service</a></li>
                <li><a href="https://github.com/bilyv/ConvertImageFast" className="hover:text-app-primary transition-colors">GitHub Repository</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-6 flex flex-col md:flex-row justify-center md:justify-between items-center">
            <p>© 2025 ConvertImageFast - Your images remain private and are processed entirely in your browser.</p>
            <div className="flex space-x-4 mt-3 md:mt-0">
              <a href="/privacy" className="hover:text-app-primary transition-colors">Privacy</a>
              <a href="/terms" className="hover:text-app-primary transition-colors">Terms</a>
              <a href="https://github.com/bilyv/ConvertImageFast" target="_blank" rel="noopener noreferrer" className="hover:text-app-primary transition-colors">GitHub</a>
            </div>
          </div>

          <div className="mt-4 text-xs text-center text-muted-foreground/70">
            <p>
              <a href="#tools" className="hover:text-app-primary transition-colors">Convert</a>,
              <a href="/compress" className="hover:text-app-primary transition-colors"> compress</a>,
              <a href="/puzzle" className="hover:text-app-primary transition-colors"> create puzzles</a>, and
              <a href="#instagram-size" className="hover:text-app-primary transition-colors"> resize</a> images between
              <a href="#convert-png-jpg" className="hover:text-app-primary transition-colors"> PNG</a>,
              <a href="#convert-jpg-png" className="hover:text-app-primary transition-colors"> JPG</a>,
              <a href="#convert-webp" className="hover:text-app-primary transition-colors"> WebP</a>,
              <a href="#convert-bmp-gif" className="hover:text-app-primary transition-colors"> BMP</a>,
              <a href="#convert-bmp-gif" className="hover:text-app-primary transition-colors"> GIF</a>,
              <a href="#convert-heic" className="hover:text-app-primary transition-colors"> HEIC</a>,
              <a href="#convert-jfif" className="hover:text-app-primary transition-colors"> JFIF</a>,
              <a href="#convert-svg" className="hover:text-app-primary transition-colors"> SVG</a>,
              <a href="#convert-pdf" className="hover:text-app-primary transition-colors"> PDF</a>,
              <a href="#convert-tiff" className="hover:text-app-primary transition-colors"> TIFF</a>,
              <a href="#convert-ico" className="hover:text-app-primary transition-colors"> ICO</a> formats.
              Optimize for <a href="#instagram-size" className="hover:text-app-primary transition-colors">Instagram</a>,
              <a href="#tiktok-format" className="hover:text-app-primary transition-colors"> TikTok</a>,
              <a href="#youtube-thumbnail" className="hover:text-app-primary transition-colors"> YouTube</a>,
              <a href="#twitter-size" className="hover:text-app-primary transition-colors"> Twitter</a>,
              <a href="#facebook-format" className="hover:text-app-primary transition-colors"> Facebook</a>,
              <a href="#linkedin-format" className="hover:text-app-primary transition-colors"> LinkedIn</a>,
              <a href="#pinterest-format" className="hover:text-app-primary transition-colors"> Pinterest</a> and more -
              all for free, with no sign-up required.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
