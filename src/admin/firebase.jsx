import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyDYbmCcH9XrIt4nCh6-pBfXgwvShD8Jhs8",
  authDomain: "hubtronics-e6ff0.firebaseapp.com",
  projectId: "hubtronics-e6ff0",
  storageBucket: "hubtronics-e6ff0.firebasestorage.app",
  messagingSenderId: "603923654373",
  appId: "1:603923654373:web:6227580ab420befbfd560c",
  measurementId: "G-YQSYEDMXCQ"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);



// Authentication instance
const auth = getAuth(app);

// Providers for Google and Facebook login
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// Firestore instance (optional, if you're using Firestore)
const db = getFirestore(app);

// Export functions for authentication
export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  googleProvider,
  onAuthStateChanged,
  facebookProvider,
  db,
};
