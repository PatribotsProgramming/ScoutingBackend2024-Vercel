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
import Search from "./Pages/Search";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Compare from "./Pages/CompareTeams";

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
							<Link className="navbar-but" to="/Search">
								<div className="nav-text">
									Search
								</div>
							</Link>
							<Link className="navbar-but" to="/RawData">
								<div className="nav-text">
									Raw Data
								</div>
							</Link>
                            <Link className="navbar-but" to="/Compare">
								<div className="nav-text">
									Compare Teams
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
								path="/RawData"
								element={<RawData />}
							></Route>
							<Route
								exact
								path="/Search"
								element={<Search />}
							></Route>
							<Route
								exact
								path="/Compare"
								element={<Compare />}
							></Route>
						</Routes>
					</div>
				</Router>
			</QueryClientProvider>
		);
	}
}

export default App;