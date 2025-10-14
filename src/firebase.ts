// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDXyN2RU9o4iBWzQiZ2vWaA8dylMygbdbo",
  authDomain: "neistra-e68ee.firebaseapp.com",
  projectId: "neistra-e68ee",
  storageBucket: "neistra-e68ee.firebasestorage.app",
  messagingSenderId: "1025779123511",
  appId: "1:1025779123511:web:bb4af2af5ad4e266f686b2",
  measurementId: "G-CP2PE02EV9"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app);

export { app }