import Select from "react-select";
import axios from "axios";
import useSWR from "swr";
import { useEffect, useState } from "react";

const fetcher = (url, token, workspace) =>
	axios
		.get(`/toggl${url}`, {
			params: {
				user_agent: "samrobbinsgb@gmail.com",
				workspace_id: workspace,
			},
			headers: {
				Authorization: `Basic ${token}`,
			},
		})
		.then((res) => res.data);

export default function Clients({ setClients, token, workspace }) {
	const [options, setOptions] = useState(null);
	const { data } = useSWR(["/api/v8/clients", token, workspace], fetcher);
	useEffect(() => {
		if (data) {
			setOptions(
				data.map((item) => {
					const myObj = {};
					myObj.value = item.id;
					myObj.label = item.name;
					return myObj;
				})
			);
		}
	}, [data]);
	if (options) {
		return (
			<div className="orange-bg p-4">
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
	return null;
}
