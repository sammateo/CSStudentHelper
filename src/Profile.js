import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";

export default function Profile() {
	const { user, isAuthenticated, isLoading } = useAuth0();
	console.log(user);
	if (isLoading) {
		return <div>Loading ...</div>;
	}
	return isAuthenticated ? (
		<div className="profile">
			{/* <h1>Profile</h1> */}
			{/* <LoginButton /> */}
			<LogoutButton />
			<img src={user.picture} alt={user.name} />

			<h2>{user.name}</h2>
			{/* {JSON.stringify(user, null, 2)} */}
		</div>
	) : (
		<div>
			<LoginButton />
		</div>
	);
}
