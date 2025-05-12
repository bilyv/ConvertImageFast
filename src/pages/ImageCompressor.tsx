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
        <title>Best Free Online Image Compressor | Reduce File Size Without Losing Quality | ConvertImageFast</title>
        <meta name="description" content="Compress JPG, PNG, WebP images online without losing quality. Reduce file size by up to 90% for web, email, or social media. Free, secure, browser-based tool with no registration required. Adjust compression level for perfect balance between size and quality." />
        <meta name="keywords" content="image compressor, compress images, reduce file size, image optimization, free image compressor, compress jpg without losing quality, compress png, reduce image size for web, optimize images for website, compress webp, best image compression tool, reduce photo size, image size reducer, compress pictures online, shrink image file size" />
        <link rel="canonical" href="https://convertimagefast.com/compress" />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="Best Free Online Image Compressor | Reduce File Size Without Losing Quality" />
        <meta property="og:description" content="Compress JPG, PNG, WebP images online without losing quality. Reduce file size by up to 90% for web, email, or social media. Free, secure, browser-based tool." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://convertimagefast.com/compress" />
        <meta property="og:image" content="/og-image.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Free Online Image Compressor | Reduce File Size Without Losing Quality" />
        <meta name="twitter:description" content="Compress JPG, PNG, WebP images online without losing quality. Reduce file size by up to 90% for web, email, or social media." />
        <meta name="twitter:image" content="/twitter-image.jpg" />

        {/* Schema.org structured data */}
        <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "ConvertImageFast Image Compressor",
          "url": "https://convertimagefast.com/compress",
          "description": "Free online image compressor that reduces file size while maintaining quality. Compress JPG, PNG, and WebP images for web, email, or social media.",
          "applicationCategory": "MultimediaApplication",
          "operatingSystem": "All",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "featureList": [
            "Compress JPG images",
            "Compress PNG images",
            "Compress WebP images",
            "Adjust compression quality",
            "Set maximum dimensions",
            "Compare before/after sizes",
            "Browser-based processing",
            "No registration required",
            "Privacy-focused compression"
          ]
        }
        `}</script>
      </Helmet>

      <Header />

      <main className="container mx-auto px-4 py-8">
        <BreadcrumbNav />

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Free Online Image Compressor - Reduce File Size Without Losing Quality</h1>
          <p className="text-muted-foreground mb-4">
            Compress your JPG, PNG, and WebP images to reduce file size while maintaining visual quality. Perfect for websites, email attachments, or social media uploads.
          </p>
          <p className="text-muted-foreground mb-8">
            <span className="font-semibold text-app-primary">100% Free</span> • <span className="font-semibold text-app-primary">No Registration</span> • <span className="font-semibold text-app-primary">Privacy-Focused</span> • <span className="font-semibold text-app-primary">Browser-Based</span>
          </p>

          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <h2 className="text-xl font-semibold mb-3 text-app-primary">Why Compress Your Images?</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Faster Website Loading</strong>: Smaller images load faster, improving user experience and SEO rankings</li>
              <li><strong>Reduced Storage Usage</strong>: Save space on your devices and cloud storage</li>
              <li><strong>Lower Bandwidth Consumption</strong>: Ideal for email attachments and mobile data usage</li>
              <li><strong>Better Social Media Experience</strong>: Optimized images upload faster to platforms like Instagram and Facebook</li>
              <li><strong>Improved Page Performance</strong>: Lighter pages mean better Core Web Vitals scores</li>
            </ul>
          </div>

          <ImageCompressorComponent />

          <div className="mt-12 space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">How Our Image Compressor Works</h2>
              <p className="mb-4">
                Our image compression tool uses advanced algorithms to intelligently reduce file size while preserving visual quality:
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li><strong>Upload Your Image</strong>: Select any JPG, PNG, or WebP image from your device</li>
                <li><strong>Choose Output Format</strong>: Select the best format for your needs (JPG for photos, PNG for graphics with transparency, WebP for modern browsers)</li>
                <li><strong>Adjust Compression Level</strong>: Fine-tune the quality slider to balance file size and visual quality</li>
                <li><strong>Set Maximum Dimensions</strong>: Optionally resize your image to further reduce file size</li>
                <li><strong>Process and Compare</strong>: See the before/after comparison with file size reduction percentage</li>
                <li><strong>Download</strong>: Save your optimized image to your device</li>
              </ol>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Privacy and Security</h2>
              <p>
                Your images are processed entirely in your browser using the Canvas API. Nothing is uploaded to our servers, ensuring complete privacy and security for your content. After processing, all image data is automatically cleared from memory.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ImageCompressor;
