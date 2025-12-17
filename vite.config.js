import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: '.', // racine = le dossier racine du repo
  publicDir: 'public', // ton dossier public avec css/js/html
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 5173,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // backend local
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: 'dist', // build final
    emptyOutDir: true,
    sourcemap: false,
  },
});
