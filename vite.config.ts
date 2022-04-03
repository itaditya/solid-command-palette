/// <reference types="vitest" />

import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  resolve: {
    conditions: ['development', 'browser'],
  },
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
  },
  test: {
    environment: 'happy-dom',
    clearMocks: true,
    transformMode: {
      web: [/\.[jt]sx$/],
    },
    deps: {
      inline: [/solid-js/],
    },
  },
});
