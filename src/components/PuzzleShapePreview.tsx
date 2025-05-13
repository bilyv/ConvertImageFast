/**
 * Puzzle Shape Preview Component
 * 
 * This component displays a preview of the selected puzzle piece shape.
 */
import React, { useEffect, useRef } from 'react';
import { PuzzleShape } from '@/utils/puzzleUtils';

interface PuzzleShapePreviewProps {
  shape: PuzzleShape;
  className?: string;
}

const PuzzleShapePreview: React.FC<PuzzleShapePreviewProps> = ({ shape, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Draw the shape preview
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set up dimensions
    const padding = 10;
    const width = canvas.width - padding * 2;
    const height = canvas.height - padding * 2;

    // Draw the shape based on the selected type
    ctx.save();
    ctx.beginPath();

    switch (shape) {
      case 'heart':
        // Draw heart shape
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, padding + height);
        
        // Left side of the heart
        ctx.bezierCurveTo(
          padding, padding + height * 0.7, // Control point 1
          padding, padding + height * 0.4, // Control point 2
          canvas.width / 2, padding        // End point
        );
        
        // Right side of the heart
        ctx.bezierCurveTo(
          padding + width, padding + height * 0.4, // Control point 1
          padding + width, padding + height * 0.7, // Control point 2
          canvas.width / 2, padding + height       // End point
        );
        break;

      case 'rounded':
        // Draw rounded rectangle
        const radius = Math.min(width, height) * 0.2;
        ctx.beginPath();
        ctx.moveTo(padding + radius, padding);
        ctx.lineTo(padding + width - radius, padding);
        ctx.quadraticCurveTo(padding + width, padding, padding + width, padding + radius);
        ctx.lineTo(padding + width, padding + height - radius);
        ctx.quadraticCurveTo(padding + width, padding + height, padding + width - radius, padding + height);
        ctx.lineTo(padding + radius, padding + height);
        ctx.quadraticCurveTo(padding, padding + height, padding, padding + height - radius);
        ctx.lineTo(padding, padding + radius);
        ctx.quadraticCurveTo(padding, padding, padding + radius, padding);
        break;

      case 'zigzag':
        // Draw zigzag shape
        const zigzagSize = Math.min(width, height) * 0.1;
        const steps = 8;
        
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        
        // Top edge
        for (let i = 0; i < steps; i++) {
          const xPos = padding + (width / steps) * i;
          const yPos = padding + (i % 2 === 0 ? zigzagSize : 0);
          ctx.lineTo(xPos, yPos);
        }
        ctx.lineTo(padding + width, padding);
        
        // Right edge
        for (let i = 0; i < steps; i++) {
          const xPos = padding + width - (i % 2 === 0 ? zigzagSize : 0);
          const yPos = padding + (height / steps) * i;
          ctx.lineTo(xPos, yPos);
        }
        ctx.lineTo(padding + width, padding + height);
        
        // Bottom edge
        for (let i = 0; i < steps; i++) {
          const xPos = padding + width - (width / steps) * i;
          const yPos = padding + height - (i % 2 === 0 ? zigzagSize : 0);
          ctx.lineTo(xPos, yPos);
        }
        ctx.lineTo(padding, padding + height);
        
        // Left edge
        for (let i = 0; i < steps; i++) {
          const xPos = padding + (i % 2 === 0 ? zigzagSize : 0);
          const yPos = padding + height - (height / steps) * i;
          ctx.lineTo(xPos, yPos);
        }
        break;

      case 'cloud':
        // Draw cloud shape
        const bubbleRadius = Math.min(width, height) * 0.15;
        
        ctx.beginPath();
        
        // Bottom left corner
        ctx.moveTo(padding + bubbleRadius, padding + height);
        
        // Bottom edge with bubbles
        ctx.arc(padding + width * 0.25, padding + height - bubbleRadius, bubbleRadius, Math.PI / 2, Math.PI, false);
        ctx.arc(padding + width * 0.5, padding + height - bubbleRadius, bubbleRadius, Math.PI, 3 * Math.PI / 2, false);
        ctx.arc(padding + width * 0.75, padding + height - bubbleRadius, bubbleRadius, 3 * Math.PI / 2, 0, false);
        
        // Right edge with bubbles
        ctx.arc(padding + width - bubbleRadius, padding + height * 0.75, bubbleRadius, 0, Math.PI / 2, false);
        ctx.arc(padding + width - bubbleRadius, padding + height * 0.5, bubbleRadius, Math.PI / 2, Math.PI, false);
        ctx.arc(padding + width - bubbleRadius, padding + height * 0.25, bubbleRadius, Math.PI, 3 * Math.PI / 2, false);
        
        // Top edge with bubbles
        ctx.arc(padding + width * 0.75, padding + bubbleRadius, bubbleRadius, 3 * Math.PI / 2, 0, false);
        ctx.arc(padding + width * 0.5, padding + bubbleRadius, bubbleRadius, 0, Math.PI / 2, false);
        ctx.arc(padding + width * 0.25, padding + bubbleRadius, bubbleRadius, Math.PI / 2, Math.PI, false);
        
        // Left edge with bubbles
        ctx.arc(padding + bubbleRadius, padding + height * 0.25, bubbleRadius, Math.PI, 3 * Math.PI / 2, false);
        ctx.arc(padding + bubbleRadius, padding + height * 0.5, bubbleRadius, 3 * Math.PI / 2, 0, false);
        ctx.arc(padding + bubbleRadius, padding + height * 0.75, bubbleRadius, 0, Math.PI / 2, false);
        break;

      case 'star':
        // Draw star shape
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const outerRadius = Math.min(width, height) / 2;
        const innerRadius = outerRadius * 0.4;
        const spikes = 5;
        
        ctx.beginPath();
        ctx.moveTo(centerX, padding);
        
        for (let i = 0; i < spikes * 2; i++) {
          const radius = i % 2 === 0 ? outerRadius : innerRadius;
          const angle = (Math.PI * i) / spikes;
          const pointX = centerX + radius * Math.sin(angle);
          const pointY = centerY - radius * Math.cos(angle);
          ctx.lineTo(pointX, pointY);
        }
        break;

      case 'classic':
      default:
        // Draw classic rectangle
        ctx.rect(padding, padding, width, height);
        break;
    }

    // Fill and stroke the shape
    ctx.closePath();
    ctx.fillStyle = '#e2f5ff';
    ctx.fill();
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Add a puzzle piece pattern or texture
    ctx.restore();
  }, [shape]);

  return (
    <canvas 
      ref={canvasRef} 
      width={100} 
      height={100} 
      className={`border rounded ${className}`}
    />
  );
};

export default PuzzleShapePreview;
