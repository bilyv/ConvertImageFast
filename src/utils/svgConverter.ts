/**
 * SVG Converter Utility
 *
 * This utility provides functions for converting images to SVG format
 * using the svg.js library.
 */

import { SVG } from '@svgdotjs/svg.js';

/**
 * Convert an image to SVG format
 *
 * This function takes an image and converts it to an SVG representation
 * using the svg.js library. The conversion is a basic representation
 * that embeds the original image in an SVG container.
 *
 * @param imageUrl URL of the image to convert
 * @param width Width of the image
 * @param height Height of the image
 * @returns Promise that resolves to an SVG string
 */
export const convertToSvg = async (
  imageUrl: string,
  width: number,
  height: number
): Promise<string> => {
  try {
    // Create a container div for SVG.js to work with
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.visibility = 'hidden';
    container.style.pointerEvents = 'none';
    document.body.appendChild(container);

    // Create an SVG document with the same dimensions as the image
    const draw = SVG().addTo(container).size(width, height);

    // Create a new image element to ensure the image is loaded
    const img = new Image();
    img.crossOrigin = "anonymous"; // Handle CORS issues

    // Wait for the image to load
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = (e) => reject(new Error(`Failed to load image: ${e}`));
      img.src = imageUrl;
    });

    // The image() method in svg.js doesn't accept width and height as separate parameters
    // Instead, we need to create the image and then set its size
    draw.image(imageUrl).size(width, height);

    // Get the SVG as a string using svg.js's svg() method
    const svgString = draw.svg();

    // Clean up the container
    document.body.removeChild(container);

    return svgString;
  } catch (error) {
    console.error('SVG conversion error:', error);
    throw new Error(`Failed to convert image to SVG: ${error}`);
  }
};

/**
 * Convert SVG string to a data URL
 *
 * @param svgString The SVG content as a string
 * @returns A data URL containing the SVG content
 */
export const svgToDataUrl = (svgString: string): string => {
  // Encode the SVG string as a data URL
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
};

/**
 * Check if a file is an SVG image
 *
 * @param file The file to check
 * @returns True if the file is an SVG image, false otherwise
 */
export const isSvgImage = (file: File): boolean => {
  return (
    file.type === 'image/svg+xml' ||
    file.name.toLowerCase().endsWith('.svg')
  );
};
