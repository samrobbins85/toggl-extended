module.exports = {
	async rewrites() {
		return [
			{
				source: "/toggl/:slug*",
				destination: "https://api.track.toggl.com/:slug*", // Matched parameters can be used in the destination
			},
		];
	},
};
