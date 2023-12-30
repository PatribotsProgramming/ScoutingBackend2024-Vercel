
/**
 *  --- TODO ---
 * Firebase backend -- COMPLETE
 * Scouting Visualization With Simple ASF???
 * Required Fields (with required field datatypes)
 * Optional upper and lower bounds for counters -- COMPLETE
 * Save data to local storage
 * Write an actual function to clear the form 
 * Rewrite the whole damn thing :heart: 
*/

/**
 * FIREBASE STRUCTURE:
 * https://simple-asf-default-rtdb.firebaseio.com
 *  > byMatch
 *    > matchNumber
 *      > teamNumber
 *        > [all the match data minus the match number]
 *  > byTeam
 *    > teamNumber
 *      > matchNumber
 *        > [all the match data minus the team number]
 * 
 * Sadly you have to make two api requests to do this, but it's not that bad
 * 
 * 
 */

import logo from './logo.svg';
import notFound from 'C:/Users/adame/Documents/Programming/Robotics/Simple-ASF/src/images/notFound.png'
import patribotsLogo from './images/patribotsLogo.png'
import './App.css';

import CheckBox from './widgets/CheckBox';
import TextBox from './widgets/TextBox'
import TextBoxLong from './widgets/TextBoxLong'
import Counter from './widgets/Counter'
import Dropdown from './widgets/Dropdown';

import {v4 as uuidv4} from "uuid"
import React from 'react';

import { getDatabase, ref, update } from "firebase/database";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD_JpLIerXg9Y4sN1WxVsZwi7-hMGSfj9Q",
  authDomain: "simple-asf.firebaseapp.com",
  projectId: "simple-asf",
  storageBucket: "simple-asf.appspot.com",
  messagingSenderId: "566920479564",
  appId: "1:566920479564:web:7ded2e6c23388c02a245e9",
  measurementId: "G-1TFHYXKQRF"
};

const app = initializeApp(firebaseConfig);

const layout = 
[
  {
    "type": "header", 
    "value": "Example Scouting Form",
    "decorator": "title"
  },
  {
    "title": "Name",
    "type": "textbox",
    "value": "",
    "required": true,
    "datatype": "string",
    "resetToValue": "Adam",
    "decorator": "name_input"
  },
  {
    "title": "Test Checkbox",
    "type": "checkbox",
    "value": false
  },
  {
    "title": "Test Counter",
    "type": "counter",
    "value": 0,
    "increment": 1,
    "resetToValue": 0,
    "maxValue": 10,
    "minValue": 0
  },
  {
    "title": "Test Text Box Long",
    "type": "textboxlong",
    "value": "",
    "resetToValue": "This is a test"
  },
  {
    "title": "Test Dropdown",
    "type": "dropdown",
    "value": 0,
    "options": [
      "option 1",
      "option 2",
      "option 3"
    ],
    "resetToValue": 0
  },
  {
    "title": "Submit",
    "type": "submit",
  }
  
]
 

const isInteractable = (type) => {
  switch (type) {
    case "header":
      return false;
    case "label":
      return false;
    case "submit":
      return false;
    default:
      return true;
  }
}

// Just a lil QOL function to add ids to the layout
// The last version had you do this manually (ugh)
const addIds = (layout) => {
  Object.keys(layout).forEach((item) => {
    layout[item].id = uuidv4()
  })
}
addIds(layout)

class Container extends React.Component{
  /**
   * HOW THE STATE WORKS:
   * interactables holds all of the components that could have data entered into them
   * interactables is an array of objects, each object has the following properties:
   * - item: the actual component
   * - id: the id of the component
   * - value: the value of the component
   * 
   * When the user enters data into a component, the component calls a function 
   * that updates the state
   * This function takes the id of the component and the value of the component 
   * and updates the corresponding value in state with that new value
   * 
   * When the user submits the form, the function gatherData is called
   * which just passes the interactables list into the function [writeMatchDataToDB]
   * - I'm going to remove the gatherData function, bc it's not really necessary
   *   when the data is already stored in interactables
   */
  state = {
    interactables: layout.filter((item) => (isInteractable(item.type)))
  }

  wipeForm = () => {
    // Update the state to reflect the fact that all of the interactables are now empty
    this.setState({
      interactables: this.state.interactables.map((item) => {
        item.value = item.resetToValue
        return item
      })
    })
    // Update what's actually rendered on the page to reflect the state
    this.state.interactables.forEach((item) => {
      switch (item.type) {
        case "checkbox":
          document.getElementById(item.id).checked = false
          break;
        case "textbox":
          document.getElementById(item.id).value = (item.resetToValue === undefined) ? ""  : item.resetToValue
          break;
        case "textboxlong":
          document.getElementById(item.id).value = (item.resetToValue === undefined) ? ""  : item.resetToValue
          break;
        case "counter":
          document.getElementById(item.id).value = (item.resetToValue === undefined) ? 0  : item.resetToValue
          break;
        case "dropdown":
          document.getElementById(item.id).value = (item.resetToValue === undefined) ? 0  : item.resetToValue
          break;
      }
    })
    
  }

  handleTextBoxChange = (id, value) => {
    this.setState({
      interactables: this.state.interactables.map((item) => {
          if (item.id === id) {
            item.value = value
          }
          return item
        })
    })
  }

  handleCheckBoxChange = (id, value) => {
    this.setState({
      interactables: this.state.interactables.map((item) => {
          if (item.id === id) {
            item.value = !item.value
          }
          return item
        })
    })
  }

  handleCounterChange = (id, value, limiter) => {
    this.setState({
      interactables: this.state.interactables.map((item) => {
          if (item.id === id) {
            item.value += value
            if (value > 0 && item.value > limiter) {
              item.value -= value
            }
            else if (value < 0 && item.value < limiter) {
              item.value -= value
            }
          }
          return item
        })
    })
  }
  
  writeMatchDataToDB = (data) => {
    const db = getDatabase();
    
    var json = {};

    data.forEach(item => {
      json[item[0]] = item[1]
    });

    let matchNumber =  json["Match Number"];
    let teamNumber = json["Team Number"];

    if (matchNumber === "" || teamNumber === ""){
      alert("Please enter a match number and team number")
      return false
    }
    
    delete json["Match Number"];
    delete json["Team Number"];

    update(ref(db, 'byMatch/' + matchNumber + "/" + teamNumber), {...json});
    update(ref(db, 'byTeamNumber/' + teamNumber + "/" + matchNumber), {...json});

    return true
    
  };

  handleDropdownChange = (id, value) => {
    this.setState({
      interactables: this.state.interactables.map((item) => {
          if (item.id === id) {
            item.value = value
          }
          return item
        })
    })
  }

  handleFormSubmit = (e) =>{
    console.log("submiting")
    e.preventDefault()

    let missingRequiredFields = []
    let data = this.state.interactables.map((item) => {
      if (item.required && (item.value === "" || item.value === 0 || item.value === undefined)) {
        missingRequiredFields.push(item.title)
      }
      return [item.title, item.value]
    })

    if (missingRequiredFields.length > 0) {
      alert("You are missing the following " + missingRequiredFields.length + " required fields: " + missingRequiredFields.join(",")); 
      console.log("not submitted, missing required field(s) [" + missingRequiredFields.join(",") + "]")
      return
    }

    console.log(data)
    
    localStorage.setItem("matchData", JSON.stringify([...localStorage.getItem("matchData"), data]))

    // let successfullySubmitted = this.writeMatchDataToDB(data)
    
    // if (successfullySubmitted) {this.wipeForm(); console.log("submitted")}
    // else {console.log("not submitted, something went wrong")}
    
  }

  render () {
    return (
      <div className="app">
        <ul className="outer-container">
          {Object.keys(layout).map((item) => {          
            switch (layout[item].type) {
              case "header":
                return <h1          id={layout[item].id} className={layout[item].decorator}>{layout[item].value}</h1>
              case "label":
                return <span        id={layout[item].id} className={layout[item].decorator}>{layout[item].value}</span>
              case "checkbox":
                return <CheckBox    id={layout[item].id} title={layout[item].title} decorator={layout[item].decorator} value={layout[item].value} resetToValue={layout[item].resetToValue} changeHandler={this.handleCheckBoxChange}/>
              case "textbox":
                return <TextBox     id={layout[item].id} title={layout[item].title} decorator={layout[item].decorator} value={layout[item].value} resetToValue={layout[item].resetToValue} changeHandler={this.handleTextBoxChange}/>
              case "textboxlong":
                return <TextBoxLong id={layout[item].id} title={layout[item].title} decorator={layout[item].decorator} value={layout[item].value} resetToValue={layout[item].resetToValue} changeHandler={this.handleTextBoxChange}/>
              case "counter":
                return <Counter     id={layout[item].id} title={layout[item].title} decorator={layout[item].decorator} value={layout[item].value} resetToValue={layout[item].resetToValue} changeHandler={this.handleCounterChange} increment={layout[item].increment} maxValue={layout[item].maxValue} minValue={layout[item].minValue}/>
              case "dropdown":
                return <Dropdown    id={layout[item].id} title={layout[item].title} decorator={layout[item].decorator} value={layout[item].value} resetToValue={layout[item].resetToValue} changeHandler={this.handleDropdownChange} options={layout[item].options}/>
              case "submit":
                return <span className='widget submit-container'><button      id={layout[item.id]} className={"submit " + (this.decorator ? this.decorator : "")} onClick={this.handleFormSubmit}>{layout[item].title}</button></span>
              default:
                return <div>error: undefined widget type [{layout[item.type]}]</div>
            }
          })}
          {/* <button onClick={() => {console.log(this.state.interactables)}}>Log State</button>
          <button onClick={this.wipeForm}>Clear State</button> */}
        </ul>
      </div>
    );
  }
}

export default Container;
