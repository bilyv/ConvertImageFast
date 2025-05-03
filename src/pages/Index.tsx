
import React, { useState } from 'react';
import ImageConverter from '../components/ImageConverter';
import { MoonIcon, SunIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-app-background'}`}>
      {/* Header Navigation */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <img src="/logo.png" alt="Logo" className="h-8 w-8" onError={(e) => e.currentTarget.style.display = 'none'} />
            <span className="text-xl font-bold text-app-primary">ImageConvert</span>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <a href="/" className="text-app-text hover:text-app-primary transition-colors">Home</a>
            <a href="/#tools" className="text-app-text hover:text-app-primary transition-colors">Tools</a>
            <a href="/#about" className="text-app-text hover:text-app-primary transition-colors">About</a>
            <a href="/#contact" className="text-app-text hover:text-app-primary transition-colors">Contact</a>
          </nav>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={toggleDarkMode}
            className="ml-auto md:ml-0"
          >
            {darkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-12 pb-8 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-app-text mb-3">
            Image Format Converter
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Instantly convert between PNG, JPG, and WebP formats with our free online tool.
            No signup required, and your images never leave your browser.
          </p>
        </div>
      </section>
      
      {/* Main Content / Tool Section */}
      <main className="pb-20" id="tools">
        <ImageConverter />
      </main>
      
      {/* Footer */}
      <footer className="border-t py-6 text-center text-muted-foreground text-sm">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-center md:justify-between items-center">
            <p>© 2025 ImageConvert - Your images remain private and are processed entirely in your browser.</p>
            <div className="flex space-x-4 mt-3 md:mt-0">
              <a href="/privacy" className="hover:text-app-primary transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-app-primary transition-colors">Terms</a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-app-primary transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
