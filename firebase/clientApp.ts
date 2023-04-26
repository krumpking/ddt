import { initializeApp } from "firebase/app";
import { getStorage, } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDuvQcyUFddnVJsworsw1M0V9dYCA3U2fI",
    authDomain: "digitaldatatreeglobal.firebaseapp.com",
    projectId: "digitaldatatreeglobal",
    storageBucket: "digitaldatatreeglobal.appspot.com",
    messagingSenderId: "385959227937",
    appId: "1:385959227937:web:ae75bbf59311391f70e960",
    measurementId: "G-EG2R1271VF"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);
const firestore = getFirestore(app);
const auth = getAuth(app);

export { storage, firestore, auth };