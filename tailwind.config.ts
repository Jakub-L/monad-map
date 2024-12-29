import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		fontFamily: {
			montserrat: ['Montserrat', ...defaultTheme.fontFamily.sans],
			nova: ['NovaSquare', ...defaultTheme.fontFamily.mono]
		}
	},

	plugins: []
} satisfies Config;
