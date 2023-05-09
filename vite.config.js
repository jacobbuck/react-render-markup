import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      formats: ['cjs', 'es'],
    },
    rollupOptions: {
      external: [
        'css-to-style',
        'dom-parse',
        'prop-types',
        'react',
        'tiny-invariant',
      ],
    },
    sourcemap: true,
  },
  plugins: [react()],
});
