
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDT5KnHMY5mrZujDGBxip7qBOUlQxmMa4A",
  authDomain: "al-noor-store-owners.firebaseapp.com",
  projectId: "al-noor-store-owners",
  storageBucket: "al-noor-store-owners.firebasestorage.app",
  messagingSenderId: "790841443770",
  appId: "1:790841443770:web:94c58d2d40a817bf328983",
  measurementId: "G-CSFL3M67RH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Analytics
export const analytics = getAnalytics(app);

export default app;
