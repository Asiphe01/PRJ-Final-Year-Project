import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYCthabtreC5fjYhAP5t2lTKJrk0Hp8ko",
  authDomain: "prj361-heart-rate-system.firebaseapp.com",
  databaseURL: "https://prj361-heart-rate-system-default-rtdb.firebaseio.com",
  projectId: "prj361-heart-rate-system",
  storageBucket: "prj361-heart-rate-system.firebasestorage.app",
  messagingSenderId: "170635785860",
  appId: "1:170635785860:web:f3652adfdaf5b6cd64f4d1",
  measurementId: "G-L1WRKFQZ1Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);