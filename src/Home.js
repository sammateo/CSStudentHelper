import React from "react";
import { useState, useEffect } from "react";
import CourseTile from "./components/CourseTile";

export default function Home() {
	useEffect(() => {
		getCourses();
	}, []);
	const [courses, setCourses] = useState([]);

	const getCourses = async () => {
		const req = await fetch(
			`http://${window.location.hostname}:5000/courses/`,
			{
				method: "GET",
				mode: "cors",
			}
		);
		const data = await req.json();
		setCourses(data);
		console.log(data);
		// console.log(window.location.hostname);
	};
	return (
		<div>
			<h1>Courses</h1>
			<div className="courses">
				{courses.map((course) => {
					return <CourseTile key={course._id} details={course}></CourseTile>;
				})}
			</div>
		</div>
	);
}
