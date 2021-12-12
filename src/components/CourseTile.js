import React from "react";
import { Link } from "react-router-dom";
export default function CourseTile({ details }) {
	const linkStyle = {
		color: "black",
		width: "max-content",
		textAlign: "center",
		// textDecoration: "none",
	};
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
		</div>
	);
}
