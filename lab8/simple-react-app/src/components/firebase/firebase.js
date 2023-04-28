import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAiFEg00HrDSuNB7N9Yh6XsRLlk-8pLo3w",
    authDomain: "front-end-znu.firebaseapp.com",
    projectId: "front-end-znu",
    storageBucket: "front-end-znu.appspot.com",
    messagingSenderId: "422630440039",
    appId: "1:422630440039:web:87efcafa3783efb1f668c2",
    measurementId: "G-CB483N68F0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
