
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

import CheckBox from './widgets/CheckBox';
import TextBox from './widgets/TextBox'
import TextBoxLong from './widgets/TextBoxLong'
import Counter from './widgets/Counter'
import Dropdown from './widgets/Dropdown';

import layout from './layout.json'
import {firebaseConfig, sortMetrics, renderRequiredStars} from './Config.js'

import logo from './images/patribotsLogo.png';

import {v4 as uuidv4} from "uuid"
import React from 'react';

import { getDatabase, ref, update } from "firebase/database";
import { initializeApp } from "firebase/app";


const app = initializeApp(firebaseConfig);


  // {
  //   "type*": "header", 
  //   "value*": "Example Scouting Form",
  //   "decorator": "title"
  // },
  // {
  //   "type*": "label",
  //   "value*": "This is an example scouting form",
  //   "decorator": "label"
  // },
  // {
  //   "title*": "Name",
  //   "type*": "textbox",
  //   "value*": "",
  //   "required": true,
  //   "resetToValue": "Adam",
  //   "decorator": "name_input"
  // },
  // {
  //   "title*": "Test Checkbox",
  //   "type*": "checkbox",
  //   "value": false
  // },
  // {
  //   "title*": "Test Counter",
  //   "type*": "counter",
  //   "value": 0,
  //   "increment": 1,
  //   "resetToValue": 0,
  //   "maxValue": 10,
  //   "minValue": 0
  // },
  // {
  //   "title*": "Test Text Box Long",
  //   "type*": "textboxlong",
  //   "value": "",
  //   "resetToValue": "This is a test"
  // },
  // {
  //   "title*": "Test Dropdown",
  //   "type*": "dropdown",
  //   "value": 0,
  //   "options*": [
  //     "option 1",
  //     "option 2",
  //     "option 3"
  //   ],
  //   "resetToValue": 0
  // },
  // {
  //   "title*": "Submit",
  //   "type*": "submit",
  // }
/*
Components I want:
A star means it's required
  - Title: Patribots Scouting Form
  - Label: Identification
  - Textbox: Name*
  - Textbox: Team Number*
  - Textbox: Match Number*
  - Alliance Color: Dropdown (Red, Blue)*
  - Label: Autonomous
  - Checkbox: Crossed Auto Line
  - Checkbox: Docked Auto
  - Checkbox: Engaged Auto
  - Counter: Cone Upper Auto
  - Counter: Cone Middle Auto
  - Counter: Cone Lower Auto
  - Counter: Cube Upper Auto
  - Counter: Cube Middle Auto
  - Counter: Cube Lower Auto
  - Label: Teleop
  - Counter: Cone Upper Teleop
  - Counter: Cone Middle Teleop
  - Counter: Cone Lower Teleop
  - Counter: Cube Upper Teleop
  - Counter: Cube Middle Teleop
  - Counter: Cube Lower Teleop
  - Counter: Fumbles
  - Counter: Supercharged Pieces
  - Label: Endgame
  - Checkbox: Docked Teleop
  - Checkbox: Engaged Teleop
  - Checkbox: Chargepad Failure
  - Label: Temporary Failure
  - Checkbox: Critical Failure
  - Text Box Long: What they did well
  - Text Box Long: What they need to improve
  - Text Box Long: Additional Notes
  - Submit Button
*/

const isInteractable = (type) => {
  switch (type) {
    case "header":
      return false;
    case "label":
      return false;
    case "submit":
      return false;
    case "export":
      return false;
    default:
      return true;
  }
}

// Just a lil QOL function to add ids to the layout
// The last version had you do this manually (ugh)
Object.keys(layout).forEach((item) => {
  layout[item].id = uuidv4()
})

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
            if (limiter === undefined) {
              item.value = item.resetToValue
              return item
            }
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
  
  writeMatchDataToDB = (data) => {
    const db = getDatabase();
    
    let json = {};
    data.forEach((item) => {
      json[item[0]] = item[1]
    })

    let path = ""
    sortMetrics.forEach((item) => {
      if (json[item] === undefined) {throw "Sort metric [" + item + "] not found in data"}
      path += json[item] + "/"
      delete json[item]
    })
    path = path.slice(0, -1)
    console.log(path, json)

    update(ref(db, path), json)

    return true
    
  };

  handleFormSubmit = (e) =>{
    e.preventDefault()

    let missingRequiredFields = []
    let data = this.state.interactables.map((item) => {
      if (item.required && (item.value === "" || item.value === 0 || item.value === undefined)) {
        missingRequiredFields.push(item.title)
      }
      return [item.title, item.value]
    })

    if (missingRequiredFields.length > 0) {
      alert("You are missing the following " + missingRequiredFields.length + " required fields: " + missingRequiredFields.join(", ")); 
      console.log("not submitted, missing required field(s) [" + missingRequiredFields.join(",") + "]")
      return
    }

    let oldLocalStorage = JSON.parse(localStorage.getItem("matchData"))
    localStorage.setItem("matchData", JSON.stringify([...((oldLocalStorage === null) ? [] : oldLocalStorage), data]))

    try {
      let successfullySubmitted = this.writeMatchDataToDB(data)
      if (!successfullySubmitted) {
        throw "Database error: The database refused to accept the data (idk)."
      }
      else {
        alert("Successfully submitted data to database."); 
        this.wipeForm()

      } 
    }
    catch (e) {
      console.log(e)
      alert("Something went wrong. Please try again.")
      return
    }
    
  }

  exportDataToCSV =() => {
    let cachedDataJSON = (JSON.parse(localStorage.getItem("matchData")))
    let cachedDataCSV = ""
    for (let element in this.state.interactables) {
      cachedDataCSV += this.state.interactables[element].title + ","
    }

    if (cachedDataJSON != null){
      for (let i = 0; i < cachedDataJSON.length; i++){
        for (let e = 0; e < cachedDataJSON[i].length; e++){
          cachedDataCSV += cachedDataJSON[i][e][1] + ","
        }
        cachedDataCSV += "\n"
      }
    }


    let file = new Blob([cachedDataCSV], {type: "text/csv"})
    let blobURL = window.URL.createObjectURL(file)

    const anchor = document.createElement('a');
    anchor.href = blobURL
    anchor.target = "_blank"
    anchor.download = "matchData.csv"
 
    anchor.click()
 
    URL.revokeObjectURL(blobURL);
  }

  getInteractable = (id) => {
    return this.state.interactables.filter((item) => (item.id === id))[0]
  }

  logoClick = () => {
    this.setState({
      clicks: (this.state.clicks === undefined ? 1 : this.state.clicks) + 1
    })
    if (this.state.clicks > 1) {
      alert("You have clicked the logo " + this.state.clicks + " times. You have no life.")
      console.log(
`%cThis scouting application was made by Adam Webb, an alumni of FRC Team 4738, the Patribots. 
This application is open source and can be found at https://github.com/Faraday-dot-py/Simple-ASF
I hope you enjoy using this application as much as I enjoyed making it, and good luck to you in your competition!

PS. If you're reading this, you either really have no life or you are a developer (same thing either way). 
If you are a developer, please consider contributing to this project. I would love to see this project grow and become a useful tool for scouting teams around the world. 
If you are a user, please consider sharing this application with other teams. 
Also, feel free to make a pull request if you have any ideas for improvements or new features. Thanks!`, "font-weight: bold")
    }
  }

  render () {
    return (
      <div className="app">
        <image src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR71FESRUZEUb2_52JI8EZhNkaQ3fn0p1vFU8UANUePHUI2qQbzsFqS12lnWCv1Fj6S87k&usqp=CAU"}></image>
        <ul className="outer-container">
          {Object.keys(layout).map((item) => {   
            if (isInteractable(layout[item].type)) {
            }
            switch (layout[item].type) {
              case "header":
                return <h1          id={layout[item].id} className={layout[item].decorator}>{layout[item].value}</h1>
              case "label":
                return <h3          id={layout[item].id} className={layout[item].decorator}>{layout[item].value}</h3>
              case "checkbox":
                return <CheckBox    id={layout[item].id} title={layout[item].title + (renderRequiredStars ? (layout[item].required ? " *" : "") : "")} decorator={layout[item].decorator} value={layout[item].value} resetToValue={layout[item].resetToValue} changeHandler={this.handleCheckBoxChange}/>
              case "textbox":
                return <TextBox     id={layout[item].id} title={layout[item].title + (renderRequiredStars ? (layout[item].required ? " *" : "") : "")} decorator={layout[item].decorator} value={this.getInteractable(layout[item].id).value} resetToValue={layout[item].resetToValue} changeHandler={this.handleTextBoxChange}/>
              case "textboxlong":
                return <TextBoxLong id={layout[item].id} title={layout[item].title + (renderRequiredStars ? (layout[item].required ? " *" : "") : "")} decorator={layout[item].decorator} value={layout[item].value} resetToValue={layout[item].resetToValue} changeHandler={this.handleTextBoxChange}/>
              case "counter":
                return <Counter     id={layout[item].id} title={layout[item].title + (renderRequiredStars ? (layout[item].required ? " *" : "") : "")} decorator={layout[item].decorator} value={layout[item].value} resetToValue={layout[item].resetToValue} changeHandler={this.handleCounterChange} increment={layout[item].increment} maxValue={layout[item].maxValue} minValue={layout[item].minValue}/>
              case "dropdown":
                return <Dropdown    id={layout[item].id} title={layout[item].title + (renderRequiredStars ? (layout[item].required ? " *" : "") : "")} decorator={layout[item].decorator} value={layout[item].value} resetToValue={layout[item].resetToValue} changeHandler={this.handleDropdownChange} options={layout[item].options}/>
              case "submit":
                return <span className='widget submit-container'><button      id={layout[item.id]} className={"submit " + (this.decorator ? this.decorator : "")} onClick={this.handleFormSubmit}>{layout[item].title}</button></span>
              case "export":
                return <button onClick={this.exportDataToCSV}>{layout[item].title}</button>
              default:
                return <div>error: undefined widget type [{layout[item.type]}]</div>
            }
          })}
          
          <img src={logo} alt="Patribots Logo" style={{height:0,width:0}} onClick={this.logoClick}/>
        </ul>
      </div>
    );
  }
}

export default Container;
