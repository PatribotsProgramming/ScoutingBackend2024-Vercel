// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_JpLIerXg9Y4sN1WxVsZwi7-hMGSfj9Q",
  authDomain: "simple-asf.firebaseapp.com",
  projectId: "simple-asf",
  storageBucket: "simple-asf.appspot.com",
  messagingSenderId: "566920479564",
  appId: "1:566920479564:web:7ded2e6c23388c02a245e9",
  measurementId: "G-1TFHYXKQRF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

async function getCities(db) {
    const citiesCol = collection(db, 'cities');
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map(doc => doc.data());
    return cityList;
  }