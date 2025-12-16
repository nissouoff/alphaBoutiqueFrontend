import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // pratique pour les imports
    },
  },
  build: {
    outDir: 'dist',       // dossier de build final
    emptyOutDir: true,    // vide dist avant chaque build
    sourcemap: false,     // désactive les sourcemaps en prod
  },
  base: './', // pour que le site fonctionne correctement sur Render ou sous un sous-dossier
});
