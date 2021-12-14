import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function CourseTile({ details, index }) {
	const linkStyle = {
		color: "black",
		width: "70%",
		textAlign: "center",
		// textDecoration: "none",
	};
	const { isAuthenticated, user, isLoading } = useAuth0();
	// let favColor = {
	// 	WebkitTextFillColor: "white",
	// };
	const [favorites, setFavorites] = useState([]);
	// const [isfavorite, setisfavorite] = useState(false);
	const [favColor, setfavColor] = useState({
		WebkitTextFillColor: "white",
	});

	const toggleFavorites = async () => {
		console.log(details._id, user.sub);
		let found = 0;
		const req = await fetch(
			`http://${window.location.hostname}:5000/students/${user.sub}`,
			{
				method: "GET",
				mode: "cors",
			}
		);
		const data = await req.json();
		console.log(data);
		data.length > 0 &&
			data[0].favorites.forEach((fav) => {
				if (details._id === fav) {
					removeFavorite();
					setfavColor({ WebkitTextFillColor: "white" });
					found = 1;
					return;
				}
			});

		found === 0 && addFavorite() && setfavColor({ WebkitTextFillColor: "red" });

		// getFavorites();
		return;

		// console.log(favorites);
	};

	const removeFavorite = async () => {
		let parameters = {
			sub: user.sub,
			favorite: details._id,
		};

		console.log(parameters);

		const req = await fetch(
			`http://${window.location.hostname}:5000/students/removefavorite`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				mode: "cors",
				body: JSON.stringify({
					sub: user.sub,
					favorite: details._id,
				}),
			}
		);
		const data = await req.json();
		console.log(data);
	};

	const addFavorite = async () => {
		let parameters = {
			sub: user.sub,
			favorite: details._id,
		};
		console.log(parameters);
		// let formData = new FormData();
		// formData.append("parameters", parameters);
		// console.log(formData);
		const req = await fetch(
			`http://${window.location.hostname}:5000/students/addfavorite`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				mode: "cors",
				body: JSON.stringify({
					sub: user.sub,
					favorite: details._id,
				}),
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
			data.length > 0 && setFavorites(data[0].favorites);
			data.length > 0 &&
				data[0].favorites.forEach((fav) => {
					fav === details._id && setfavColor({ WebkitTextFillColor: "red" });
				});
		};
		isAuthenticated && !isLoading && getFavorites();
	}, [isLoading, user, details._id, isAuthenticated]);
	return (
		<div
			className="course-tile"
			style={{ animationDuration: Number(index + 1) + "s" }}
		>
			<div className="coursecodename">
				<Link to={`/course/${details._id}`} style={linkStyle}>
					<p>{details.code}</p>
					<h3>{details.name}</h3>
				</Link>
			</div>

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
