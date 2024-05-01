import { defineConfig } from 'vite'
import mkcert from 'vite-plugin-mkcert';
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: true, // Enable HTTPS
    hmr: {
      overlay: true, // Disable the HMR overlay
    },
    open:true

  },
  build: {
    outDir: 'D:/laragon/www/popular',
    emptyOutDir: true,
  },
  plugins: [react(),mkcert()],
  consistentExport: true
})
