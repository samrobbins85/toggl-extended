/* eslint-disable jsx-a11y/label-has-associated-control */
import Head from "next/head";
import useSWR from "swr";
import { useState } from "react";
import axios from "axios";
import Clients from "../components/Clients";
import DatePicker from "../components/DatePicker";
import HoursWorked from "../components/HoursWorked";
import Rate from "../components/Rate";
import Earnings from "../components/Earnings";
import Identity from "../components/Identity";

const fetcher = (url, token, workspace) =>
	axios
		.get(`https://api.track.toggl.com${url}`, {
			params: {
				user_agent: "samrobbinsgb@gmail.com",
				workspace_id: workspace,
			},
			headers: {
				Authorization: `Basic ${token}`,
			},
		})
		.then((res) => res.data);

export default function IndexPage({ er }) {
	const end = new Date();
	end.setDate(end.getDate() + 7);
	const [token, setToken] = useState("");
	const [workspace, setWorkspace] = useState("");
	const { data: clients } = useSWR(
		token && workspace ? ["/api/v8/clients", token, workspace] : null,
		fetcher
	);
	const [selectedClients, setSelectedClients] = useState([]);
	const [dates, setDates] = useState({
		start: new Date().toISOString().slice(0, 10),
		end: end.toISOString().slice(0, 10),
	});
	const [time, setTime] = useState(0);
	const [rate, setRate] = useState(0);
	const [currency, setCurrency] = useState("GBP");

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
				<Identity
					setToken={setToken}
					token={token}
					setWorkspace={setWorkspace}
				/>
				{clients && (
					<Clients
						clientList={clients}
						setClients={setSelectedClients}
					/>
				)}
				{!!selectedClients.length && (
					<>
						<DatePicker setter={setDates} />
						<HoursWorked
							dates={dates}
							clients={selectedClients}
							setTime={setTime}
						/>
						<Rate
							setRate={setRate}
							setCurrency={setCurrency}
							er={er}
						/>
					</>
				)}
				{rate !== 0 && (
					<Earnings
						er={er}
						currency={currency}
						time={time}
						rate={rate}
					/>
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
