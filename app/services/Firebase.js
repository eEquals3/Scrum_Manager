// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA9gyR2Vzlx4Wbp0nLY7JnTGPwYk2rkxMQ",
    authDomain: "scrum-manager-e0978.firebaseapp.com",
    projectId: "scrum-manager-e0978",
    storageBucket: "scrum-manager-e0978.appspot.com",
    messagingSenderId: "116287469649",
    appId: "1:116287469649:web:582bb4f590465ef21d6070"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
