import { defineConfig } from 'astro/config';
import alpinejs from '@astrojs/alpinejs';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  adapter: vercel(),
  integrations: [
    alpinejs({ entrypoint: '/src/entrypoints/alpine.ts' }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
