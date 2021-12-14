import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function CourseTile({ details }) {
	const linkStyle = {
		color: "black",
		width: "max-content",
		textAlign: "center",
		// textDecoration: "none",
	};
	const { isAuthenticated, user, isLoading } = useAuth0();
	// let favColor = {
	// 	WebkitTextFillColor: "white",
	// };
	const [favorites, setFavorites] = useState([]);
	const [isfavorite, setisfavorite] = useState(false);
	const [favColor, setfavColor] = useState({
		WebkitTextFillColor: "white",
	});
	const toggleFavorites = () => {
		console.log(details._id, user.sub);
		favorites.forEach((fav) => {
			if (details._id === fav) {
				removeFavorite();
				return;
			}
		});

		addFavorite();
		return;

		// console.log(favorites);
	};

	const removeFavorite = async () => {
		let parameters = JSON.stringify({
			sub: user.sub,
			favorite: details._id,
		});
		let formData = new FormData();
		formData.append("parameters", parameters);
		const req = await fetch(
			`http://${window.location.hostname}:5000/students/removefavorite`,
			{
				method: "POST",
				mode: "cors",
				body: formData,
			}
		);
		const data = await req.json();
		console.log(data);
	};

	const addFavorite = async () => {
		let parameters = JSON.stringify({
			sub: user.sub,
			favorite: details._id,
		});
		// let formData = new FormData();
		// formData.append("parameters", parameters);
		const req = await fetch(
			`http://${window.location.hostname}:5000/students/addfavorite`,
			{
				method: "POST",
				mode: "cors",
				body: parameters,
			}
		);
		const data = await req.json();
		console.log(data);
	};

	useEffect(() => {
		const getFavorites = async () => {
			// console.log(user.sub);
			const req = await fetch(
				`http://${window.location.hostname}:5000/students/${user.sub}`,
				{
					method: "GET",
					mode: "cors",
				}
			);
			const data = await req.json();
			console.log(data);
			setFavorites(data[0].favorites);
			data[0].favorites.forEach((fav) => {
				fav === details._id && setfavColor({ WebkitTextFillColor: "red" });
			});
		};

		!isLoading && getFavorites();
	}, [isLoading, user]);
	return (
		<div className="course-tile">
			<Link to={`/course/${details._id}`} style={linkStyle}>
				<p>{details.code}</p>
				<h3>{details.name}</h3>
			</Link>

			<ul>
				<h4>Topics:</h4>
				<div className="topics">
					{details.syllabus.map((topic) => (
						<li key={topic}>{topic}</li>
					))}
				</div>
			</ul>
			{isAuthenticated && (
				<div className="favorite" onClick={toggleFavorites} style={favColor}>
					&hearts;
				</div>
			)}
		</div>
	);
}
