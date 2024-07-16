// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCyE2jnVPasr9iV0GZ8_B4hpn5nVdrmROM",
    authDomain: "moorestore-a6ea8.firebaseapp.com",
    projectId: "moorestore-a6ea8",
    storageBucket: "moorestore-a6ea8.appspot.com",
    messagingSenderId: "580264207855",
    appId: "1:580264207855:web:501e694ab243b25a35421a",
    measurementId: "G-Z81FPV5RE3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)

export const auth = getAuth(app)


onAuthStateChanged(auth, user => {
  if (user != null) {
    console.log("Logged in")
  } else {
    console.log("No user")
  }
})