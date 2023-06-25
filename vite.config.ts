/// <reference types="vitest" />

import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    target: 'esnext',
  },
  test: {
    environment: 'happy-dom',
    clearMocks: true,
  },
  server: {
    port: 3000,
  },
});
