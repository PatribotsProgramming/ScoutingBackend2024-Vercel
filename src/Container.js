
/**
 *  --- TODO ---
 * Firebase backend -- COMPLETE
 * Scouting Visualization With Simple ASF???
 * Required Fields -- COMPLETE
 * Optional upper and lower bounds for counters -- COMPLETE
 * Save data to local storage -- COMPLETE
 * Write an actual function to clear the form -- COMPLETE
 * Rewrite the whole damn thing :heart: -- COMPLETE
*/

import './App.css';
import Chart from './components/charts'
// import CheckBox from './widgets/CheckBox';
// import TextBox from './widgets/TextBox'
// import TextBoxLong from './widgets/TextBoxLong'
import Counter from './widgets/Counter'
// import Dropdown from './widgets/Dropdown';

import layout from './layout.json'
import {firebaseConfig, sortMetrics, renderRequiredStars} from './Config.js'

import logo from './images/patribotsLogo.png';

import {v4 as uuidv4} from "uuid"
import React from 'react';

import { getDatabase, ref, update } from "firebase/database";
import { initializeApp } from "firebase/app";


const app = initializeApp(firebaseConfig);



// Just a lil QOL function to add ids to the layout
// The last version had you do this manually (ugh)
Object.keys(layout).forEach((item) => {
  layout[item].id = uuidv4()
})

class Container extends React.Component{
  
//   state = {
//     interactables: layout.filter((item) => (isInteractable(item.type)))
//   }

  

  render () {
    return (
      <div className="app">
        <image src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR71FESRUZEUb2_52JI8EZhNkaQ3fn0p1vFU8UANUePHUI2qQbzsFqS12lnWCv1Fj6S87k&usqp=CAU"}></image>
        <ul className="outer-container">
          {Object.keys(layout).map((item) => {   
            // if (isInteractable(layout[item].type)) {
            // }
            switch (layout[item].type) {
              case "header":
                return <h1          id={layout[item].id} className={"widget header " + layout[item].decorator}>{layout[item].value}</h1>
              case "label":
                return <h3          id={layout[item].id} className={"widget label " + layout[item].decorator}>{layout[item].value}</h3>
              case "counter":
                return <Counter     id={layout[item].id} title={layout[item].title + (renderRequiredStars ? (layout[item].required ? " *" : "") : "")} decorator={layout[item].decorator} value={layout[item].value} resetToValue={layout[item].resetToValue} changeHandler={this.handleCounterChange} increment={layout[item].increment} maxValue={layout[item].maxValue} minValue={layout[item].minValue}/>
              default:
                return <div>error: undefined widget type [{layout[item.type]}]</div>
            }
          })}
          
          <img src={logo} alt="" style={{height:0,width:0}} onClick={this.c}/>
        </ul>
      </div>
    );
  }
}

export default Container;
