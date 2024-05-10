// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'firebase/compat/storage';
import { initializeApp } from "firebase/compat/app";
import { getStorage } from "firebase/compat/storage";
import Constants from 'expo-constants';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: Constants.API_KEY,
  authDomain: Constants.AUTH_DOMAIN,
  projectId: Constants.PROJECT_ID,
  storageBucket: Constants.STORAGE_BUCKET,
  messagingSenderId: Constants.MESSAGING_SENDER_ID,
  appId: Constants.APP_ID,
  measurementId: Constants.MEASUREMENT_ID,
};

console.log('Storage bucket', Constants.API_KEY)

 //Initialize Firebase
//if(firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
//}


export {firebase};