import Select from "react-select";
import { CurrencyPoundIcon } from "@heroicons/react/solid";

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
		<div className="blue-bg p-4 rounded">
			<h2 className="text-2xl font-semibold flex items-center text-radix-blue11">
				<CurrencyPoundIcon className="h-6 w-6 mr-2" />
				Rate
			</h2>
			<form className="flex gap-x-4 items-center pt-2">
				<input
					type="number"
					className="mt-0 block w-24 px-2 border rounded border-gray-300 focus:ring-0 focus:border-select"
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
