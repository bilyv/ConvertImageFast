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
 * Available puzzle piece shapes
 */
export type PuzzleShape = 'classic' | 'heart' | 'rounded' | 'zigzag' | 'cloud' | 'star';

/**
 * Interface for puzzle configuration
 */
export interface PuzzleConfig {
  rows: number;
  columns: number;
  difficulty: 'easy' | 'medium' | 'hard';
  shape: PuzzleShape;
}

/**
 * Default puzzle configuration
 */
export const DEFAULT_PUZZLE_CONFIG: PuzzleConfig = {
  rows: 3,
  columns: 3,
  difficulty: 'medium',
  shape: 'classic'
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

/**
 * Draw a heart shape on a canvas context
 *
 * @param ctx Canvas context to draw on
 * @param x X position
 * @param y Y position
 * @param width Width of the heart
 * @param height Height of the heart
 */
const drawHeartShape = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number
): void => {
  // Calculate dimensions for the heart shape

  ctx.beginPath();
  ctx.moveTo(x + width / 2, y + height);

  // Left side of the heart
  ctx.bezierCurveTo(
    x, y + height * 0.7, // Control point 1
    x, y + height * 0.4, // Control point 2
    x + width / 2, y     // End point
  );

  // Right side of the heart
  ctx.bezierCurveTo(
    x + width, y + height * 0.4, // Control point 1
    x + width, y + height * 0.7, // Control point 2
    x + width / 2, y + height    // End point
  );

  ctx.closePath();
};

/**
 * Draw a rounded shape on a canvas context
 *
 * @param ctx Canvas context to draw on
 * @param x X position
 * @param y Y position
 * @param width Width of the shape
 * @param height Height of the shape
 */
const drawRoundedShape = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number
): void => {
  const radius = Math.min(width, height) * 0.2;

  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
};

/**
 * Draw a zigzag shape on a canvas context
 *
 * @param ctx Canvas context to draw on
 * @param x X position
 * @param y Y position
 * @param width Width of the shape
 * @param height Height of the shape
 */
const drawZigzagShape = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number
): void => {
  const zigzagSize = Math.min(width, height) * 0.1;
  const steps = 8;

  ctx.beginPath();
  ctx.moveTo(x, y);

  // Top edge
  for (let i = 0; i < steps; i++) {
    const xPos = x + (width / steps) * i;
    const yPos = y + (i % 2 === 0 ? zigzagSize : 0);
    ctx.lineTo(xPos, yPos);
  }
  ctx.lineTo(x + width, y);

  // Right edge
  for (let i = 0; i < steps; i++) {
    const xPos = x + width - (i % 2 === 0 ? zigzagSize : 0);
    const yPos = y + (height / steps) * i;
    ctx.lineTo(xPos, yPos);
  }
  ctx.lineTo(x + width, y + height);

  // Bottom edge
  for (let i = 0; i < steps; i++) {
    const xPos = x + width - (width / steps) * i;
    const yPos = y + height - (i % 2 === 0 ? zigzagSize : 0);
    ctx.lineTo(xPos, yPos);
  }
  ctx.lineTo(x, y + height);

  // Left edge
  for (let i = 0; i < steps; i++) {
    const xPos = x + (i % 2 === 0 ? zigzagSize : 0);
    const yPos = y + height - (height / steps) * i;
    ctx.lineTo(xPos, yPos);
  }

  ctx.closePath();
};

/**
 * Draw a cloud shape on a canvas context
 *
 * @param ctx Canvas context to draw on
 * @param x X position
 * @param y Y position
 * @param width Width of the shape
 * @param height Height of the shape
 */
const drawCloudShape = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number
): void => {
  const bubbleRadius = Math.min(width, height) * 0.15;

  ctx.beginPath();

  // Bottom left corner
  ctx.moveTo(x + bubbleRadius, y + height);

  // Bottom edge with bubbles
  ctx.arc(x + width * 0.25, y + height - bubbleRadius, bubbleRadius, Math.PI / 2, Math.PI, false);
  ctx.arc(x + width * 0.5, y + height - bubbleRadius, bubbleRadius, Math.PI, 3 * Math.PI / 2, false);
  ctx.arc(x + width * 0.75, y + height - bubbleRadius, bubbleRadius, 3 * Math.PI / 2, 0, false);

  // Right edge with bubbles
  ctx.arc(x + width - bubbleRadius, y + height * 0.75, bubbleRadius, 0, Math.PI / 2, false);
  ctx.arc(x + width - bubbleRadius, y + height * 0.5, bubbleRadius, Math.PI / 2, Math.PI, false);
  ctx.arc(x + width - bubbleRadius, y + height * 0.25, bubbleRadius, Math.PI, 3 * Math.PI / 2, false);

  // Top edge with bubbles
  ctx.arc(x + width * 0.75, y + bubbleRadius, bubbleRadius, 3 * Math.PI / 2, 0, false);
  ctx.arc(x + width * 0.5, y + bubbleRadius, bubbleRadius, 0, Math.PI / 2, false);
  ctx.arc(x + width * 0.25, y + bubbleRadius, bubbleRadius, Math.PI / 2, Math.PI, false);

  // Left edge with bubbles
  ctx.arc(x + bubbleRadius, y + height * 0.25, bubbleRadius, Math.PI, 3 * Math.PI / 2, false);
  ctx.arc(x + bubbleRadius, y + height * 0.5, bubbleRadius, 3 * Math.PI / 2, 0, false);
  ctx.arc(x + bubbleRadius, y + height * 0.75, bubbleRadius, 0, Math.PI / 2, false);

  ctx.closePath();
};

/**
 * Draw a star shape on a canvas context
 *
 * @param ctx Canvas context to draw on
 * @param x X position
 * @param y Y position
 * @param width Width of the shape
 * @param height Height of the shape
 */
const drawStarShape = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number
): void => {
  const centerX = x + width / 2;
  const centerY = y + height / 2;
  const outerRadius = Math.min(width, height) / 2;
  const innerRadius = outerRadius * 0.4;
  const spikes = 5;

  ctx.beginPath();
  ctx.moveTo(centerX, y);

  for (let i = 0; i < spikes * 2; i++) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = (Math.PI * i) / spikes;
    const pointX = centerX + radius * Math.sin(angle);
    const pointY = centerY - radius * Math.cos(angle);
    ctx.lineTo(pointX, pointY);
  }

  ctx.closePath();
};

/**
 * Draw a shape on a canvas context based on the selected shape type
 *
 * @param ctx Canvas context to draw on
 * @param x X position
 * @param y Y position
 * @param width Width of the shape
 * @param height Height of the shape
 * @param shape Shape type to draw
 */
const drawShape = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  shape: PuzzleShape
): void => {
  switch (shape) {
    case 'heart':
      drawHeartShape(ctx, x, y, width, height);
      break;
    case 'rounded':
      drawRoundedShape(ctx, x, y, width, height);
      break;
    case 'zigzag':
      drawZigzagShape(ctx, x, y, width, height);
      break;
    case 'cloud':
      drawCloudShape(ctx, x, y, width, height);
      break;
    case 'star':
      drawStarShape(ctx, x, y, width, height);
      break;
    case 'classic':
    default:
      // Classic rectangular shape
      ctx.rect(x, y, width, height);
      break;
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

            // Save the context state
            pieceCtx.save();

            // Create a clipping path for the piece shape
            pieceCtx.beginPath();
            drawShape(pieceCtx, 0, 0, pieceWidth, pieceHeight, config.shape);
            pieceCtx.clip();

            // Draw the piece from the original image
            pieceCtx.drawImage(
              img,
              col * pieceWidth, row * pieceHeight, pieceWidth, pieceHeight,
              0, 0, pieceWidth, pieceHeight
            );

            // Restore the context state
            pieceCtx.restore();

            // Draw a border around the piece
            pieceCtx.beginPath();
            drawShape(pieceCtx, 0, 0, pieceWidth, pieceHeight, config.shape);
            pieceCtx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            pieceCtx.lineWidth = 2;
            pieceCtx.stroke();

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
