/**
 * Script to copy redirect files to the dist folder
 * This ensures that client-side routing works correctly in production
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const publicDir = path.join(__dirname, '../public');
const distDir = path.join(__dirname, '../dist');

// Files to copy
const filesToCopy = [
  '_redirects',
  'web.config',
  '.htaccess'
];

// Ensure the dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy each file if it exists
filesToCopy.forEach(file => {
  const sourcePath = path.join(publicDir, file);
  const destPath = path.join(distDir, file);
  
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, destPath);
    console.log(`✅ ${file} copied to dist folder`);
  } else {
    console.log(`⚠️ ${file} not found in public folder`);
  }
});

console.log('✅ All redirect files processed');
