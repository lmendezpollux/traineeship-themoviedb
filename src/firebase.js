import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAmdKCUZ6N6Hd_sfWYDr9rAlVZfIKelUfA",
  authDomain: "moviesvue-4d805.firebaseapp.com",
  projectId: "moviesvue-4d805",
  storageBucket: "moviesvue-4d805.appspot.com",
  messagingSenderId: "797007159461",
  appId: "1:797007159461:web:d022a8d6890aac251a6d4c",
};

const app = initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)

//Parte de la autentifiacion
export {getAuth, signInWithPopup, signOut} 

export default app;
