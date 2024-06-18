import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [sveltekit(), purgeCss()],
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, '../../shared'),
    },
  },
  ssr: {
    noExternal: ['@skeletonlabs/skeleton'],
  },
  server: {
    fs: {
      allow: ['../../shared'],
    },
  },
});
