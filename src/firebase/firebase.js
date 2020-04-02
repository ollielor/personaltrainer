import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyBintaH7o2G0gSFC_H1DjFn-5MxhOq4zsA",
  authDomain: "personaltrainer-bf0e6.firebaseapp.com",
  databaseURL: "https://personaltrainer-bf0e6.firebaseio.com",
  projectId: "personaltrainer-bf0e6",
  storageBucket: "personaltrainer-bf0e6.appspot.com",
  messagingSenderId: "858883033950",
  appId: "1:858883033950:web:c0a6eeeeabc24f711fddcf",
  measurementId: "G-G5SX95RPD1"
};

class Firebase {
  
constructor() {
  firebase.initializeApp(config);
  this.auth = firebase.auth();
  this.db = firebase.database();
  this.googleProvider = new firebase.auth.GoogleAuthProvider();
  this.facebookProvider = new firebase.auth.FacebookAuthProvider();
}

//this.facebookProvider = new firebase.auth.FacebookAuthProvider();



  doSignInWithFacebook = () => this.auth.signInWithPopup(this.facebookProvider);

}

export const myFirebase = firebase.initializeApp(config);
const baseDb = myFirebase.firestore();
export const db = baseDb;