import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			borderRadius: {
				DEFAULT: '10px',
				large: '20px'
			},
			colors: {
				'mn-pink': {
					1250: '#070307',
					1200: '#120811',
					1100: '#391336',
					1000: '#661960',
					900: '#7E1B76',
					800: '#9C1691',
					700: '#B31AA6',
					600: '#DF20CF',
					500: '#F042E1',
					400: '#F76EEC',
					300: '#FA9EF2',
					200: '#FCCFF9',
					100: '#FDE7FB',
					50: '#FDF1FC'
				},
				'mn-purple': {
					1250: '#040307',
					1200: '#0A0812',
					1100: '#1B1339',
					1000: '#2A1966',
					900: '#301B7E',
					800: '#33169C',
					700: '#3B1AB3',
					600: '#4920DF',
					500: '#6842F0',
					400: '#8B6EF7',
					300: '#B29EFA',
					200: '#D8CFFC',
					100: '#ECE7FD',
					50: '#F4F1FD'
				}
			},
			fontSize: {
				xxs: ['0.625rem', '1rem']
			},
			margin: {
				22: '5.5rem'
			},
			maxWidth: {
				20: '5rem'
			},

			width: {
				18: '4.5rem'
			}
		},
		fontFamily: {
			montserrat: ['Montserrat', ...defaultTheme.fontFamily.sans],
			audiowide: ['Audiowide', ...defaultTheme.fontFamily.mono]
		},
		screens: {
			xxs: '390px',
			xs: '420px',
			...defaultTheme.screens
		}
	},

	plugins: []
} satisfies Config;
