// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host:"0.0.0.0",
    port:5173,
    proxy: {
      
      // Proxy '/numbers' to the backend running at 'http://localhost:3000'
      '/numbers': {
        target: 'http://localhost:3000',
        changeOrigin: true,  // Ensure the correct origin is used for the backend
        secure: false,       // Disable SSL certificate verification (if needed)
        rewrite: (path) => path.replace(/^\/numbers/, '')  // Optional: remove '/numbers' from the URL path
      },
      // Proxy '/Punctuation' to the backend running at 'http://localhost:3000'
      '/Punctuation': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/Punctuation/, '')
      }
    },
    // Enable CORS if needed for development purposes
    cors: true
  }
});
