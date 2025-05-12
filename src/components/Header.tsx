/**
 * Header Component
 *
 * This component provides a consistent header across all pages of the application.
 * It includes the site logo and main navigation links.
 */
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Puzzle, FileDown, ChevronDown, Image, Menu, X, Info, HelpCircle, MessageSquare } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';

interface HeaderProps {
  /**
   * Optional additional navigation items to show on the right side
   */
  rightNav?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ rightNav }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          <div className="flex items-center">
            {/* Desktop Navigation */}
            <nav aria-label="Main Navigation" className="hidden md:block">
              <ul className="flex flex-wrap items-center justify-center gap-6">
                <li>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-1 bg-app-primary text-white hover:bg-app-primary/90">
                        Get Started
                        <ChevronDown className="h-4 w-4 ml-1" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className="w-56">
                      <DropdownMenuItem asChild>
                        <a href="#tools" className="flex items-center gap-2 cursor-pointer">
                          <Image className="h-4 w-4" />
                          <span>Image Converter</span>
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/puzzle" className="flex items-center gap-2 cursor-pointer">
                          <Puzzle className="h-4 w-4" />
                          <span>Create Puzzle</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/compress" className="flex items-center gap-2 cursor-pointer">
                          <FileDown className="h-4 w-4" />
                          <span>Image Compressor</span>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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

            {/* Mobile Navigation */}
            <div className="flex md:hidden">
              <div className="mr-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-1 bg-app-primary text-white hover:bg-app-primary/90">
                      Get Started
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-56">
                    <DropdownMenuItem asChild>
                      <a href="#tools" className="flex items-center gap-2 cursor-pointer">
                        <Image className="h-4 w-4" />
                        <span>Image Converter</span>
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/puzzle" className="flex items-center gap-2 cursor-pointer">
                        <Puzzle className="h-4 w-4" />
                        <span>Create Puzzle</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/compress" className="flex items-center gap-2 cursor-pointer">
                        <FileDown className="h-4 w-4" />
                        <span>Image Compressor</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-app-text">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[250px] sm:w-[300px] p-0">
                  <div className="flex flex-col h-full">
                    <div className="p-4 border-b">
                      <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Menu</h2>
                        <SheetClose asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <X className="h-4 w-4" />
                            <span className="sr-only">Close</span>
                          </Button>
                        </SheetClose>
                      </div>
                    </div>
                    <nav className="flex-1 p-4">
                      <ul className="space-y-4">
                        <li>
                          <SheetClose asChild>
                            <a href="#features" className="flex items-center gap-2 text-app-text hover:text-app-primary transition-colors">
                              <Info className="h-5 w-5" />
                              Features
                            </a>
                          </SheetClose>
                        </li>
                        <li>
                          <SheetClose asChild>
                            <a href="#about" className="flex items-center gap-2 text-app-text hover:text-app-primary transition-colors">
                              <Info className="h-5 w-5" />
                              About
                            </a>
                          </SheetClose>
                        </li>
                        <li>
                          <SheetClose asChild>
                            <a href="#faq-heading" className="flex items-center gap-2 text-app-text hover:text-app-primary transition-colors">
                              <HelpCircle className="h-5 w-5" />
                              FAQ
                            </a>
                          </SheetClose>
                        </li>
                        <li>
                          <SheetClose asChild>
                            <a href="#contact" className="flex items-center gap-2 text-app-text hover:text-app-primary transition-colors">
                              <MessageSquare className="h-5 w-5" />
                              Contact
                            </a>
                          </SheetClose>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        ) : (
          /* Custom right navigation for other pages */
          <div className="flex items-center gap-2">
            {rightNav ? (
              rightNav
            ) : (
              <>
                <Link
                  to="/"
                  className="text-app-text hover:text-app-primary transition-colors"
                >
                  Back to Home
                </Link>

                {/* Mobile Menu for non-homepage */}
                <div className="md:hidden ml-4">
                  <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-app-text">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[250px] sm:w-[300px] p-0">
                      <div className="flex flex-col h-full">
                        <div className="p-4 border-b">
                          <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold">Menu</h2>
                            <SheetClose asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <X className="h-4 w-4" />
                                <span className="sr-only">Close</span>
                              </Button>
                            </SheetClose>
                          </div>
                        </div>
                        <nav className="flex-1 p-4">
                          <ul className="space-y-4">
                            <li>
                              <SheetClose asChild>
                                <Link to="/" className="flex items-center gap-2 text-app-text hover:text-app-primary transition-colors">
                                  <Image className="h-5 w-5" />
                                  Image Converter
                                </Link>
                              </SheetClose>
                            </li>
                            <li>
                              <SheetClose asChild>
                                <Link to="/puzzle" className="flex items-center gap-2 text-app-text hover:text-app-primary transition-colors">
                                  <Puzzle className="h-5 w-5" />
                                  Create Puzzle
                                </Link>
                              </SheetClose>
                            </li>
                            <li>
                              <SheetClose asChild>
                                <Link to="/compress" className="flex items-center gap-2 text-app-text hover:text-app-primary transition-colors">
                                  <FileDown className="h-5 w-5" />
                                  Image Compressor
                                </Link>
                              </SheetClose>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
