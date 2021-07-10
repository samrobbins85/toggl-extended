import { useEffect, useState } from "react";

export default function DatePicker({ setter }) {
	const [duration, setDuration] = useState("1 Week");
	const [start, setStart] = useState(new Date().toISOString().slice(0, 10));
	useEffect(() => {
		const endDate = new Date(start);
		switch (duration) {
			case "1 Week":
				endDate.setDate(endDate.getDate() + 7);
				break;
			case "2 Weeks":
				endDate.setDate(endDate.getDate() + 14);
				break;
			case "1 Month":
				endDate.setMonth(endDate.getMonth() + 1);
				break;
			default:
				break;
		}
		setter({ start, end: endDate.toISOString().slice(0, 10) });
	}, [duration, start]);

	return (
		<div className="yellow-bg rounded p-4">
			<h2 className="text-2xl font-semibold">Dates</h2>
			<p className="text-lg text-gray-700">
				Select the date range you want
			</p>
			<div className="flex gap-x-2 items-center">
				<input
					type="date"
					value={start}
					onChange={(data) => setStart(data.target.value)}
				/>
				<p>Add</p>
				<select onChange={(item) => setDuration(item.target.value)}>
					<option>1 Week</option>
					<option>2 Weeks</option>
					<option>1 Month</option>
				</select>
			</div>
		</div>
	);
}