import useSWR from "swr";
import axios from "axios";

const fetcher = (url, options) => {
	const pOptions = JSON.parse(options);
	return axios
		.get(`https://api.track.toggl.com${url}`, {
			params: {
				...pOptions.params,
				workspace_id: "3087200",
			},
			headers: {
				Authorization: `Basic ${pOptions.key}`,
			},
		})
		.then((res) => res.data);
};

export default function About() {
	const { data, error } = useSWR(
		[
			"/api/v8/clients",
			JSON.stringify({
				key: process.env.NEXT_PUBLIC_TOGGL_KEY,
				params: { user_agent: "samrobbinsgb@gmail.com" },
			}),
		],
		fetcher
	);
	console.log(data);
	return (
		<div>
			<h1>Hello, world</h1>
		</div>
	);
}
