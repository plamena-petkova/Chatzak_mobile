// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'firebase/compat/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGdua-EE7hE-dhcL4VbfZ_MJiF6HPu1R0",
  authDomain: "chatzak-e93ad.firebaseapp.com",
  projectId: "chatzak-e93ad",
  storageBucket: "chatzak-e93ad.appspot.com",
  messagingSenderId: "990780005664",
  appId: "1:990780005664:web:e2f5afe5bba1b375934b45",
  measurementId: "G-0BG61SL48S"
};

// Initialize Firebase
if(firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export {firebase};