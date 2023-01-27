import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const app = firebase.initializeApp({
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORATE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER,
  // appId: process.env.REACT_APP_FIREBASE_APP_ID,
  // measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  apiKey: "AIzaSyBeLz6xHL9lFidjtdWCvFqHtPDfC77Onow",
  authDomain: "queen-of-cards-dev.firebaseapp.com",
  projectId: "queen-of-cards-dev",
  storageBucket: "queen-of-cards-dev.appspot.com",
  messagingSenderId: "90293615725",
  appId: "1:90293615725:web:ac54d1638911a54e89d364",
  measurementId: "G-EYEJN96TMD",
});

export const auth = getAuth(app);
export const db = getDatabase(app);
export default app;
