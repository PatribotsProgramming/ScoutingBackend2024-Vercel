// Filename - App.js

import React from "react";
import Navbar from "./components/Navbar";
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";
import Home from "./pages";
import About from "./pages/about";
import Blogs from "./pages/blogs";
import SignUp from "./pages/signup";
import Contact from "./pages/contact";

import {firebaseConfig, sortMetrics } from './Config.js'
import { getDatabase, ref, onValue, set } from "firebase/database";
import { initializeApp } from "firebase/app";

const db = getDatabase();

const dbRef = ref(db, '/');

Object.keys(layout).forEach((item) => {
	layout[item].id = uuidv4()
})

function App() {
	state = {
		matchData: undefined
	};

	onDatabaseUpdate = (snapshot) => {
		const data = snapshot.val();
		console.log("Db was updated:", data);
		this.setState({ matchData: data });
	};

	
	onValue(dbRef, this.onDatabaseUpdate);

	return (
		
		<Router>
			<Navbar />
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route
					path="/contact"
					element={<Contact />}
				/>
				<Route path="/blogs" element={<Blogs />} />
				<Route
					path="/sign-up"
					element={<SignUp />}
				/>
			</Routes>
		</Router>
	);
}

export default App;
