import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "agentflow-a156c.firebaseapp.com",
  projectId: "agentflow-a156c",
  storageBucket: "agentflow-a156c.firebasestorage.app",
  messagingSenderId: "102748269128",
  appId: "1:102748269128:web:dae03f4cb334ebd67ec67d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

export const googleProvider = new GoogleAuthProvider
