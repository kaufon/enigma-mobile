import gluestackPlugin from "@gluestack-ui/nativewind-utils/tailwind-plugin";

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: ["./src/**/*.{tsx,ts,jsx,js}"],
	presets: [require("nativewind/preset")],
	safelist: [
		{
			pattern:
				/(bg|border|text|stroke|fill)-(primary|brand|danger|warning|info|background|surface|neutral|accent)-(0|50|100|200|300|400|500|600|700|800|900|950)/,
		},
	],
	theme: {
		extend: {
			colors: {
				primary: {
					500: "#599BFF",
				},
				brand: {
					500: "#175DDC",
				},
				danger: {
					500: "#F25C5C",
				},
				warning: {
					500: "#FDCB6E",
				},
				info: {
					500: "#8BE9FD",
				},
				background: {
					500: "#202632",
				},
				surface: {
					500: "#292E33",
				},
				neutral: {
					500: "#A9AFB7",
				},
				accent: {
					500: "#EBEFF3",
				},
				secondary: {
					50: "rgb(var(--color-secondary-50)/<alpha-value>)",
					500: "rgb(var(--color-secondary-500)/<alpha-value>)",
				},
			},
			fontFamily: {
				heading: undefined,
				body: undefined,
				mono: undefined,
				roboto: ["Roboto", "sans-serif"],
			},
		},
	},
	plugins: [gluestackPlugin],
};
