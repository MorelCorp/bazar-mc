import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    target: '#svelte',
    vite: {
      ssr: {
        noExternal: ['svelte-persisted-store'],
      },
    },
  },
  preprocess: preprocess(),
};

export default config;
