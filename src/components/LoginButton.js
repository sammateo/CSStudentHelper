import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
	const { loginWithRedirect } = useAuth0();

	// const loginBtnStyles = {
	// 	backgroundColor: getComputedStyle(
	// 		document.documentElement
	// 	).getPropertyValue("--primary"),
	// 	color: getComputedStyle(document.documentElement).getPropertyValue(
	// 		"--secondary"
	// 	),
	// 	width: "100px",
	// 	padding: "5px 15px",
	// 	outline: "none",
	// 	top: "20px",
	// 	right: "20px",
	// 	borderRadius: "20px",
	// };
	return (
		<button onClick={() => loginWithRedirect()} className="loginbtn">
			Log In
		</button>
	);
};

export default LoginButton;
