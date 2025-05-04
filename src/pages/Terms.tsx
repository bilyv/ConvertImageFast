
import React from 'react';
import { Helmet } from 'react-helmet-async';
import BreadcrumbNav from '../components/BreadcrumbNav';

const Terms = () => {
  return (
    <div className="min-h-screen bg-app-background">
      <Helmet>
        <title>Terms of Service | ImageConvert - Image Format Converter</title>
        <meta name="description" content="Terms of service for using ImageConvert's image conversion tools. Learn about usage guidelines, limitations, and policies." />
        <link rel="canonical" href="https://imageconvert.app/terms" />
      </Helmet>

      <BreadcrumbNav />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg mb-6">Last Updated: May 4, 2025</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p>By using ImageConvert, you agree to these Terms of Service. If you don't agree, please don't use our service.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Service Description</h2>
            <p>ImageConvert provides online image format conversion tools that operate entirely within your web browser. We allow you to convert images between formats like PNG, JPG, and WebP without uploading them to a server.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
            <ul className="list-disc pl-6 my-4">
              <li>You are responsible for the content of the images you convert</li>
              <li>You must not use our service for illegal purposes</li>
              <li>You must not use our service to convert copyrighted images unless you have the right to do so</li>
              <li>You must not attempt to reverse engineer or compromise our service</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
            <p>All code, design elements, and other assets of the ImageConvert website are our intellectual property unless otherwise noted. You may not copy, modify, or distribute our website code without permission.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Limitation of Liability</h2>
            <p>ImageConvert is provided "as is" without warranties of any kind. We are not liable for any damages arising from the use of our service. While we process images directly in your browser for privacy, we cannot guarantee against all possible security vulnerabilities.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Service Modifications</h2>
            <p>We reserve the right to modify, suspend, or discontinue any part of our service at any time without notice.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Contact Information</h2>
            <p>If you have questions about these terms, please contact us at <a href="mailto:contact@imageconvert.app" className="text-app-primary hover:underline">contact@imageconvert.app</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
