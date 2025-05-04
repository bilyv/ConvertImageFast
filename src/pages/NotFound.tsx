
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import BreadcrumbNav from '../components/BreadcrumbNav';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-app-background">
      <Helmet>
        <title>Page Not Found | ImageConvert</title>
        <meta name="description" content="The page you are looking for could not be found. Try using our image conversion tools." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <BreadcrumbNav />
      
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-6">Page Not Found</h1>
        <p className="text-xl mb-8">We couldn't find the page you were looking for.</p>
        
        <div className="space-y-6 my-10">
          <p className="text-lg">You might want to try:</p>
          <ul className="space-y-3 list-disc list-inside max-w-md mx-auto text-left">
            <li>Converting a PNG to JPG image</li>
            <li>Converting a JPG to PNG image</li>
            <li>Converting a WebP to JPG image</li>
            <li>Converting a PNG to WebP image</li>
          </ul>
        </div>
        
        <Button asChild className="px-8 py-6 text-lg">
          <Link to="/">Return to Homepage</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
