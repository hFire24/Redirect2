// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLGnZofbiB1R8TNEZsGJvqk108dpiUTj4",
  authDomain: "website-blocker-d5829.firebaseapp.com",
  projectId: "website-blocker-d5829",
  storageBucket: "website-blocker-d5829.appspot.com",
  messagingSenderId: "784139671434",
  appId: "1:784139671434:web:7ed7df0c3c38fa76bc1a73"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const dbQuotesRef = collection(db, "quotes");
export const dbBreaksRef = collection(db, "breaks");
export const dbUsersRef = collection(db, "users");