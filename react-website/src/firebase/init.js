// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCKXXLumTz5Z2FUonm7u49icRNgY7QzYM",
  authDomain: "rent-estate-soltysik.firebaseapp.com",
  projectId: "rent-estate-soltysik",
  storageBucket: "rent-estate-soltysik.appspot.com",
  messagingSenderId: "56459769633",
  appId: "1:56459769633:web:0f740b81e5cf33971a3060",
  measurementId: "G-LXN033ZLKB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
