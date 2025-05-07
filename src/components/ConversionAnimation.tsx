
import React, { useEffect, useRef } from 'react';

/**
 * Component that displays a continuous animation of image format conversion
 * showing images moving across the screen and transforming between formats
 */
const ConversionAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const updateCanvasSize = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.offsetWidth;
        canvas.height = 80; // Fixed height for the animation
      }
    };
    
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    
    // Define image formats for the animation
    const formats = ['PNG', 'JPG', 'WEBP', 'JFIF', 'GIF'];
    
    // Define particles that will move across the screen
    interface Particle {
      x: number;
      y: number;
      speed: number;
      format: string;
      targetFormat: string;
      size: number;
      color: string;
      progress: number;
      opacity: number;
    }
    
    // Create particles
    const particles: Particle[] = [];
    
    const createParticle = () => {
      const format = formats[Math.floor(Math.random() * formats.length)];
      const targetFormat = formats[Math.floor(Math.random() * formats.length)];
      
      // Don't target the same format
      if (format === targetFormat) {
        return createParticle();
      }
      
      const colors = ['#1abc9c', '#3498db', '#9b59b6', '#f1c40f', '#e74c3c']; // Variety of colors for visual appeal
      
      return {
        x: -100,
        y: canvas.height / 2 + (Math.random() * 30 - 15),
        speed: 1 + Math.random() * 2,
        format,
        targetFormat,
        size: 12 + Math.floor(Math.random() * 5),
        color: colors[Math.floor(Math.random() * colors.length)],
        progress: 0,
        opacity: 0.1 + Math.random() * 0.6
      };
    };
    
    // Generate initial particles
    for (let i = 0; i < 10; i++) {
      particles.push(createParticle());
      particles[i].x = Math.random() * canvas.width; // Distribute across the canvas initially
    }
    
    // Animation loop
    let animationFrameId: number;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Update position and progress
        p.x += p.speed;
        p.progress += 0.005;
        
        if (p.x > canvas.width + 100) {
          // Reset particle when it goes off screen
          Object.assign(particles[i], createParticle());
        }
        
        // Draw connecting line (conversion process)
        const lineProgress = p.progress % 1;
        if (lineProgress > 0.2 && lineProgress < 0.8) {
          const arrowLength = 100;
          const startX = p.x;
          const endX = p.x + arrowLength;
          
          ctx.beginPath();
          ctx.moveTo(startX, p.y);
          ctx.lineTo(endX, p.y);
          ctx.strokeStyle = `rgba(${parseInt(p.color.slice(1, 3), 16)}, ${parseInt(p.color.slice(3, 5), 16)}, ${parseInt(p.color.slice(5, 7), 16)}, ${p.opacity})`;
          ctx.lineWidth = 2;
          ctx.stroke();
          
          // Draw arrow tip
          ctx.beginPath();
          ctx.moveTo(endX, p.y);
          ctx.lineTo(endX - 10, p.y - 5);
          ctx.lineTo(endX - 10, p.y + 5);
          ctx.closePath();
          ctx.fillStyle = `rgba(${parseInt(p.color.slice(1, 3), 16)}, ${parseInt(p.color.slice(3, 5), 16)}, ${parseInt(p.color.slice(5, 7), 16)}, ${p.opacity})`;
          ctx.fill();
        }
        
        // Draw source format text
        ctx.font = `${p.size}px 'Inter', sans-serif`;
        ctx.fillStyle = `rgba(${parseInt(p.color.slice(1, 3), 16)}, ${parseInt(p.color.slice(3, 5), 16)}, ${parseInt(p.color.slice(5, 7), 16)}, ${p.opacity})`;
        ctx.textAlign = 'right';
        ctx.fillText(p.format, p.x - 5, p.y);
        
        // Draw target format text
        ctx.font = `${p.size}px 'Inter', sans-serif`;
        ctx.textAlign = 'left';
        ctx.fillText(p.targetFormat, p.x + 105, p.y);
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <div className="w-full overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="w-full" 
        style={{ height: '80px' }}
      />
    </div>
  );
};

export default ConversionAnimation;
