import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  base: '/portfolio/',
  build: {
    outDir: 'docs', // Changes output from 'dist' to 'docs'
  },
  server: {
    watch: {
      usePolling: true,
    }
  },
})
