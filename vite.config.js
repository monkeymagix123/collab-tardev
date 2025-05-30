import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist', // GitHub Pages-friendly
    minify: false
  },
  server: {
    port: 4000,
  }
});