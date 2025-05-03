
import React from 'react';
import ImageConverter from '../components/ImageConverter';

const Index = () => {
  return (
    <div className="min-h-screen bg-app-background">
      <header className="pt-14 pb-8 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-app-text mb-3">
            Image Format Converter
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Instantly convert between PNG, JPG, and WebP formats with our free online tool.
            No signup required, and your images never leave your browser.
          </p>
        </div>
      </header>
      
      <main className="pb-20">
        <ImageConverter />
      </main>
      
      <footer className="border-t py-6 text-center text-muted-foreground text-sm">
        <div className="max-w-5xl mx-auto">
          <p>Your images remain private and are processed entirely in your browser.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
