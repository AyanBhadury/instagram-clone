//import firebase from "firebase";

import firebase from 'firebase/app';
import 'firebase/database'; 
import 'firebase/storage';  
import 'firebase/auth';
import 'firebase/firestore';     

const firebaseConfig = {
  apiKey: "AIzaSyC2z5ENaigHjoduocMOQmR_-bvByoOaic0",
  authDomain: "instagram-clone-efedf.firebaseapp.com",
  databaseURL: "https://instagram-clone-efedf.firebaseio.com",
  projectId: "instagram-clone-efedf",
  storageBucket: "instagram-clone-efedf.appspot.com",
  messagingSenderId: "278615602230",
  appId: "1:278615602230:web:69f96c8b9193ec61459497",
  measurementId: "G-90BGL93K70",
};

//export default firebaseConfig;

// Initialize Firebase with a "default" Firebase project
const firebaseApp = firebase.initializeApp(firebaseConfig);

//console.log(firebaseApp.firestore()); // "[DEFAULT]"

// Option 1: Access Firebase services via the defaultProject variable
const storage = firebaseApp.storage();
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const firestore = firebaseApp.firestore();

export { storage, db, auth, firestore };
