
import React from 'react';
import { Helmet } from 'react-helmet-async';
import BreadcrumbNav from '../components/BreadcrumbNav';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-app-background">
      <Helmet>
        <title>Privacy Policy | ImageConvert - Image Format Converter</title>
        <meta name="description" content="Our privacy policy explains how we handle your data when using our image conversion tools. We prioritize your privacy and security." />
        <link rel="canonical" href="https://imageconvert.app/privacy" />
      </Helmet>

      <BreadcrumbNav />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg mb-6">Last Updated: May 4, 2025</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p>At ImageConvert, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your information when you use our online image conversion tools.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Information We Don't Collect</h2>
            <p>Our service is designed with privacy in mind:</p>
            <ul className="list-disc pl-6 my-4">
              <li>We do not upload your images to any server - all processing happens directly in your browser</li>
              <li>We do not store your converted images</li>
              <li>We do not track individual user behavior</li>
              <li>We do not require registration or collect personal information</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Information We May Collect</h2>
            <p>We collect minimal anonymous usage data:</p>
            <ul className="list-disc pl-6 my-4">
              <li>Anonymous analytics data (page views, time on site)</li>
              <li>Browser type and version</li>
              <li>Operating system information</li>
            </ul>
            <p>This information helps us improve our service and does not identify you personally.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
            <p>We use essential cookies that are necessary for the site to function. These cookies don't track you for advertising purposes.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p>If you have any questions about our privacy practices, please contact us at <a href="mailto:ntwaribrian92@gmail.com" className="text-app-primary hover:underline">ntwaribrian92@gmail.com</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
