// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwdMucLbfN13i6hO-ryaWVf0t2W-dbuB4",
  authDomain: "patitapp-dce25.firebaseapp.com",
  projectId: "patitapp-dce25",
  storageBucket: "patitapp-dce25.appspot.com",
  messagingSenderId: "203158461668",
  appId: "1:203158461668:web:caf737d5434444ae7f20f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth }
export { db }
export { storage, ref }