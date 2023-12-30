// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCx0MTWgzc7iOvBph0ebRK2vGThQh3UGZk",
  authDomain: "practice-firebase-fadd8.firebaseapp.com",
  projectId: "practice-firebase-fadd8",
  storageBucket: "practice-firebase-fadd8.appspot.com",
  messagingSenderId: "518688679869",
  appId: "1:518688679869:web:c9f0d500adbff6855ad4d4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;