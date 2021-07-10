/* eslint-disable jsx-a11y/label-has-associated-control */
import Head from "next/head";
import useSWR from "swr";
// Looking to get rid of this once the temporal proposal is out
import { Duration } from "luxon";
import { ClockIcon } from "@heroicons/react/outline";
import { useState } from "react";
import Select from "react-select";

function formatDuration(duration) {
	const length = Duration.fromObject({ milliseconds: duration });
	return length.toFormat("hh:mm:ss");
}

export default function IndexPage({ er }) {
	const { data, error } = useSWR("/reports/api/v2/details");
	const [rate, setRate] = useState(0);
	const [currency, setCurrency] = useState("USD");
	const erSort = er.sort((a, b) => a.source.localeCompare(b.source));

	const options = erSort.map((item) => {
		const myObj = {};
		myObj.value = item.source;
		myObj.label = item.source;
		return myObj;
	});
	console.log(options);
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
				</h1>
				{error && <h2>There was an error in fetching the data</h2>}
				{data && (
					<div className="grid max-w-lg mx-auto pt-4 gap-y-6">
						<div className="bg-green-100 rounded p-4 text-green-900">
							<h2 className="text-xl text-center">
								Total time worked
							</h2>
							<div className="text-2xl text-center flex items-center justify-center ">
								<ClockIcon className="h-6 w-6 mr-2" />
								<p>{formatDuration(data.total_grand)}</p>
							</div>
						</div>
						<div className="bg-gray-100 p-4">
							<div>
								<h2 className="text-2xl font-semibold">
									Hourly rate
								</h2>
								<p className="text-gray-700">
									How much you make per hour, and the currency
								</p>
							</div>
							<form className="flex gap-x-4 items-center">
								<input
									type="number"
									onChange={(input) =>
										setRate(input.target.value)
									}
								/>
								<Select
									defaultValue={{
										value: "USD",
										label: "USD",
									}}
									className="w-40"
									options={options}
									onChange={(changes) =>
										setCurrency(changes.value)
									}
								/>
							</form>
						</div>
						<div className="bg-gray-100 p-4 text-center">
							<h3 className="text-xl">Pay in {currency}</h3>
							<p className="text-2xl">
								{(
									(data.total_grand * rate) /
									(1000 * 60 * 60)
								).toFixed(2)}
							</p>
						</div>

						<div className="bg-gray-100 p-4 text-center">
							<h3 className="text-xl">Pay in GBP</h3>
							<p className="text-2xl">
								{(
									(er.filter(
										(item) => item.source === currency
									)[0].rate *
										(data.total_grand * rate)) /
									(1000 * 60 * 60)
								).toFixed(2)}
							</p>
						</div>
					</div>
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
		}, // will be passed to the page component as props
	};
}
