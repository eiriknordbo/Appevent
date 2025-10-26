import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
export const firebaseConfig = {
    apiKey: "AIzaSyCka8_VOfHCbNVZ5YtWgxTt_HYal9HwI7c",
    authDomain: "appevent-9ca9c.firebaseapp.com",
    projectId: "appevent-9ca9c",
    storageBucket: "appevent-9ca9c.firebasestorage.app",
    messagingSenderId: "1004515606391",
    appId: "1:1004515606391:web:d39ff840064f39a24b2b72",
    measurementId: "G-GE4KB8GH2Q"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const db = getFirestore(app);