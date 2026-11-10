import { defineConfig } from 'vite';

// base './' permite servir o build de dentro do Capacitor (file/capacitor://).
export default defineConfig({
  base: './',
  server: { host: true },
  build: { target: 'es2020', chunkSizeWarningLimit: 1200 },
});
