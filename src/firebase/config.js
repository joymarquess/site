import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyChfv18929uqJQbYD_1LzTFibhjLzJTIfo",
  authDomain: "necessito-de-nota.firebaseapp.com",
  projectId: "necessito-de-nota",
  storageBucket: "necessito-de-nota.firebasestorage.app",
  messagingSenderId: "17043496970",
  appId: "1:17043496970:web:a97066eb961f2d5d2a3ff3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const messaging = getMessaging(app);