// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider  } from "firebase/auth";  // Import the authentication module
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { RecaptchaVerifier } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // Initialize Firebase Authentication
const googleProvider = new GoogleAuthProvider();
// Initialize Firebase Authentication and export it

 // Use getAuth() to initialize auth
export default app;
export { db ,auth,googleProvider  }; // Export Firestore instance for use in your app
export { RecaptchaVerifier }; // Export RecaptchaVerifier for use in your app
