/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}', './public/**/*.{js,jsx,ts,tsx}'],
	darkMode: 'class', // Enables dark mode based on the 'dark' class on the html element
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
			},
			colors: {
				'red': {
					50: '#fef2f2',
					100: '#fee2e2',
					200: '#fecaca',
					300: '#fca5a5',
					400: '#f87171',
					500: '#ef4444',
					600: '#dc2626', // Primary Accent Color
					700: '#b91c1c',
					800: '#991b1b',
					900: '#7f1d1d',
					950: '#450a0a',
				},
			},
			container: {
				center: true,
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
};