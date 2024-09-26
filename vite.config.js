import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      // '@services': fileURLToPath(new URL('./src/services/', import.meta.url)),
      // '@store': fileURLToPath(new URL('./src/store/', import.meta.url)),
      // '@util': fileURLToPath(new URL('./src/util.js/', import.meta.url)),
    },
  },
});
