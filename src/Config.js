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
    apiKey: "AIzaSyBajuvTmSR2iH0XEREq5oN3_3xgyDKAsb4",
    authDomain: "scouting-17347.firebaseapp.com",
    databaseURL: "https://scouting-17347-default-rtdb.firebaseio.com",
    projectId: "scouting-17347",
    storageBucket: "scouting-17347.appspot.com",
    messagingSenderId: "796953968153",
    appId: "1:796953968153:web:2d8790b1dd59839826f488",
    measurementId: "G-3L83MMR427"
  };

const app = initializeApp(firebaseConfig)
const db = getDatabase(app);
export {db, firebaseConfig, sortMetrics };

