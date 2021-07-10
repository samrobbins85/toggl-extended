import useSWR from "swr";
import axios from "axios";
import { Duration } from "luxon";
import { useEffect } from "react";

function formatDuration(duration) {
	const length = Duration.fromObject({ milliseconds: duration });
	return length.toFormat("hh:mm:ss");
}
const fetcher = (url, start, end, clients, token, workspace) =>
	axios
		.get(`https://api.track.toggl.com${url}`, {
			params: {
				user_agent: "samrobbinsgb@gmail.com",
				workspace_id: workspace,
				since: start,
				until: end,
				client_ids: clients,
			},
			headers: {
				Authorization: `Basic ${token}`,
			},
		})
		.then((res) => res.data);

export default function HoursWorked({
	dates,
	clients,
	setTime,
	token,
	workspace,
}) {
	const formattedClients = clients.map((item) => item.value).toString();
	const { data } = useSWR(
		[
			"/reports/api/v2/details",
			dates.start,
			dates.end,
			formattedClients,
			token,
			workspace,
		],
		fetcher
	);
	useEffect(() => {
		if (data) {
			setTime(data.total_grand / (1000 * 60 * 60));
		}
	}, [data]);
	return (
		<div className="green-bg p-4 rounded text-center">
			<h1 className="text-2xl font-semibold">Duration</h1>
			{data && <p>{formatDuration(data.total_grand)}</p>}
		</div>
	);
}
