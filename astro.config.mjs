import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
	// GitHub Pages deployment settings
	site: 'https://tommy0485.github.io',
	base: '/hove-academic-site/',
	// Ensure static output
	output: 'static',
	integrations: [
		tailwind({
			// Apply base styles only once
			applyBaseStyles: false,
		}),
		react(),
		mdx(),
	],
});