
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDZeBEbuKrOlIJ_8Hm_gqQYwObheQrKGs8",
    authDomain: "todo-list-222aa.firebaseapp.com",
    projectId: "todo-list-222aa",
    storageBucket: "todo-list-222aa.firebasestorage.app",
    messagingSenderId: "261017993658",
    appId: "1:261017993658:web:f06ae46c4d3543d67f5d83",
    measurementId: "G-GR7WVGQN2B"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);