/// <reference types="vitest" />

import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [solidPlugin(), visualizer()],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
  },
  test: {
    environment: 'happy-dom',
    clearMocks: true,
  },
});
