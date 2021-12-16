import React from "react";
import { useState } from "react";
import CourseTile from "./components/CourseTile";
export default function Search() {
	const [searchquery, setSearchquery] = useState();
	const [searchresults, setSearchresults] = useState([]);
	const [filter, setFilter] = useState("name");
	const inputHandle = (e) => {
		setSearchquery(e.target.value);
	};
	const changeFilter = (e) => {
		console.log(e.target.id);
		setFilter(e.target.id);
	};
	const searchFunc = async () => {
		if (filter === "level" && isNaN(searchquery)) {
			return;
		}
		const req = await fetch(
			`http://${window.location.hostname}:5000/courses/search${filter}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				mode: "cors",
				body: JSON.stringify({
					query: searchquery,
				}),
			}
		);
		const data = await req.json();
		console.log(data);
		setSearchresults(data);
	};
	return (
		<div className="search-container">
			<label htmlFor="searchbar">Search Course by {filter}</label>
			<br />
			<input
				type="text"
				id="searchbar"
				onChange={inputHandle}
				placeholder={`Search by ${filter}...`}
			/>
			<button onClick={searchFunc}>Search</button>
			<br />

			<div className="searchfilter-container">
				<input
					type="radio"
					id="name"
					name="searchfilters"
					onChange={changeFilter}
				/>
				<label htmlFor="name">Search by Course Name</label>
				<input
					type="radio"
					id="code"
					name="searchfilters"
					onChange={changeFilter}
				/>
				<label htmlFor="name">Search by Course Code</label>
				<input
					type="radio"
					id="level"
					name="searchfilters"
					onChange={changeFilter}
				/>
				<label htmlFor="name">Search by Course Level</label>
			</div>
			{searchresults.length > 0 ? (
				searchresults.map((course, index) => {
					return (
						<CourseTile
							key={course._id}
							details={course}
							index={index}
						></CourseTile>
					);
				})
			) : (
				<div className="no-results">No results found</div>
			)}
		</div>
	);
}
