import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://lamp.delivery',
  output: 'server',
  adapter: cloudflare({
    mode: 'directory'
  }),
  server: {
    host: true,
    port: 4321
  },
  vite: {
    server: {
      watch: {
        ignored: [
          '**/node_modules/**',
          '**/.git/**',
          '**/.opencode/**',
          '**/.wrangler/**',
          '**/.astro/**',
          '**/dist/**',
          '**/.idea/**',
          '**/downloads/**'
        ]
      }
    }
  }
});