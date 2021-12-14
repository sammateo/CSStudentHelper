import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import CourseTile from "./components/CourseTile";

import { useEffect, useState } from "react";

export default function Favorites() {
	const { isAuthenticated, user, isLoading } = useAuth0();
	const [favorites, setFavorites] = useState([]);
	const [courses, setCourses] = useState([]);

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
			data.length > 0 && setFavorites(data[0].favorites);
			data.length > 0 && console.log(data[0].favorites);

			data.length > 0 &&
				data[0].favorites.forEach(async (fav) => {
					await getCourses(fav);
				});
		};
		isAuthenticated && !isLoading && getFavorites();
	}, [isLoading, user, isAuthenticated]);
	const getCourses = async (courseid) => {
		const req = await fetch(
			`http://${window.location.hostname}:5000/courses/${courseid}`,
			{
				method: "GET",
				mode: "cors",
			}
		);
		const data = await req.json();
		setCourses((courses) => [...courses, data]);
		console.log(data);
	};

	return (
		<div>
			<h1>Favorites</h1>
			<div className="courses">
				{courses.map((course, index) => {
					return (
						<CourseTile
							key={course._id}
							details={course}
							index={index}
						></CourseTile>
					);
				})}
			</div>
		</div>
	);
}
