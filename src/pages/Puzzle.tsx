/**
 * Puzzle Page
 *
 * This page displays an interactive puzzle created from an image.
 * Users can play the puzzle game and share it with others.
 */
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getCurrentDateISO, getCurrentDateTimeISO } from '../utils/dateUtils';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import {
  Share2,
  ArrowLeft,
  RefreshCw,
  Trophy,
  Puzzle as PuzzleIcon,
  Copy,
  Mail,
  Download,
  MousePointerClick
} from 'lucide-react';

// Import custom social media icons to replace deprecated ones
const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

import {
  PuzzlePiece,
  PuzzleConfig,
  DEFAULT_PUZZLE_CONFIG,
  createPuzzlePieces,
  createShareablePuzzleData,
  parseShareablePuzzleData,
  ShareablePuzzleData
} from '@/utils/puzzleUtils';
import Header from '@/components/Header';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

const Puzzle: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Get image data from location state
  const [imageData, setImageData] = useState<any>(location.state?.imageData || null);

  // File upload state
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Puzzle state
  const [puzzlePieces, setPuzzlePieces] = useState<PuzzlePiece[]>([]);
  const [activePiece, setActivePiece] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [config, setConfig] = useState<PuzzleConfig>(DEFAULT_PUZZLE_CONFIG);
  const [isPuzzleSolved, setIsPuzzleSolved] = useState(false);
  const [showConfig, setShowConfig] = useState(true);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [downloadDialogOpen, setDownloadDialogOpen] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState<'jpg' | 'png' | 'webp'>('png');
  const [interactionMode, setInteractionMode] = useState<'drag' | 'click'>('drag');
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null);
  const [puzzleCreated, setPuzzleCreated] = useState(false);

  const puzzleContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Parse URL query parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    // Check for shared puzzle data
    const sharedPuzzleData = searchParams.get('puzzleData');
    if (sharedPuzzleData) {
      try {
        // Parse the shared puzzle data
        const puzzleData = parseShareablePuzzleData(sharedPuzzleData);

        if (puzzleData) {
          // Set the puzzle configuration
          setConfig(puzzleData.config);

          // Set the interaction mode
          setInteractionMode(puzzleData.mode);

          // Set the puzzle pieces directly
          setPuzzlePieces(puzzleData.pieces as PuzzlePiece[]);

          // Automatically show the puzzle
          setPuzzleCreated(true);
          setShowConfig(false);

          toast({
            title: 'Shared Puzzle Loaded',
            description: 'A shared puzzle has been loaded. Try to solve it!',
            variant: 'default'
          });

          return; // Skip the rest of the parsing if we have shared puzzle data
        }
      } catch (error) {
        console.error('Failed to parse shared puzzle data:', error);
      }
    }

    // Legacy URL parameter parsing (for backward compatibility)
    const configParam = searchParams.get('config');
    if (configParam) {
      try {
        const parsedConfig = JSON.parse(decodeURIComponent(configParam));
        if (parsedConfig.rows && parsedConfig.columns && parsedConfig.difficulty) {
          setConfig(parsedConfig);
        }
      } catch (error) {
        console.error('Failed to parse config from URL:', error);
      }
    }

    // Check for interaction mode parameter
    const modeParam = searchParams.get('mode');
    if (modeParam === 'click' || modeParam === 'drag') {
      setInteractionMode(modeParam);
    }
  }, [location.search, toast]);

  // Check if image data is provided
  // We no longer redirect if no image data is provided
  // Instead, we'll show an upload interface

  // Initialize puzzle when config changes
  useEffect(() => {
    if ((imageData || uploadedImageUrl) && !showConfig && puzzleCreated) {
      initializePuzzle();
    }
  }, [imageData, uploadedImageUrl, config, showConfig, puzzleCreated]);

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    // Validate file type
    const validImageTypes = [
      'image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/bmp', 'image/gif',
      'image/heic', 'image/heif', 'image/jfif', 'image/svg+xml', 'application/pdf',
      'image/tiff', 'image/x-icon', 'image/vnd.microsoft.icon'
    ];

    // Also check file extension for formats that might not be correctly identified by MIME type
    const fileExtension = file.name.toLowerCase().split('.').pop() || '';
    const validExtensions = ['jpg', 'jpeg', 'png', 'webp', 'bmp', 'gif', 'heic', 'heif',
                            'jfif', 'svg', 'pdf', 'tiff', 'tif', 'ico'];

    if (!validImageTypes.includes(file.type) && !validExtensions.includes(fileExtension)) {
      setUploadError('Please upload a valid image file in one of these formats: JPG, PNG, WebP, BMP, GIF, HEIC, JFIF, SVG, PDF, TIFF, or ICO');
      return;
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      setUploadError('File size exceeds 10MB limit');
      return;
    }

    // Clear any previous errors
    setUploadError(null);

    // Create object URL for the file
    const objectUrl = URL.createObjectURL(file);
    setUploadedFile(file);
    setUploadedImageUrl(objectUrl);

    // Reset puzzle state
    setPuzzleCreated(false);
    setPuzzlePieces([]);
    setShowConfig(true);
  };

  // Trigger file input click
  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      // Create a synthetic event to reuse the handleFileUpload logic
      const syntheticEvent = {
        target: {
          files: e.dataTransfer.files
        }
      } as React.ChangeEvent<HTMLInputElement>;

      handleFileUpload(syntheticEvent);
    }
  };

  // Create puzzle from uploaded image
  const handleCreatePuzzle = () => {
    if (!uploadedImageUrl && !imageData) {
      toast({
        title: 'No Image Selected',
        description: 'Please upload an image first.',
        variant: 'destructive'
      });
      return;
    }

    setPuzzleCreated(true);
    setShowConfig(false);
  };

  // Check if puzzle is solved after each move
  useEffect(() => {
    if (puzzlePieces.length > 0) {
      checkIfPuzzleSolved();
    }
  }, [puzzlePieces]);

  // Initialize the puzzle with the current configuration
  const initializePuzzle = async () => {
    // Use uploaded image URL if available, otherwise use image data from state
    const imageUrl = uploadedImageUrl || (imageData ? imageData.imageUrl : null);

    if (!imageUrl) {
      toast({
        title: 'No Image Available',
        description: 'Please upload an image first.',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);
    try {
      const pieces = await createPuzzlePieces(imageUrl, config);
      setPuzzlePieces(pieces);
      setIsPuzzleSolved(false);
    } catch (error) {
      console.error('Error creating puzzle:', error);
      toast({
        title: 'Puzzle Creation Error',
        description: 'Failed to create puzzle from the image.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle piece interaction based on mode
  const handlePieceInteraction = (e: React.MouseEvent, pieceId: number) => {
    if (interactionMode === 'drag') {
      handleDragStart(e, pieceId);
    } else {
      handlePieceClick(pieceId);
    }
  };

  // Start dragging a piece
  const handleDragStart = (e: React.MouseEvent, pieceId: number) => {
    const piece = puzzlePieces.find(p => p.id === pieceId);
    if (!piece) return;

    // Calculate the offset from the mouse position to the piece's top-left corner
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    setActivePiece(pieceId);
    setIsDragging(true);
    setDragOffset({ x: offsetX, y: offsetY });
  };

  // Handle click-to-swap interaction
  const handlePieceClick = (pieceId: number) => {
    if (selectedPiece === null) {
      // First piece selected
      setSelectedPiece(pieceId);
    } else if (selectedPiece === pieceId) {
      // Same piece clicked again, deselect it
      setSelectedPiece(null);
    } else {
      // Second piece selected, swap them
      swapPieces(selectedPiece, pieceId);
      setSelectedPiece(null);
    }
  };

  // Swap two puzzle pieces
  const swapPieces = (pieceId1: number, pieceId2: number) => {
    setPuzzlePieces(pieces => {
      const piece1 = pieces.find(p => p.id === pieceId1);
      const piece2 = pieces.find(p => p.id === pieceId2);

      if (!piece1 || !piece2) return pieces;

      return pieces.map(piece => {
        if (piece.id === pieceId1) {
          return { ...piece, x: piece2.x, y: piece2.y };
        } else if (piece.id === pieceId2) {
          return { ...piece, x: piece1.x, y: piece1.y };
        }
        return piece;
      });
    });
  };

  // Move the piece while dragging
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || activePiece === null || interactionMode !== 'drag') return;

    const containerRect = puzzleContainerRef.current?.getBoundingClientRect();
    if (!containerRect) return;

    // Calculate new position relative to the container
    const newX = e.clientX - containerRect.left - dragOffset.x;
    const newY = e.clientY - containerRect.top - dragOffset.y;

    // Update the piece position
    setPuzzlePieces(pieces =>
      pieces.map(piece =>
        piece.id === activePiece
          ? { ...piece, x: newX, y: newY }
          : piece
      )
    );
  };

  // Stop dragging
  const handleMouseUp = () => {
    if (interactionMode === 'drag') {
      setIsDragging(false);
      setActivePiece(null);
    }
  };

  // Check if the puzzle is solved
  const checkIfPuzzleSolved = () => {
    if (puzzlePieces.length === 0) return;

    // A piece is considered in the correct position if it's within a certain threshold
    const threshold = 20; // pixels
    const solved = puzzlePieces.every(piece => {
      return (
        Math.abs(piece.x - piece.correctX) < threshold &&
        Math.abs(piece.y - piece.correctY) < threshold
      );
    });

    if (solved && !isPuzzleSolved) {
      setIsPuzzleSolved(true);
      toast({
        title: 'Puzzle Solved!',
        description: 'Congratulations! You solved the puzzle.',
        variant: 'default'
      });
    }
  };

  // Reset the puzzle
  const handleReset = () => {
    initializePuzzle();
  };

  // This function is kept for future use if needed
  // const handleStartPuzzle = () => {
  //   setShowConfig(false);
  // };

  // Go back to the home page
  const handleGoBack = () => {
    navigate('/');
  };

  // Toggle interaction mode between drag and click
  const toggleInteractionMode = () => {
    const newMode = interactionMode === 'drag' ? 'click' : 'drag';
    setInteractionMode(newMode);
    setSelectedPiece(null); // Clear any selected piece when changing modes

    toast({
      title: `${newMode.charAt(0).toUpperCase() + newMode.slice(1)} Mode Activated`,
      description: newMode === 'drag' ? 'Drag and drop pieces to solve the puzzle.' : 'Click two pieces to swap their positions.',
      variant: 'default'
    });
  };

  // Download the solved puzzle as an image
  const handleDownloadPuzzle = async () => {
    if (!puzzleContainerRef.current) return;

    try {
      setIsLoading(true);

      // Use html2canvas to capture the puzzle
      const canvas = await html2canvas(puzzleContainerRef.current, {
        backgroundColor: '#f5f5f5',
        scale: 2, // Higher quality
        logging: false,
        useCORS: true
      });

      // Convert to the selected format
      let mimeType = 'image/png';
      let fileExtension = 'png';
      let quality = 1.0;

      if (downloadFormat === 'jpg') {
        mimeType = 'image/jpeg';
        fileExtension = 'jpg';
        quality = 0.9;
      } else if (downloadFormat === 'webp') {
        mimeType = 'image/webp';
        fileExtension = 'webp';
        quality = 0.9;
      }

      // Convert canvas to blob
      canvas.toBlob((blob) => {
        if (blob) {
          // Generate filename
          const timestamp = new Date().getTime();
          const filename = `puzzle_${timestamp}.${fileExtension}`;

          // Save the file
          saveAs(blob, filename);

          toast({
            title: 'Puzzle Downloaded',
            description: `Your puzzle has been saved as ${filename}`,
            variant: 'default'
          });
        }
      }, mimeType, quality);
    } catch (error) {
      console.error('Error downloading puzzle:', error);
      toast({
        title: 'Download Failed',
        description: 'There was an error downloading your puzzle.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
      setDownloadDialogOpen(false);
    }
  };

  // Copy puzzle link to clipboard
  const handleCopyLink = () => {
    // Only proceed if we have puzzle pieces
    if (puzzlePieces.length === 0) {
      toast({
        title: 'No Puzzle to Share',
        description: 'Please create a puzzle first before sharing.',
        variant: 'destructive'
      });
      return;
    }

    // Create a shareable puzzle data string
    const shareableData = createShareablePuzzleData(puzzlePieces, config, interactionMode);

    // Create a URL with the encoded puzzle data
    const puzzleUrl = `${window.location.origin}/puzzle?puzzleData=${encodeURIComponent(shareableData)}`;

    // Use Web Share API if available
    if (navigator.share) {
      navigator.share({
        title: 'Check out this puzzle!',
        text: 'I created this puzzle with ConvertImageFast. Try to solve it!',
        url: puzzleUrl
      }).catch(err => {
        console.error('Share failed:', err);
        // Fallback to clipboard
        copyToClipboard();
      });
    } else {
      // Fallback to clipboard
      copyToClipboard();
    }

    function copyToClipboard() {
      navigator.clipboard.writeText(puzzleUrl).then(() => {
        toast({
          title: 'Link Copied',
          description: 'Puzzle link copied to clipboard! Share it with friends to let them try your puzzle.',
          variant: 'default'
        });
      }).catch(err => {
        console.error('Failed to copy link:', err);
        toast({
          title: 'Copy Failed',
          description: 'Failed to copy link to clipboard.',
          variant: 'destructive'
        });
      });
    }
  };

  // Share on social media
  const handleShare = (platform: 'facebook' | 'twitter' | 'linkedin' | 'email') => {
    // Only proceed if we have puzzle pieces
    if (puzzlePieces.length === 0) {
      toast({
        title: 'No Puzzle to Share',
        description: 'Please create a puzzle first before sharing.',
        variant: 'destructive'
      });
      return;
    }

    // Create a shareable puzzle data string
    const shareableData = createShareablePuzzleData(puzzlePieces, config, interactionMode);

    // Create a URL with the encoded puzzle data
    const puzzleUrl = `${window.location.origin}/puzzle?puzzleData=${encodeURIComponent(shareableData)}`;

    const title = 'Check out this image puzzle!';
    const description = 'I created this puzzle with ConvertImageFast. Try to solve it!';

    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(puzzleUrl)}&quote=${encodeURIComponent(description)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(puzzleUrl)}&text=${encodeURIComponent(description)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(puzzleUrl)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${description}\n\n${puzzleUrl}`)}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank');

      toast({
        title: `Shared on ${platform.charAt(0).toUpperCase() + platform.slice(1)}`,
        description: 'Your puzzle has been shared successfully!',
        variant: 'default'
      });
    }
  };

  return (
    <div className="min-h-screen bg-app-background">
      <Helmet>
        <title>Create Custom Image Puzzles Online | Free Puzzle Maker | ConvertImageFast</title>
        <meta name="description" content="Turn any image into a fun, interactive puzzle with our free online puzzle maker. Customize difficulty, grid size, and sharing options. Create and share puzzles from your photos with friends and family. No registration required." />
        <meta name="keywords" content="image puzzle maker, create puzzle from photo, online puzzle creator, custom jigsaw puzzle, interactive puzzle game, free puzzle maker, share puzzles online, photo puzzle generator, make puzzle from image, puzzle creator tool, online jigsaw puzzle" />
        <link rel="canonical" href="https://convertimagefast.com/puzzle" />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="Create Custom Image Puzzles Online | Free Puzzle Maker" />
        <meta property="og:description" content="Turn any image into a fun, interactive puzzle with our free online puzzle maker. Customize difficulty, grid size, and sharing options." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://convertimagefast.com/puzzle" />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:updated_time" content={getCurrentDateTimeISO()} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Create Custom Image Puzzles Online | Free Puzzle Maker" />
        <meta name="twitter:description" content="Turn any image into a fun, interactive puzzle with our free online puzzle maker. Customize difficulty, grid size, and sharing options." />
        <meta name="twitter:image" content="/twitter-image.jpg" />

        {/* Schema.org structured data */}
        <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "ConvertImageFast Puzzle Maker",
          "url": "https://convertimagefast.com/puzzle",
          "description": "Free online puzzle maker that turns any image into an interactive puzzle. Create, play, and share custom puzzles with friends and family.",
          "applicationCategory": "GameApplication",
          "operatingSystem": "All",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "featureList": [
            "Create puzzles from any image",
            "Customize puzzle difficulty",
            "Choose grid size (2x2 to 5x5)",
            "Multiple interaction modes",
            "Share puzzles with friends",
            "Download completed puzzles",
            "Browser-based processing",
            "No registration required",
            "Privacy-focused design"
          ],
          "dateModified": "${getCurrentDateISO()}"
        }
        `}</script>
      </Helmet>

      {/* Header with custom right navigation */}
      <Header
        rightNav={
          <div className="flex items-center gap-2">
            {puzzleCreated && !showConfig && (
              <>
                <Button variant="outline" size="sm" onClick={toggleInteractionMode}>
                  {interactionMode === 'drag' ? (
                    <>
                      <MousePointerClick className="h-4 w-4 mr-2" />
                      Switch to Click Mode
                    </>
                  ) : (
                    <>
                      <MousePointerClick className="h-4 w-4 mr-2" />
                      Switch to Drag Mode
                    </>
                  )}
                </Button>
                <Button variant="outline" size="sm" onClick={() => setDownloadDialogOpen(true)}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" size="sm" onClick={() => setShareDialogOpen(true)}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </>
            )}
            <Button variant="outline" size="sm" onClick={handleGoBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>
        }
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4">
        <div className="mb-6">
          {puzzleCreated && !showConfig ? (
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <PuzzleIcon className="h-6 w-6 text-app-primary" />
                {`Puzzle: ${uploadedFile?.name || (imageData?.fileName || 'Image')}`}
              </h1>
              <p className="text-muted-foreground">
                {interactionMode === 'drag'
                  ? 'Drag and drop the pieces to solve the puzzle'
                  : 'Click two pieces to swap their positions'}
              </p>
            </div>
          ) : (
            <div className="text-center">
              <h1 className="text-2xl font-bold flex items-center gap-2 justify-center">
                <PuzzleIcon className="h-6 w-6 text-app-primary" />
                Create Your Custom Image Puzzle
              </h1>
              <p className="text-muted-foreground">
                Transform any image into an interactive puzzle to play and share
              </p>
              <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
                Upload any image, customize difficulty and grid size, then play or share your puzzle with friends and family
              </p>
            </div>
          )}
        </div>

        {/* Show upload interface if no puzzle has been created yet or if in config mode */}
        {(!puzzleCreated || showConfig) && (
          <div className="bg-card border rounded-lg p-6 max-w-md mx-auto">
            {/* Image Upload Section */}
            {!imageData && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-3 text-center">Upload Image for Your Puzzle</h2>
                <p className="text-sm text-muted-foreground mb-4 text-center">
                  Choose any image to transform into an interactive puzzle. Family photos, landscapes, artwork - anything works!
                </p>

                {/* Hidden file input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/jpeg,image/jpg,image/png,image/webp,image/bmp,image/gif,image/heic,image/heif,image/jfif,image/svg+xml,application/pdf,image/tiff,image/x-icon,.jpg,.jpeg,.png,.webp,.bmp,.gif,.heic,.heif,.jfif,.svg,.pdf,.tiff,.tif,.ico"
                  onChange={handleFileUpload}
                />

                {/* Drag and drop area */}
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center ${uploadError ? 'border-red-400' : 'border-border'}`}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={handleBrowseClick}
                >
                  {uploadedImageUrl ? (
                    <div className="space-y-4">
                      <div className="aspect-video mx-auto max-w-xs overflow-hidden rounded-md">
                        <img
                          src={uploadedImageUrl}
                          alt="Uploaded image for puzzle creation"
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {uploadedFile?.name}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setUploadedFile(null);
                          setUploadedImageUrl(null);
                        }}
                      >
                        Change Image
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2 cursor-pointer">
                      <div className="mx-auto w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center">
                        <PuzzleIcon className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <p className="text-sm font-medium">
                        Drag and drop an image here or click to browse
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Supports all 11 formats: JPG, PNG, WebP, BMP, GIF, HEIC, JFIF, SVG, PDF, TIFF, ICO (max 10MB)
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Your image stays private - all processing happens in your browser
                      </p>
                    </div>
                  )}
                </div>

                {/* Error message */}
                {uploadError && (
                  <p className="text-sm text-red-500 mt-2">{uploadError}</p>
                )}
              </div>
            )}

            {/* Puzzle Configuration */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-center">Customize Your Puzzle</h2>
              <p className="text-sm text-muted-foreground text-center mb-4">
                Personalize your puzzle experience with these settings
              </p>

              <div className="space-y-2">
                <Label htmlFor="difficulty">Puzzle Difficulty</Label>
                <Select
                  value={config.difficulty}
                  onValueChange={(value: 'easy' | 'medium' | 'hard') =>
                    setConfig(prev => ({ ...prev, difficulty: value }))
                  }
                >
                  <SelectTrigger id="difficulty">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy - Perfect for beginners</SelectItem>
                    <SelectItem value="medium">Medium - Balanced challenge</SelectItem>
                    <SelectItem value="hard">Hard - For puzzle experts</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="grid">Puzzle Grid Size</Label>
                <Select
                  value={`${config.rows}x${config.columns}`}
                  onValueChange={(value) => {
                    const [rows, columns] = value.split('x').map(Number);
                    setConfig(prev => ({ ...prev, rows, columns }));
                  }}
                >
                  <SelectTrigger id="grid">
                    <SelectValue placeholder="Select grid size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2x2">2x2 (4 pieces) - Quick puzzles</SelectItem>
                    <SelectItem value="3x3">3x3 (9 pieces) - Classic size</SelectItem>
                    <SelectItem value="4x4">4x4 (16 pieces) - More challenging</SelectItem>
                    <SelectItem value="5x5">5x5 (25 pieces) - Advanced puzzles</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="interaction">Interaction Style</Label>
                <Select
                  value={interactionMode}
                  onValueChange={(value: 'drag' | 'click') => setInteractionMode(value)}
                >
                  <SelectTrigger id="interaction">
                    <SelectValue placeholder="Select interaction mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="drag">Drag and Drop - Move pieces freely</SelectItem>
                    <SelectItem value="click">Click to Swap - Select two pieces to exchange</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleCreatePuzzle}
                className="w-full"
                disabled={!uploadedImageUrl && !imageData}
              >
                Create Your Custom Puzzle
              </Button>

              <p className="text-xs text-center text-muted-foreground mt-2">
                After creating, you can play your puzzle, share it with friends, or download the completed image
              </p>
            </div>
          </div>
        )}

        {/* Show puzzle if created and not in config mode */}
        {puzzleCreated && !showConfig && (
          <>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setShowConfig(true)}>
                    Change Settings
                  </Button>
                  <Button variant="outline" onClick={handleReset}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reset Puzzle
                  </Button>
                </div>

                <div
                  ref={puzzleContainerRef}
                  className="relative border rounded-lg overflow-hidden"
                  style={{
                    height: '70vh',
                    cursor: isDragging ? 'grabbing' : 'default',
                    backgroundColor: '#f5f5f5'
                  }}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
                  {isPuzzleSolved && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                      <div className="bg-background p-6 rounded-lg text-center">
                        <Trophy className="h-12 w-12 mx-auto text-yellow-500 mb-2" />
                        <h3 className="text-xl font-bold mb-2">Puzzle Solved!</h3>
                        <p className="mb-4">Congratulations! You completed the puzzle.</p>
                        <div className="flex gap-2 justify-center">
                          <Button onClick={handleReset}>Play Again</Button>
                          <Button variant="outline" onClick={() => setDownloadDialogOpen(true)}>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                          <Button variant="outline" onClick={() => setShareDialogOpen(true)}>
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {puzzlePieces.map((piece) => (
                    <div
                      key={piece.id}
                      className={`absolute ${interactionMode === 'drag' ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'}`}
                      style={{
                        left: `${piece.x}px`,
                        top: `${piece.y}px`,
                        width: `${piece.width}px`,
                        height: `${piece.height}px`,
                        zIndex: activePiece === piece.id ? 10 : 1,
                        transition: isDragging && activePiece === piece.id ? 'none' : 'all 0.1s ease',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                        border: selectedPiece === piece.id ? '3px solid #1abc9c' : 'none'
                      }}
                      onMouseDown={(e) => handlePieceInteraction(e, piece.id)}
                    >
                      <img
                        src={piece.imageUrl}
                        alt={`Puzzle piece ${piece.id}`}
                        className="w-full h-full"
                        draggable={false}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Share Dialog */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Puzzle</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex flex-col gap-4">
              <Button variant="outline" className="flex justify-start" onClick={handleCopyLink}>
                <Copy className="h-4 w-4 mr-2" />
                Copy Link
              </Button>

              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="flex justify-start" onClick={() => handleShare('facebook')}>
                  <span className="mr-2"><FacebookIcon /></span>
                  Facebook
                </Button>
                <Button variant="outline" className="flex justify-start" onClick={() => handleShare('twitter')}>
                  <span className="mr-2"><TwitterIcon /></span>
                  Twitter
                </Button>
                <Button variant="outline" className="flex justify-start" onClick={() => handleShare('linkedin')}>
                  <span className="mr-2"><LinkedinIcon /></span>
                  LinkedIn
                </Button>
                <Button variant="outline" className="flex justify-start" onClick={() => handleShare('email')}>
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShareDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Download Dialog */}
      <Dialog open={downloadDialogOpen} onOpenChange={setDownloadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Download Puzzle</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="format">Select Format</Label>
              <Select
                value={downloadFormat}
                onValueChange={(value: 'jpg' | 'png' | 'webp') => setDownloadFormat(value)}
              >
                <SelectTrigger id="format">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="png">PNG (Best Quality)</SelectItem>
                  <SelectItem value="jpg">JPG (Smaller Size)</SelectItem>
                  <SelectItem value="webp">WebP (Modern Format)</SelectItem>
                </SelectContent>
              </Select>

              <p className="text-sm text-muted-foreground mt-2">
                {downloadFormat === 'png' && 'PNG provides the highest quality with lossless compression.'}
                {downloadFormat === 'jpg' && 'JPG offers smaller file sizes with good quality.'}
                {downloadFormat === 'webp' && 'WebP provides excellent quality with smaller file sizes than PNG or JPG.'}
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDownloadDialogOpen(false)} className="mr-2">
              Cancel
            </Button>
            <Button onClick={handleDownloadPuzzle} disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Download'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Puzzle;
