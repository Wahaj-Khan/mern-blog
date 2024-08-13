// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-52d1e.firebaseapp.com",
  projectId: "mern-blog-52d1e",
  storageBucket: "mern-blog-52d1e.appspot.com",
  messagingSenderId: "191478894670",
  appId: "1:191478894670:web:6412224fae73c63127f31f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);