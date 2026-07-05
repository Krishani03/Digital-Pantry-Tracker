// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZFmbMDI_SrnVElMwM3FRjQ3AYyY_OzDc",
  authDomain: "digital-pantry-tracker.firebaseapp.com",
  projectId: "digital-pantry-tracker",
  storageBucket: "digital-pantry-tracker.firebasestorage.app",
  messagingSenderId: "412671197376",
  appId: "1:412671197376:web:5e02c96ce512d3aa9eed25"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);