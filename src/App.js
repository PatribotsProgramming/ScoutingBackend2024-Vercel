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
					<ul className="App-header">
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/Rankings">
								Rankings
							</Link>
						</li>
						<li>
							<Link to="/RawData">
								Raw Data
							</Link>
						</li>
					</ul>
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