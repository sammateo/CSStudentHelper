import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function Navigation() {
	const navStyle = {
		textDecoration: "none",
	};
	const { isAuthenticated } = useAuth0();

	return (
		<nav>
			<ul>
				<Link to="/" style={navStyle}>
					<li>CS Helper</li>
				</Link>
				<div className="rightlinks">
					{isAuthenticated && (
						<Link to="/favorites" style={navStyle}>
							<li>Favorites</li>
						</Link>
					)}
					<Link to="/profile" style={navStyle}>
						<li>Profile</li>
					</Link>
				</div>
			</ul>
		</nav>
	);
}
