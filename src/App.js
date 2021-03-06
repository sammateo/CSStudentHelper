import "./App.css";
import Navigation from "./Navigation";
import Home from "./Home";
import Profile from "./Profile";
import Favorites from "./Favorites";
import Search from "./Search";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Course from "./components/Course";

function App() {
	return (
		<Router>
			<div className="App">
				<Navigation />

				<Routes>
					<Route path="/favorites" element={<Favorites />} />
					<Route path="/" element={<Home />} />
					<Route path="/search" element={<Search />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/course/:id" element={<Course />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
