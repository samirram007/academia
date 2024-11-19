import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import compression from 'vite-plugin-compression';
import mkcert from 'vite-plugin-mkcert';
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: true, // Enable HTTPS
    hmr: {
      overlay: true, // Disable the HMR overlay
    },
    open:true

  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'D:/laragon/www/popular',
    emptyOutDir: true,
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // Create a separate vendor chunk
          }
        },
      },
    },
  },
  plugins: [react(), mkcert(),
  compression({
    algorithm: 'gzip', // Specify the compression algorithm
    ext: '.gz', // File extension for compressed files
    threshold: 1024, // Minimum size in bytes for files to be compressed
  }),
  visualizer({
    filename: './stats.html', // Output file for the visualizer report
    open: true, // Automatically open the visualizer report in the browser
  })],
  consistentExport: true
})
