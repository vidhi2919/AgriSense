// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCjM8_BGEx2hzU8_LhtGgsGKaYImk4o1Bw",
  authDomain: "agrisense-600a8.firebaseapp.com",
  projectId: "agrisense-600a8",
  storageBucket: "agrisense-600a8.appspot.com", // ✅ fixed
  messagingSenderId: "437756201471",
  appId: "1:437756201471:web:2e2bae019479f16b7a3fca",
  // measurementId: "G-ZBV6BJJMYR" // optional
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { auth };
