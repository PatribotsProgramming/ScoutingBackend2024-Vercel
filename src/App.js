// Filename - App.js

import React, { Component } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
} from "react-router-dom";
import Home from "./Pages/home";
import Rankings from "./Pages/Rankings";
import RawData from "./Pages/RawData";
import "./App.css";

class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<div className="App-header">
						<Link className="navbar-but" to="/">
							<div className="nav-text">
								Home
							</div>
						</Link>
						<Link className="navbar-but" to="/Rankings">
							<div className="nav-text">
								Rankings
							</div>
						</Link>
						<Link className="navbar-but" to="/RawData">
							<div className="nav-text">
								Raw Data
							</div>
						</Link>
					</div>
					<Routes>
						<Route
							exact
							path="/"
							element={<Home />}
						></Route>
						<Route
							exact
							path="/Rankings"
							element={<Rankings />}
						></Route>
						<Route
							exact
							path="/RawData"
							element={<RawData />}
						></Route>
					</Routes>
				</div>
			</Router>
		);
	}
}

export default App;
