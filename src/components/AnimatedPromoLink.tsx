/**
 * AnimatedPromoLink Component
 * 
 * A beautiful, animated promotional link that showcases the ConvertImageFast branding
 * and encourages users to add features to their own websites.
 */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Sparkles } from 'lucide-react';

interface AnimatedPromoLinkProps {
  /**
   * The URL to link to
   */
  href: string;
  
  /**
   * The feature name to promote
   */
  featureName: string;
}

const AnimatedPromoLink: React.FC<AnimatedPromoLinkProps> = ({ href, featureName }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [sparklePosition, setSparklePosition] = useState({ x: 0, y: 0 });
  const [showSparkle, setShowSparkle] = useState(false);
  
  // Create a random sparkle effect
  useEffect(() => {
    if (isHovered) {
      const interval = setInterval(() => {
        setSparklePosition({
          x: Math.random() * 100,
          y: Math.random() * 100
        });
        setShowSparkle(true);
        setTimeout(() => setShowSparkle(false), 700);
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [isHovered]);
  
  return (
    <div className="my-8 flex flex-col items-center justify-center">
      {/* Divider */}
      <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-border to-transparent mb-6"></div>
      
      {/* Promo Link Container */}
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative overflow-hidden group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        <div className="relative z-10 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 hover:from-emerald-500/20 hover:to-teal-500/20 border border-border hover:border-emerald-500/50 rounded-lg p-6 transition-all duration-300 shadow-sm hover:shadow-md">
          {/* Logo and Brand */}
          <div className="flex items-center justify-center mb-3">
            <motion.img 
              src="/green-file-icon.png" 
              alt="ConvertImageFast Logo" 
              className="h-8 w-8 mr-2"
              animate={{ rotate: isHovered ? [0, -10, 10, -10, 0] : 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
            <motion.span 
              className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-500"
              animate={{ 
                backgroundPosition: isHovered ? ['0% 50%', '100% 50%', '0% 50%'] : '0% 50%' 
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: '200% 200%' }}
            >
              ConvertImageFast
            </motion.span>
          </div>
          
          {/* Feature Promotion Text */}
          <p className="text-center text-base font-medium mb-2">
            Add this {featureName} feature on your website
          </p>
          
          {/* Call to Action */}
          <div className="flex items-center justify-center text-sm text-muted-foreground">
            <span>Get the code</span>
            <ExternalLink className="h-3.5 w-3.5 ml-1" />
          </div>
          
          {/* Animated Sparkle Effect */}
          {showSparkle && (
            <motion.div
              className="absolute pointer-events-none"
              style={{ 
                left: `${sparklePosition.x}%`, 
                top: `${sparklePosition.y}%`,
                zIndex: 20
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1.5 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Sparkles className="h-5 w-5 text-yellow-400" />
            </motion.div>
          )}
        </div>
        
        {/* Background Gradient Animation */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-teal-500/10 to-emerald-500/0 rounded-lg"
          animate={{ 
            x: isHovered ? ['0%', '100%', '0%'] : '0%',
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          style={{ backgroundSize: '200% 100%' }}
        />
      </motion.a>
    </div>
  );
};

export default AnimatedPromoLink;
