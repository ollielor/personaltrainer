import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBintaH7o2G0gSFC_H1DjFn-5MxhOq4zsA",
    authDomain: "personaltrainer-bf0e6.firebaseapp.com",
    databaseURL: "https://personaltrainer-bf0e6.firebaseio.com",
    projectId: "personaltrainer-bf0e6",
    storageBucket: "personaltrainer-bf0e6.appspot.com",
    messagingSenderId: "858883033950",
    appId: "1:858883033950:web:c0a6eeeeabc24f711fddcf",
    measurementId: "G-G5SX95RPD1"
  };

export const myFirebase = firebase.initializeApp(firebaseConfig);
const baseDb = myFirebase.firestore();
export const db = baseDb;