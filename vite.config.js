import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  base: '/svelte_portfolio_webpage/',
  build: {
    outDir: 'docs', // Changes output from 'dist' to 'docs'
  }
})
