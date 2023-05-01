import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDz3yEH3F-3c4x5YLGCQKMW_Mfdbr-aWbE",
    authDomain: "color-game-ebf3e.firebaseapp.com",
    databaseURL: "https://color-game-ebf3e-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "color-game-ebf3e",
    storageBucket: "color-game-ebf3e.appspot.com",
    messagingSenderId: "913213219952",
    appId: "1:913213219952:web:40e743b493490de7a580b5",
    measurementId: "G-5M626NZQX4"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
