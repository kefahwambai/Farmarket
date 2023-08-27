// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOQ_xLaUy8n6Jb4t9EQBjIexoDD2oSa6g",
  authDomain: "farmarket-7bd69.firebaseapp.com",
  projectId: "farmarket-7bd69",
  storageBucket: "farmarket-7bd69.appspot.com",
  messagingSenderId: "106432482098",
  appId: "1:106432482098:web:0e545a335dc2457728652b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);
