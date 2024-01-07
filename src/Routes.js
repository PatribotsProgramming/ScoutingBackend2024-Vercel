import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Rankings } from './Pages/Rankings';
import { RawData } from './Pages/RawData';
import { Compare } from './Pages/Compare';


export const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/">
                    <Rankings />
                </Route>
                <Route path ="/notes/:notesId">
                    <RawData />
                </Route>
                <Route>
                    <Compare />
                </Route>
            </Switch>
        </Router>
    )
}