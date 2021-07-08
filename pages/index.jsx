/* eslint-disable jsx-a11y/label-has-associated-control */
import Head from "next/head";
import useSWR from "swr";
// Looking to get rid of this once the temporal proposal is out
import { Duration } from "luxon";
import { ClockIcon } from "@heroicons/react/outline";
import { useState } from "react";

function formatDuration(duration) {
	const length = Duration.fromObject({ milliseconds: duration });
	return length.toFormat("hh:mm:ss");
}

export default function IndexPage({ er }) {
	const { data, error } = useSWR("/reports/api/v2/details");
	const [rate, setRate] = useState(0);
	// console.log(data);
	// console.log(er);
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
							<p className="text-2xl text-center flex items-center justify-center ">
								<ClockIcon className="h-6 w-6 mr-2" />
								<p>{formatDuration(data.total_grand)}</p>
							</p>
						</div>
						<div className="bg-gray-100 p-4">
							<h2 className="text-2xl font-semibold">
								Hourly rate
							</h2>
							<p className="text-gray-700">
								How much you make per hour, and the currency
							</p>
						</div>
						<div>
							Pay in Dollars:{" "}
							{(
								(data.total_grand * rate) /
								(1000 * 60 * 60)
							).toFixed(2)}
						</div>
						<h2>US -&gt; UK Exchange Rate</h2>
						<p>
							{er.filter((item) => item.source === "USD")[0].rate}
						</p>
						<h2>Pay in pounds</h2>
						<p>
							{(
								(er.filter((item) => item.source === "USD")[0]
									.rate *
									(data.total_grand * rate)) /
								(1000 * 60 * 60)
							).toFixed(2)}
						</p>
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
