import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: 'src',        // Vite regarde dans src/ pour index.html
  publicDir: '../public', // dossier public à copier dans build
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: '../dist', // build final à la racine
    emptyOutDir: true,
    rollupOptions: {
      input: 'src/index.html', // explicitement l’entrée
    },
  },
});
