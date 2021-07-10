import Select from "react-select";

export default function Rate({ setRate, setCurrency, er }) {
	const erSort = er.sort((a, b) => a.source.localeCompare(b.source));

	const options = erSort.map((item) => {
		const myObj = {};
		myObj.value = item.source;
		myObj.label = item.source;
		return myObj;
	});
	options.push({ value: "GBP", label: "GBP" });
	return (
		<div className="bg-blue-100 p-4 rounded">
			<h1 className="text-2xl font-semibold">Rate</h1>
			<form className="flex gap-x-4 items-center">
				<input
					type="number"
					onChange={(input) => setRate(input.target.value)}
				/>
				<Select
					defaultValue={{
						value: "GBP",
						label: "GBP",
					}}
					className="w-40"
					options={options}
					onChange={(changes) => setCurrency(changes.value)}
				/>
			</form>
		</div>
	);
}
