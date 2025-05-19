import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDK-3nSouPkt9nxvCJuxbxY8mlN6Q3rJpQ",
  authDomain: "react-to-do-list-c5789.firebaseapp.com",
  projectId: "react-to-do-list-c5789",
  storageBucket: "react-to-do-list-c5789.firebasestorage.app",
  messagingSenderId: "10990347249",
  appId: "1:10990347249:web:15af8b51d49c86f37d1a50",
  measurementId: "G-VWNT682MW2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);