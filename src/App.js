// Filename - App.js

import React, { Component } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
} from "react-router-dom";
import Rankings from "./Pages/Rankings";
import RawData from "./Pages/RawData";
import Visualization from "./Pages/Visualization";
import "./App.css";
import Patribots from "./images/patribotsLogo.png";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

class App extends Component {
	render() {
		return (
			<QueryClientProvider client={queryClient}>
				<Router>
					<div className="App">
						<div className="App-header">
							<Link className="navbar-but" to="/Rankings">
								<div className="nav-text">
									Rankings
								</div>
							</Link>
							<Link className="navbar-but" to="/Visualization">
								<div className="nav-text">
									Visualization
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
								path="/Rankings"
								element={<Rankings />}
							></Route>
							<Route
								exact
								path="/Visualization"
								element={<Visualization />}
							></Route>
							
							<Route
								exact
								path="/RawData"
								element={<RawData />}
							></Route>
						</Routes>
					</div>
				</Router>
			</QueryClientProvider>
		);
	}
}

export default App;