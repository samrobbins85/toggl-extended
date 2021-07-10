/* eslint-disable jsx-a11y/label-has-associated-control */
import Head from "next/head";
import useSWR from "swr";
import { useState } from "react";
import axios from "axios";
import Clients from "../components/Clients";
import DatePicker from "../components/DatePicker";
import HoursWorked from "../components/HoursWorked";

const fetcher = (url) =>
	axios
		.get(`https://api.track.toggl.com${url}`, {
			params: {
				user_agent: "samrobbinsgb@gmail.com",
				workspace_id: "3087200",
			},
			headers: {
				Authorization: `Basic ${process.env.NEXT_PUBLIC_TOGGL_KEY}`,
			},
		})
		.then((res) => res.data);

export default function IndexPage() {
	const end = new Date();
	end.setDate(end.getDate() + 7);
	const { data: clients } = useSWR("/api/v8/clients", fetcher);
	const [selectedClients, setSelectedClients] = useState([]);
	const [dates, setDates] = useState({
		start: new Date().toISOString().slice(0, 10),
		end: end.toISOString().slice(0, 10),
	});

	return (
		<>
			<Head>
				<title>Next.js Template</title>
				<meta
					name="Description"
					content="My template Next.js application"
				/>
			</Head>
			<div className="pt-6 px-2">
				<h1 className="text-center text-4xl font-semibold">
					Toggl Extended
				</h1>{" "}
			</div>
			<div className="max-w-md mx-auto py-4 grid gap-y-4">
				{clients && (
					<Clients
						clientList={clients}
						setClients={setSelectedClients}
					/>
				)}
				{!!selectedClients.length && (
					<>
						<DatePicker setter={setDates} />
						<HoursWorked dates={dates} clients={selectedClients} />
					</>
				)}
			</div>
		</>
	);
}

export async function getStaticProps() {
	const er = await fetch(
		"https://api.sandbox.transferwise.tech/v1/rates?target=GBP",
		{
			headers: {
				Authorization: `Bearer ${process.env.TRANSFERWISE_KEY}`,
			},
		}
	).then((res) => res.json());

	return {
		props: {
			er,
		},
	};
}
