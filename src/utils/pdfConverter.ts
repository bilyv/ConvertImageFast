/**
 * PDF Converter Utility
 * 
 * This utility provides functions for converting images to PDF format
 * using the pdf.js library.
 */

import * as pdfjsLib from 'pdfjs-dist';

// Set the worker source for pdf.js
// This is required for pdf.js to work properly
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

/**
 * Convert an image to PDF format
 * 
 * This function takes an image and converts it to a PDF document
 * using the pdf.js library.
 * 
 * @param imageUrl URL of the image to convert
 * @param width Width of the image
 * @param height Height of the image
 * @returns Promise that resolves to a PDF data URL
 */
export const convertToPdf = async (
  imageUrl: string,
  width: number,
  height: number
): Promise<string> => {
  try {
    // Create a new image element to ensure the image is loaded
    const img = new Image();
    img.crossOrigin = "anonymous"; // Handle CORS issues
    
    // Wait for the image to load
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = (e) => reject(new Error(`Failed to load image: ${e}`));
      img.src = imageUrl;
    });

    // Create a canvas to draw the image
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    
    // Get the canvas context and draw the image
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Failed to get canvas context');
    ctx.drawImage(img, 0, 0, width, height);
    
    // Get the image data as a data URL
    const imageData = canvas.toDataURL('image/png');
    
    // Create a new jsPDF instance
    // Since we don't have jsPDF directly, we'll use a more basic approach
    // with pdf.js to create a simple PDF with the image embedded
    
    // Create a PDF document with the image dimensions
    // We'll use a simple approach to embed the image in a PDF
    // This is a basic implementation and could be enhanced with more features
    
    // Convert the image to a Uint8Array for PDF embedding
    const response = await fetch(imageData);
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    
    // Create a simple PDF structure with the image embedded
    // This is a very basic PDF structure
    const pdfHeader = '%PDF-1.7\n';
    const pdfFooter = '%%EOF\n';
    
    // Create a simple object stream with the image data
    const imageObj = `
1 0 obj
<<
  /Type /XObject
  /Subtype /Image
  /Width ${width}
  /Height ${height}
  /ColorSpace /DeviceRGB
  /BitsPerComponent 8
  /Filter /DCTDecode
  /Length ${uint8Array.length}
>>
stream
${uint8Array}
endstream
endobj
`;

    // Create a page object that references the image
    const pageObj = `
2 0 obj
<<
  /Type /Page
  /Parent 3 0 R
  /Resources <<
    /XObject << /Im1 1 0 R >>
  >>
  /MediaBox [0 0 ${width} ${height}]
  /Contents 4 0 R
>>
endobj
`;

    // Create a pages object
    const pagesObj = `
3 0 obj
<<
  /Type /Pages
  /Count 1
  /Kids [2 0 R]
>>
endobj
`;

    // Create a content stream that places the image on the page
    const contentObj = `
4 0 obj
<<
  /Length 58
>>
stream
q
${width} 0 0 ${height} 0 0 cm
/Im1 Do
Q
endstream
endobj
`;

    // Create a catalog object
    const catalogObj = `
5 0 obj
<<
  /Type /Catalog
  /Pages 3 0 R
>>
endobj
`;

    // Combine all objects into a PDF
    const pdfContent = pdfHeader + imageObj + pageObj + pagesObj + contentObj + catalogObj + pdfFooter;
    
    // Convert the PDF content to a data URL
    const pdfBlob = new Blob([pdfContent], { type: 'application/pdf' });
    const pdfUrl = URL.createObjectURL(pdfBlob);
    
    return pdfUrl;
  } catch (error) {
    console.error('PDF conversion error:', error);
    throw new Error(`Failed to convert image to PDF: ${error}`);
  }
};

/**
 * Check if a file is a PDF document
 * 
 * @param file The file to check
 * @returns True if the file is a PDF document, false otherwise
 */
export const isPdfDocument = (file: File): boolean => {
  return (
    file.type === 'application/pdf' ||
    file.name.toLowerCase().endsWith('.pdf')
  );
};
