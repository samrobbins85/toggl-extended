import { useState } from "react";
import useSWR from "swr";
import axios from "axios";
import Select from "react-select";
import base64 from "base-64";

const fetcher = (url, token) =>
	axios
		.get(`/toggl${url}`, {
			params: {
				user_agent: "samrobbinsgb@gmail.com",
			},
			headers: {
				Authorization: `Basic ${token}`,
				"Content-Type": "application/json",
			},
		})
		.then((res) => res.data);

function Workspace({ workspaceList, setWorkspace }) {
	const options = workspaceList.map((item) => {
		const myObj = {};
		myObj.value = item.id;
		myObj.label = item.name;
		return myObj;
	});
	return (
		<Select
			options={options}
			onChange={(result) => setWorkspace(result.value)}
		/>
	);
}

export default function Identity({ token, setToken, setWorkspace }) {
	const [tempToken, setTempToken] = useState("");
	const { data, mutate } = useSWR(["/api/v8/workspaces", token], fetcher);

	return (
		<div className="p-4 rounded red-bg">
			<h2 className="text-2xl font-semibold">Identity</h2>
			<p className="text-lg text-gray-700">
				Information needed to find who you are
			</p>
			<div className="grid gap-y-4">
				<label htmlFor="token" className="grid">
					Token
					<div className="flex gap-x-4">
						<input
							id="token"
							type="text"
							className="w-40"
							onChange={(event) =>
								setTempToken(
									base64.encode(
										`${event.target.value}:api_token`
									)
								)
							}
						/>
						<button
							className="text-white rounded px-4 red-solid red-solid-int"
							type="button"
							onClick={() => {
								setToken(tempToken);
								mutate();
							}}
						>
							Search
						</button>
					</div>
				</label>
				{data && (
					<Workspace
						workspaceList={data}
						setWorkspace={setWorkspace}
					/>
				)}
			</div>
		</div>
	);
}
