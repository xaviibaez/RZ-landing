import { defineConfig } from 'astro/config';
import alpinejs from '@astrojs/alpinejs';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.rzpowerhouse.com',
  output: 'static',
  adapter: vercel(),
  integrations: [
    alpinejs({ entrypoint: '/src/entrypoints/alpine.ts' }),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
