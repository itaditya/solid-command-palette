import path from 'path';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    outDir: 'pkg-dist',
    lib: {
      entry: path.resolve(__dirname, 'src/lib/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => `solid-command-palette.${format}.js`,
    },
    rollupOptions: {
      external: ['solid-js'],
    },
  },
});
