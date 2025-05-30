import { defineConfig } from 'vite';
import react from "@vitejs/plugin-react";

const repository = "collab-tardev";
const isProduction = process.env.NODE_ENV === 'production';

const base = isProduction ? `/${repository}/` : "";

export default defineConfig({
  build: {
    outDir: 'dist', // GitHub Pages-friendly
    minify: false
  },
  server: {
    port: 4000,
  },
  base: base,
  plugins: [react()]
});