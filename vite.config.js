import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist', // GitHub Pages-friendly
    minify: false
  },
  server: {
    port: 4000,
  },
  base: '/collab-tardev/', //<-- Replace 'my-idle-game' with your actual repository name!
});