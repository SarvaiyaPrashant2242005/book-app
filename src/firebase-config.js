// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIf4cnh9PMEgA53Mi160xk4dmlYpgQH7Q",
  authDomain: "mu-test-fire-2025.firebaseapp.com",
  projectId: "mu-test-fire-2025",
  storageBucket: "mu-test-fire-2025.firebasestorage.app",
  messagingSenderId: "331974042670",
  appId: "1:331974042670:web:1683e8fc1141394c486bbf",
  measurementId: "G-XNFPXBD1YR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);