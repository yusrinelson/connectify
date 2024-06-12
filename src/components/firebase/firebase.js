// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCbQjdzXqwIaiP5zwMsALtq36kdenvmCb0",
  authDomain: "connectify-84e11.firebaseapp.com",
  projectId: "connectify-84e11",
  storageBucket: "connectify-84e11.appspot.com",
  messagingSenderId: "258283064129",
  appId: "1:258283064129:web:2f9f6c738210244c962fc0",
  measurementId: "G-39KZ86GYN8"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };