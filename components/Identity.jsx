import { useState, useEffect } from "react";
import useSWR from "swr";
import axios from "axios";
import Select from "react-select";
import base64 from "base-64";
import { IdentificationIcon } from "@heroicons/react/solid";

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

function Workspace({ workspaceList, setWorkspace, workspace }) {
	const options = workspaceList.map((item) => {
		const myObj = {};
		myObj.value = item.id;
		myObj.label = item.name;
		return myObj;
	});
	return (
		<Select
			options={options}
			defaultValue={
				options.filter((item) => item.value.toString() === workspace)[0]
			}
			onChange={(result) => setWorkspace(result.value)}
		/>
	);
}

export default function Identity({ token, setToken, setWorkspace, workspace }) {
	const [tempToken, setTempToken] = useState("");
	const [loggedIn, setLoggedIn] = useState(false);
	const { data, mutate } = useSWR(["/api/v8/workspaces", token], fetcher);
	useEffect(() => {
		if (token) {
			setTempToken(token);
		}
		if (
			localStorage.getItem("token") &&
			localStorage.getItem("workspace")
		) {
			setLoggedIn(true);
		}
	}, []);

	useEffect(() => {
		if (token) {
			setTempToken(token);
		}
	}, [token]);

	function logOut() {
		localStorage.clear();
		setToken("");
		setWorkspace("");
		setLoggedIn(false);
	}

	return (
		<div className="p-4 rounded red-bg">
			<div className="pb-4">
				<h2 className="text-2xl font-semibold text-radix-red11 flex items-center">
					<IdentificationIcon className="h-6 w-6 mr-2" />
					Identity
				</h2>
				<p className="text-lg text-gray-700">
					Information needed to find who you are
				</p>
			</div>
			{!loggedIn ? (
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
							workspace={workspace}
						/>
					)}
				</div>
			) : (
				<>
					<p className="text-center">You are already logged in</p>
					{data && (
						<div className="py-4">
							<Workspace
								workspaceList={data}
								setWorkspace={setWorkspace}
								workspace={workspace}
							/>
						</div>
					)}
					<div className="justify-center flex py-2">
						<button
							className="red-solid red-solid-int text-white px-4 py-2 rounded"
							type="button"
							onClick={logOut}
						>
							Log out
						</button>
					</div>
				</>
			)}
		</div>
	);
}
