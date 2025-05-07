
import React, { useEffect, useRef } from 'react';

interface FormatCarouselProps {
  formats: string[];
  className?: string;
}

const FormatCarousel: React.FC<FormatCarouselProps> = ({ formats, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const items = Array.from(container.children) as HTMLElement[];
    
    // Set initial positions
    items.forEach((item, index) => {
      item.style.setProperty('--index', index.toString());
    });
    
    // Create the animation
    const animateItems = () => {
      items.forEach((item) => {
        const currentIndex = parseInt(item.style.getPropertyValue('--index'));
        const newIndex = (currentIndex + 1) % items.length;
        item.style.setProperty('--index', newIndex.toString());
        
        item.classList.remove('animate-format-move');
        void item.offsetWidth; // Force reflow
        item.classList.add('animate-format-move');
      });
    };
    
    const interval = setInterval(animateItems, 2000);
    
    return () => clearInterval(interval);
  }, [formats.length]);

  return (
    <div ref={containerRef} className={`relative flex overflow-hidden ${className}`}>
      {formats.map((format, index) => (
        <div 
          key={format} 
          className="animate-format-move px-3 py-1 bg-app-primary/10 text-app-primary rounded-full text-sm mx-1"
          style={{ '--index': index } as React.CSSProperties}
        >
          {format} Converter
        </div>
      ))}
    </div>
  );
};

export default FormatCarousel;
