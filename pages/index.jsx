/* eslint-disable jsx-a11y/label-has-associated-control */
import Head from "next/head";
import { useEffect, useState } from "react";
import Clients from "../components/Clients";
import DatePicker from "../components/DatePicker";
import HoursWorked from "../components/HoursWorked";
import Rate from "../components/Rate";
import Earnings from "../components/Earnings";
import Identity from "../components/Identity";

export default function IndexPage({ er }) {
	const end = new Date();
	end.setDate(end.getDate() + 7);
	const [token, setToken] = useState("");
	const [workspace, setWorkspace] = useState("");
	const [selectedClients, setSelectedClients] = useState([]);
	const [dates, setDates] = useState({
		start: new Date().toISOString().slice(0, 10),
		end: end.toISOString().slice(0, 10),
	});
	const [time, setTime] = useState(0);
	const [rate, setRate] = useState(0);
	const [currency, setCurrency] = useState("GBP");

	useEffect(() => {
		if (localStorage.getItem("token")) {
			setToken(localStorage.getItem("token"));
		}
		if (localStorage.getItem("workspace")) {
			setWorkspace(localStorage.getItem("workspace"));
		}
	}, []);

	useEffect(() => {
		if (token) {
			localStorage.setItem("token", token);
		}
	}, [token]);

	useEffect(() => {
		if (workspace) {
			localStorage.setItem("workspace", workspace);
		}
	}, [workspace]);

	return (
		<>
			<Head>
				<title>Toggl Extended</title>
				<meta
					name="Description"
					content="Work out how much you'll be paid"
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
				{token && workspace && (
					<Clients
						setClients={setSelectedClients}
						token={token}
						workspace={workspace}
					/>
				)}
				{!!selectedClients.length && (
					<>
						<DatePicker setter={setDates} />
						<HoursWorked
							dates={dates}
							clients={selectedClients}
							setTime={setTime}
							token={token}
							workspace={workspace}
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
		revalidate: 86400,
	};
}
