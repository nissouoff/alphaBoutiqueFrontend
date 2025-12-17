import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: 'src', // Racine du projet à src/
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: '../dist', // build sort dans dist à la racine
    emptyOutDir: true,
    sourcemap: false,
  },
  base: './',
});
