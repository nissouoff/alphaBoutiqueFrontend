import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: '.', // dossier racine de ton projet (où se trouve index.html)
  publicDir: 'public', // dossier des assets statiques
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist',   // dossier final
    emptyOutDir: true,
    sourcemap: false,
  },
  base: './', // permet au site de fonctionner correctement après déploiement
});
