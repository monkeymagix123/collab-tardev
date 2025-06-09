import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue'; // If you're using Vue

const repository = 'collab-tardev';
const isProduction = process.env.NODE_ENV === 'production';

const base = isProduction ? `/${repository}/` : '';

export default defineConfig({
	build: {
		outDir: 'dist', // GitHub Pages-friendly
		minify: false,
	},
	server: {
		port: 3000,
	},
	base: base,

	plugins: [vue()],
	resolve: {
		alias: {
			vue: 'vue/dist/vue.esm-bundler.js',
		},
	},
});
