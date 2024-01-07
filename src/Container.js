/**
 * TODO:
 * 
 * Format:
 * - Top-level reference to firebase
 * - When firebase is updated, update the state, which rerenders the page
 *   - No use in rerendering only one widget bc an entire match is submitted at once, no reason to update only one widget
 * - 
 */

import './App.css';

import layout from './layout.json'
import {firebaseConfig, sortMetrics } from './Config.js'

import logo from './images/patribotsLogo.png';

import {v4 as uuidv4} from "uuid"
import React from 'react';

import { getDatabase, ref, onValue, set } from "firebase/database";
import { initializeApp } from "firebase/app";
import BarGraph from './widgets/BarGraph.js';

const app = initializeApp(firebaseConfig);

const db = getDatabase();

const dbRef = ref(db, '/');


// Just a lil QOL function to add ids to the layout
// The last version had you do this manually (ugh)
Object.keys(layout).forEach((item) => {
  layout[item].id = uuidv4()
})

/*

export const data = [
  ["Year", "Sales", "Expenses", "Profit"],
  ["2014", 1000, 400, 200],
  ["2015", 1170, 460, 250],
  ["2016", 660, 1120, 300],
  ["2017", 1030, 540, 350],
];

export const options = {
  chart: {
    title: "Company Performance",
    subtitle: "Sales, Expenses, and Profit: 2014-2017",
  },
};

export function App() {
  return (
    <Chart
      chartType="Bar"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}
 */

class Container extends React.Component {
  state = {
    interactables: layout.filter((item) => item),
    matchData: undefined
  };

  onDatabaseUpdate = (snapshot) => {
    const data = snapshot.val();
    console.log("Db was updated:", data);
    this.setState({ matchData: data });
  };

  componentDidMount() {
    onValue(dbRef, this.onDatabaseUpdate);
  }

  render() {
    return (
      <div className="app">
        {Object.keys(layout).map((item) => {
            switch (layout[item].type) {
              case "header":
                return <h1           id={layout[item].id} className={"widget header " + layout[item].decorator}>{layout[item].value}</h1>
              case "label":
                return <h3           id={layout[item].id} className={"widget label " + layout[item].decorator}>{layout[item].value}</h3>
              case "barGraph":
                return <BarGraph     id={layout[item].id} title={layout[item].title} subtitle={layout[item].subtitle} decorator={layout[item].decorator} xLabel={layout[item].xLabel} yLabel={layout[item].yLabel} sortMetrics={layout[item].sortMetrics} data={layout[item].data}/>
              default:
                return <div>error: undefined widget type [{layout[item.type]}]</div>
            }
          })}
      </div>
    );
  }
}

export default Container;

/* {
          
          <img src={logo} alt="" style={{height:0,width:0}} onClick={this.c}/> */