import path from 'path';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  publicDir: false,
  build: {
    outDir: 'pkg-dist',
    lib: {
      entry: path.resolve(__dirname, 'src/lib/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => `solid-command-palette.${format}.js`,
    },
    rollupOptions: {
      external: ['solid-js', 'tinykeys', 'fuse.js'],
    },
  },
});
