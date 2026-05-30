import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  site: 'https://lamp.delivery',
  output: 'server',
  adapter: vercel(),
  server: {
    host: true,
    port: 4321
  }
});