/**
 * Header Component
 * 
 * This component provides a consistent header across all pages of the application.
 * It includes the site logo and main navigation links.
 */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Puzzle } from 'lucide-react';

interface HeaderProps {
  /**
   * Optional additional navigation items to show on the right side
   */
  rightNav?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ rightNav }) => {
  const location = useLocation();
  
  // Determine if we're on the home page
  const isHomePage = location.pathname === '/';
  
  return (
    <header className="border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-3 mb-4 md:mb-0">
          <Link to="/" className="flex items-center space-x-3">
            <img src="/green-file-icon.png" alt="ConvertImageFast Logo" className="h-10 w-10" />
            <span className="text-xl font-bold text-app-primary">ConvertImageFast</span>
          </Link>
        </div>

        {isHomePage ? (
          /* Main Navigation for Home Page */
          <nav aria-label="Main Navigation">
            <ul className="flex flex-wrap items-center justify-center gap-6">
              <li>
                <a href="#tools" className="text-app-text hover:text-app-primary transition-colors">
                  Image Converter
                </a>
              </li>
              <li>
                <Link 
                  to="/puzzle" 
                  className="flex items-center gap-1 text-app-text hover:text-app-primary transition-colors"
                >
                  <Puzzle className="h-4 w-4" />
                  Create Puzzle
                </Link>
              </li>
              <li>
                <a href="#features" className="text-app-text hover:text-app-primary transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#about" className="text-app-text hover:text-app-primary transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#faq-heading" className="text-app-text hover:text-app-primary transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#contact" className="text-app-text hover:text-app-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        ) : (
          /* Custom right navigation for other pages */
          <div className="flex items-center gap-2">
            {rightNav ? (
              rightNav
            ) : (
              <Link 
                to="/" 
                className="text-app-text hover:text-app-primary transition-colors"
              >
                Back to Home
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
