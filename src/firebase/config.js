// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore/lite"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD39P_EOjkFO11m6wqe-V2Ieq4YLihtXMw",
  authDomain: "e-productos.firebaseapp.com",
  projectId: "e-productos",
  storageBucket: "e-productos.appspot.com",
  messagingSenderId: "121887174070",
  appId: "1:121887174070:web:603ec4b81ec7e9f17d6517"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
