import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD0iEBqq6uHQghONX4ELafdTXz0nZtYVsc",
  authDomain: "ecommerce-app-e328c.firebaseapp.com",
  projectId: "ecommerce-app-e328c",
  storageBucket: "ecommerce-app-e328c.appspot.com",
  messagingSenderId: "790327226582",
  appId: "1:790327226582:web:2ba40a42617e86e2d6d977"
};

const firebase = initializeApp(firebaseConfig);
export const db = getFirestore(firebase);
export const storage = getStorage(firebase);
export const auth = getAuth(firebase);
