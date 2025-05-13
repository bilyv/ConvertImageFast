import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    {
      name: 'copy-redirects',
      closeBundle() {
        // Ensure the dist directory exists
        if (!fs.existsSync('dist')) {
          fs.mkdirSync('dist');
        }

        // Copy _redirects file to the dist folder
        if (fs.existsSync('public/_redirects')) {
          fs.copyFileSync('public/_redirects', 'dist/_redirects');
          console.log('✅ _redirects file copied to dist folder');
        }
      }
    }
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
