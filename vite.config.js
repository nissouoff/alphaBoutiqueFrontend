import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: '.', // racine = dossier où se trouve index.html
  publicDir: 'public',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: 'index.html', // <-- indique explicitement l’entry point
    },
  },
});
