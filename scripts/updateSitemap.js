/**
 * Script to update the sitemap.xml file with current dates
 * Run this script after making significant changes to the website
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { DOMParser, XMLSerializer } from '@xmldom/xmldom';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the sitemap file
const sitemapPath = path.join(__dirname, '../public/sitemap.xml');

// Get current date in YYYY-MM-DD format
const getCurrentDate = () => {
  const date = new Date();
  return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD
};

// Update the sitemap.xml file
const updateSitemap = () => {
  try {
    // Read the sitemap file
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');

    // Parse the XML
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(sitemapContent, 'text/xml');

    // Get all URL elements
    const urls = xmlDoc.getElementsByTagName('url');
    const currentDate = getCurrentDate();

    // Update lastmod for each URL
    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      const lastmodElements = url.getElementsByTagName('lastmod');

      if (lastmodElements.length > 0) {
        // Update existing lastmod element
        lastmodElements[0].textContent = currentDate;
      } else {
        // Create new lastmod element if it doesn't exist
        const lastmodElement = xmlDoc.createElement('lastmod');
        lastmodElement.textContent = currentDate;

        // Insert after loc element
        const locElement = url.getElementsByTagName('loc')[0];
        if (locElement && locElement.nextSibling) {
          url.insertBefore(lastmodElement, locElement.nextSibling);
        } else {
          url.appendChild(lastmodElement);
        }
      }
    }

    // Serialize the XML back to string
    const serializer = new XMLSerializer();
    const updatedContent = serializer.serializeToString(xmlDoc);

    // Write the updated content back to the file
    fs.writeFileSync(sitemapPath, updatedContent, 'utf8');

    console.log('Sitemap updated successfully with current date:', currentDate);
  } catch (error) {
    console.error('Error updating sitemap:', error);
  }
};

// Run the update function
updateSitemap();

// Export the function for potential programmatic use
export default updateSitemap;
