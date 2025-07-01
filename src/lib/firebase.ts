
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDT5KnHMY5mrZujDGBxip7qBOUlQxmMa4A",
  authDomain: "al-noor-store-owners.firebaseapp.com",
  projectId: "al-noor-store-owners",
  storageBucket: "al-noor-store-owners.appspot.com",
  messagingSenderId: "790841443770",
  appId: "1:790841443770:web:e4f43c232a2d5fab328983",
  measurementId: "G-2B8FGKDXF0"
};

// Initialize Firebase only if no apps exist
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Analytics (only in browser environment)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;
