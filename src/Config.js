import { getDatabase } from "firebase/database";
import firebase from 'firebase/compat/app';
import { initializeApp } from 'firebase/app';
// ONLY EDIT HERE
const sortMetrics = ["Match Number", "Team Number"]

// DO NOT EDIT BELOW
//---------------------------------------

// const firebaseConfig = {
//     apiKey: process.envbutuntracked.REACT_APP_API_KEY,
//     authDomain: process.envbutuntracked.REACT_APP_AUTH_DOMAIN,
//     databaseURL: process.envbutuntracked.REACT_APP_DATABASE_URL,
//     projectId:  process.envbutuntracked.REACT_APP_PROJECT_ID,
//     storageBucket:  process.envbutuntracked.REACT_APP_STORAGE_BUCKET,
//     messagingSenderId:  process.envbutuntracked.REACT_APP_MESSAGING_SENDER_ID,
//     appId:  process.envbutuntracked.REACT_APP_APP_ID,
//     measurementId:  process.envbutuntracked.REACT_APP_MEASUREMENT_ID
// };

const firebaseConfig = {
  apiKey: "AIzaSyADPvITfvuVYqQA5NWhdZeyw_fcA62rii4",
  authDomain: "scouting-website-ee380.firebaseapp.com",
  databaseURL: "https://scouting-website-ee380-default-rtdb.firebaseio.com",
  projectId: "scouting-website-ee380",
  storageBucket: "scouting-website-ee380.appspot.com",
  messagingSenderId: "415208050900",
  appId: "1:415208050900:web:674769095c12e3eaab6b41",
  measurementId: "G-NR2HGV6G2G"
  };

const app = initializeApp(firebaseConfig)
const db = getDatabase(app);
export {db, firebaseConfig, sortMetrics };

