import { sveltekit } from '@sveltejs/kit/vite';
import Icons from 'unplugin-icons/vite'
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    sveltekit(),
    Icons({
      compiler: "svelte"
    })
  ],
  server: {
    port: 5000,
    host: "0.0.0.0",
    allowedHosts: true,
    strictPort: true
  }
});
