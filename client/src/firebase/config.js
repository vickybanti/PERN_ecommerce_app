import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage"

//input firebase settings here

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
 export const firebaseConfig = {
  apiKey: "AIzaSyBP1x-s_0ZeGArntlOr67YAz-8Z5ef5L4A",
  authDomain: "mooreplaza-ff46d.firebaseapp.com",
  projectId: "mooreplaza-ff46d",
  storageBucket: "mooreplaza-ff46d.appspot.com",
  messagingSenderId: "306312021058",
  appId: "1:306312021058:web:449b2e2fb8c71087da59db"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app);
export default app;