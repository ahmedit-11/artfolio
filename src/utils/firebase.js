// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAf-kQUJ5QAn43UIrE-L6HSEAO2lq_MGuE",
  authDomain: "artova-chat.firebaseapp.com",
  projectId: "artova-chat",
  storageBucket: "artova-chat.firebasestorage.app",
  messagingSenderId: "741940782782",
  appId: "1:741940782782:web:5ea4a3e57f93ca5298a0ef",
  measurementId: "G-FMT8MMQN24"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
