/**
 * Puzzle Creator Utility
 *
 * This utility provides functions for creating puzzle games from images.
 * It supports JPEG, PNG, GIF, and HEIC formats.
 *
 * It also provides functions for sharing puzzles via URL-based sharing.
 */

/**
 * Interface for puzzle piece
 */
export interface PuzzlePiece {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  correctX: number;
  correctY: number;
  imageUrl: string;
}

/**
 * Interface for puzzle configuration
 */
export interface PuzzleConfig {
  rows: number;
  columns: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

/**
 * Default puzzle configuration
 */
export const DEFAULT_PUZZLE_CONFIG: PuzzleConfig = {
  rows: 3,
  columns: 3,
  difficulty: 'medium'
};

/**
 * Check if the image format is supported for puzzle creation
 *
 * @param fileTypeOrName The MIME type or filename to check
 * @returns True if the format is supported, false otherwise
 */
export const isPuzzleSupportedFormat = (fileTypeOrName: string): boolean => {
  const lowerCaseInput = fileTypeOrName.toLowerCase();

  // Check MIME types
  const supportedTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/heic',
    'image/heif',
    'image/jfif'
  ];

  if (supportedTypes.includes(lowerCaseInput)) {
    return true;
  }

  // Check file extensions
  return (
    lowerCaseInput.endsWith('.jpg') ||
    lowerCaseInput.endsWith('.jpeg') ||
    lowerCaseInput.endsWith('.png') ||
    lowerCaseInput.endsWith('.gif') ||
    lowerCaseInput.endsWith('.heic') ||
    lowerCaseInput.endsWith('.heif') ||
    lowerCaseInput.includes('_heic') ||
    lowerCaseInput.includes('.heic') ||
    lowerCaseInput.endsWith('.jfif') ||
    lowerCaseInput.includes('jfif')
  );
};

/**
 * Create puzzle pieces from an image
 *
 * @param imageUrl URL of the image to convert to puzzle
 * @param config Puzzle configuration (rows, columns, difficulty)
 * @returns Promise that resolves to an array of puzzle pieces
 */
/**
 * Interface for shareable puzzle data
 */
export interface ShareablePuzzleData {
  config: PuzzleConfig;
  pieces: {
    id: number;
    x: number;
    y: number;
    correctX: number;
    correctY: number;
    width: number;
    height: number;
    imageUrl: string;
  }[];
  mode: 'drag' | 'click';
  timestamp: number;
}

/**
 * Create a shareable puzzle configuration
 *
 * @param pieces Array of puzzle pieces
 * @param config Puzzle configuration
 * @param mode Interaction mode (drag or click)
 * @returns Base64 encoded string of the puzzle configuration
 */
export const createShareablePuzzleData = (
  pieces: PuzzlePiece[],
  config: PuzzleConfig,
  mode: 'drag' | 'click'
): string => {
  // Create a shareable data object
  const shareableData: ShareablePuzzleData = {
    config,
    pieces: pieces.map(piece => ({
      id: piece.id,
      x: piece.x,
      y: piece.y,
      correctX: piece.correctX,
      correctY: piece.correctY,
      width: piece.width,
      height: piece.height,
      imageUrl: piece.imageUrl
    })),
    mode,
    timestamp: new Date().getTime()
  };

  // Convert to JSON and encode as Base64
  const jsonString = JSON.stringify(shareableData);
  return btoa(jsonString);
};

/**
 * Parse a shareable puzzle configuration
 *
 * @param encodedData Base64 encoded string of the puzzle configuration
 * @returns Decoded puzzle data or null if invalid
 */
export const parseShareablePuzzleData = (encodedData: string): ShareablePuzzleData | null => {
  try {
    // Decode Base64 string
    const jsonString = atob(encodedData);

    // Parse JSON
    const puzzleData = JSON.parse(jsonString) as ShareablePuzzleData;

    // Validate the data structure
    if (!puzzleData.config || !puzzleData.pieces || !puzzleData.mode) {
      return null;
    }

    return puzzleData;
  } catch (error) {
    console.error('Error parsing shareable puzzle data:', error);
    return null;
  }
};

export const createPuzzlePieces = async (
  imageUrl: string,
  config: PuzzleConfig = DEFAULT_PUZZLE_CONFIG
): Promise<PuzzlePiece[]> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // Handle CORS issues

    img.onload = () => {
      try {
        // Create pieces based on the configuration
        const pieces: PuzzlePiece[] = [];
        const pieceWidth = img.width / config.columns;
        const pieceHeight = img.height / config.rows;

        // Create a canvas for the whole image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error("Failed to create canvas context"));
          return;
        }

        // For each piece position, create a separate canvas and draw the piece
        for (let row = 0; row < config.rows; row++) {
          for (let col = 0; col < config.columns; col++) {
            // Create a canvas for this piece
            const pieceCanvas = document.createElement('canvas');
            pieceCanvas.width = pieceWidth;
            pieceCanvas.height = pieceHeight;
            const pieceCtx = pieceCanvas.getContext('2d');

            if (!pieceCtx) {
              reject(new Error("Failed to create piece canvas context"));
              return;
            }

            // Draw the piece from the original image
            pieceCtx.drawImage(
              img,
              col * pieceWidth, row * pieceHeight, pieceWidth, pieceHeight,
              0, 0, pieceWidth, pieceHeight
            );

            // Convert the piece to a data URL
            const pieceUrl = pieceCanvas.toDataURL('image/png');

            // Calculate initial position (random for medium/hard difficulty)
            let initialX = col * pieceWidth;
            let initialY = row * pieceHeight;

            if (config.difficulty !== 'easy') {
              // For medium and hard difficulties, randomize the initial positions
              initialX = Math.random() * (img.width - pieceWidth);
              initialY = Math.random() * (img.height - pieceHeight);
            }

            // Add the piece to the array
            pieces.push({
              id: row * config.columns + col,
              x: initialX,
              y: initialY,
              width: pieceWidth,
              height: pieceHeight,
              correctX: col * pieceWidth,
              correctY: row * pieceHeight,
              imageUrl: pieceUrl
            });
          }
        }

        resolve(pieces);
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = (error) => {
      reject(new Error(`Failed to load image: ${error}`));
    };

    img.src = imageUrl;
  });
};
