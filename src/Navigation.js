import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function Navigation() {
	const navStyle = {
		textDecoration: "none",
	};
	const currentNav = {
		color: getComputedStyle(document.documentElement).getPropertyValue(
			"--primary"
		),
		backgroundColor: getComputedStyle(
			document.documentElement
		).getPropertyValue("--secondary"),
	};
	const { isAuthenticated } = useAuth0();
	const checkPath = (navpath) => {
		if (window.location.pathname === navpath) {
			return true;
		} else {
			return false;
		}
	};
	return (
		<nav>
			<ul>
				<Link to="/" style={navStyle}>
					<li>CS Helper</li>
				</Link>
				<div className="rightlinks">
					<Link to="/search" style={navStyle}>
						<li>Search</li>
					</Link>
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
