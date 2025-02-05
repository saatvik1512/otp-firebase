// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvuUzTT2AfSdVP-CN1fM6PUT2nKf3lXto",
  authDomain: "react-firebase-974fc.firebaseapp.com",
  projectId: "react-firebase-974fc",
  storageBucket: "react-firebase-974fc.firebasestorage.app",
  messagingSenderId: "260737893073",
  appId: "1:260737893073:web:41bb81da8ef98a27337bf0"
};

const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Export the auth object so it can be imported in App.jsx
export { auth };