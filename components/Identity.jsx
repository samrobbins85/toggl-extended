import { useState } from "react";
import useSWR from "swr";
import axios from "axios";
import Select from "react-select";

const fetcher = (url, token) =>
	axios
		.get(`https://api.track.toggl.com${url}`, {
			params: {
				user_agent: "samrobbinsgb@gmail.com",
			},
			headers: {
				Authorization: `Basic ${token}`,
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
		<Select options={options} onChange={(result) => setWorkspace(result)} />
	);
}

export default function Identity({ token, setToken, setWorkspace }) {
	const [tempToken, setTempToken] = useState("");
	const { data } = useSWR(
		token ? ["/api/v8/workspaces", token] : null,
		fetcher
	);
	return (
		<div className="bg-red-100 p-4 rounded">
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
							onChange={(event) =>
								setTempToken(event.target.value)
							}
						/>
						<button
							className="bg-red-700 text-white rounded px-4 hover:bg-red-800"
							type="button"
							onClick={() => setToken(tempToken)}
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
