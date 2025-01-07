import useSWR from "swr";
import axios from "axios";
import { useEffect } from "react";
import { ClockIcon } from "@heroicons/react/solid";

function formatDuration(duration) {
	let seconds = Math.floor(duration % 60);
	let minutes = Math.floor((duration / 60) % 60);
	let hours = Math.floor((duration / (60 * 60)) % 24);

	hours = hours < 10 ? `0${hours}` : hours;
	minutes = minutes < 10 ? `0${minutes}` : minutes;
	seconds = seconds < 10 ? `0${seconds}` : seconds;

	return `${hours}:${minutes}:${seconds}`;
}
const fetcher = (url, start, end, clients, token) =>
	axios
		.post(
			`/toggl${url}`,
			{
				start_date: start,
				end_date: end,
				client_ids: clients,
			},
			{
				headers: {
					Authorization: `Basic ${token}`,
				},
			}
		)
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
		`/reports/api/v3/workspace/${workspace}/projects/summary`,
		(url) =>
			fetcher(
				url,
				dates.start,
				dates.end,
				formattedClients,
				token,
				workspace
			)
	);
	const processedTime =
		data?.reduce((p, c) => p + c.tracked_seconds, 0) / (60 * 60);
	useEffect(() => {
		if (data) {
			setTime(
				data.reduce((p, c) => p + c.tracked_seconds, 0) / (60 * 60)
			);
		}
	}, [data]);
	console.log(data?.reduce((p, c) => p + c.tracked_seconds, 0) / (60 * 60));
	return (
		<div className="green-bg p-4 rounded">
			<h2 className="text-2xl font-semibold flex items-center text-radix-green11">
				<ClockIcon className="h-6 w-6 mr-2" />
				Hours Worked
			</h2>
			{data && (
				<>
					<p className="text-center text-3xl py-2">
						{processedTime.toFixed(2)} Hours
					</p>
					<p className="text-center text-3xl py-2">
						{formatDuration(
							data?.reduce((p, c) => p + c.tracked_seconds, 0)
						)}
					</p>
				</>
			)}
		</div>
	);
}
