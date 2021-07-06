import Head from "next/head";
import useSWR from "swr";
import humanizeDuration from "humanize-duration";

// function normalDateTime(date) {
// 	const data = new Date(date);
// 	return data.toLocaleString("en-GB", { timeZone: "UTC" });
// }

function normalDate(date) {
	const data = new Date(date);
	return data.toLocaleDateString("en-GB", { timeZone: "UTC" });
}

function isSameDay(date1, date2) {
	const parsedDate1 = new Date(date1);
	const parsedDate2 = new Date(date2);
	return parsedDate1.toDateString() === parsedDate2.toDateString();
}

export default function IndexPage() {
	const { data, error } = useSWR("/reports/api/v2/details");
	console.log(data);
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
					<div className="flex justify-center pt-4">
						<div className="grid gap-y-6">
							{data.data.map((item) => (
								<div
									className="bg-gray-50 p-4 grid grid-cols-2"
									key={item.id}
								>
									<div>
										<h3 className="font-semibold">
											{item.description}
										</h3>
										<p className="text-gray-700">
											{isSameDay(item.start, item.end)
												? normalDate(item.start)
												: `${normalDate(item.start)} -
												  ${normalDate(item.end)}`}
										</p>
									</div>
									<div className="italic text-right">
										{humanizeDuration(item.dur)}
									</div>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</>
	);
}
