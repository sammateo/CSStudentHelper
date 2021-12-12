import React from "react";
import { Link } from "react-router-dom";

export default function Navigation() {
	const navStyle = {
		textDecoration: "none",
	};
	return (
		<nav>
			<ul>
				<Link to="/" style={navStyle}>
					<li>CS Helper</li>
				</Link>
				<div className="rightlinks">
					<Link to="/favorites" style={navStyle}>
						<li>Favorites</li>
					</Link>
					<Link to="/profile" style={navStyle}>
						<li>Profile</li>
					</Link>
				</div>
			</ul>
		</nav>
	);
}
