import Select from "react-select";

export default function Clients({ clientList, setClients }) {
	const options = clientList.map((item) => {
		const myObj = {};
		myObj.value = item.id;
		myObj.label = item.name;
		return myObj;
	});
	return (
		<div className="bg-orange-100 rounded p-4">
			<h2 className="text-2xl font-semibold">Clients</h2>
			<p className="text-lg text-gray-700">
				Select the clients you want to bill for
			</p>
			<Select
				isMulti
				options={options}
				onChange={(result) => setClients(result)}
			/>
		</div>
	);
}
