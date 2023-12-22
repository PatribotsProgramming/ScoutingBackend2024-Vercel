
/**
 *  --- TODO ---
 * Firebase backend -- COMPLETE
 * Scouting Visualization With Simple ASF???
 * Required Fields (with required field datatypes)
 * Optional upper and lower bounds for counters
 * Save data to local storage
 * Write an actual function to clear the form 
 * Rewrite the whole damn thing
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
 */

import logo from './logo.svg';
import notFound from 'C:/Users/adame/Documents/Programming/Robotics/Simple-ASF/src/images/notFound.png'
import patribotsLogo from './images/patribotsLogo.png'
import './App.css';

import CheckBox from './widgets/CheckBox';
import TextBox from './widgets/TextBox'
import TextBoxLong from './widgets/TextBoxLong'
import Counter from './widgets/Counter'
import Submit from './widgets/Submit'
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


class Container extends React.Component{

  

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

  handleFormSubmit = (e) =>{
    e.preventDefault()

    let data = this.gatherData()
    
    let successfullySubmitted = this.writeMatchDataToDB(data)
    
    if (successfullySubmitted) {this.wipeForm(); console.log("submitted")}
    
  }

  render () {
    return (
      <ul className="container">
        
        
      </ul>
    );
  }
}

export default Container;
