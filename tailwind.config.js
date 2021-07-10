/* eslint-disable global-require */
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
	mode: "jit",
	purge: [
		"./components/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter var", ...defaultTheme.fontFamily.sans],
			},
			colors: {
				orange: colors.orange,
			},
		},
	},
	variants: {},
	plugins: [
		require("@tailwindcss/forms"),
		require("radix-colors-for-tailwind")({
			colors: ["red", "orange", "yellow", "green", "blue", "purple"],
		}),
	],
};
