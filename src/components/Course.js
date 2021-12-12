import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export default function Course() {
	const [course, setCourse] = useState({
		syllabus: [],
	});
	let { id } = useParams();
	// let id = { id };
	const getCourse = async () => {
		const req = await fetch(`http://localhost:5000/courses/${id}`, {
			method: "GET",
			mode: "cors",
		});
		const data = await req.json();
		setCourse(data);
		console.log(data);
	};

	useEffect(() => {
		getCourse();
		// console.log({ id });
	});

	return (
		<div>
			<h1>{course.name}</h1>
			<span>{course.code}</span>

			<h4>Topics:</h4>
			<div>
				{course.syllabus.map((topic) => (
					<li key={topic}>{topic}</li>
				))}
			</div>
		</div>
	);
}
