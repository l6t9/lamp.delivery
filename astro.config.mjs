import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://lamp.delivery',
  output: 'server',
  adapter: cloudflare({
    // keep default configuration; adjust imageService if needed
  }),
  server: {
    host: true,
    port: 4321
  }
});