import { defineConfig } from 'vite';
import { resolve } from 'path';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    laravel({
      input: 'resources/js/app.tsx',
      refresh: true
    }),
    react()
  ],
  resolve: {
    alias: {
      '@/assets': resolve(__dirname, 'resources/assets'),
      '@/images': resolve(__dirname, 'resources/assets/images'),
      '@/fonts': resolve(__dirname, 'resources/assets/fonts')
    }
  }
});
