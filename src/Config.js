import { getDatabase } from "firebase/database";
import firebase from 'firebase/compat/app';

// ONLY EDIT HERE
const sortMetrics = ["Match Number", "Team Number"]

// DO NOT EDIT BELOW
//---------------------------------------

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId:  process.env.REACT_APP_PROJECT_ID,
    storageBucket:  process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId:  process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId:  process.env.REACT_APP_APP_ID,
    measurementId:  process.env.REACT_APP_MEASUREMENT_ID
};

if(firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

const db = getDatabase();
export {db, firebaseConfig, sortMetrics };