import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


//TODO: move these values to .env in a moment

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string,
};

// const firebaseConfig = {
//   apiKey: process.env.VITE_FIREBASE_API_KEY as string,
//   authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN as string,
//   projectId: process.env.VITE_FIREBASE_PROJECT_ID as string,
//   storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET as string,
//   messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string,
//   appId: process.env.VITE_FIREBASE_APP_ID as string,
// };

// TEMP: debug – check they’re not undefined
console.log("firebaseConfig", firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore instance
export const db = getFirestore(app);