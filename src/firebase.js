// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "housify-c8495.firebaseapp.com",
  projectId: "housify-c8495",
  storageBucket: "housify-c8495.appspot.com",
  messagingSenderId: "47348158664",
  appId: "1:47348158664:web:45188065e779ea2b8e15fd"
};

// Initialize Firebase
export  const app = initializeApp(firebaseConfig);