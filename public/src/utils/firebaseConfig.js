import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCE7recH7XCmD8R_xgRAuBkINTmBFHn2l4",
  authDomain: "michat-app-5cfff.firebaseapp.com",
  projectId: "michat-app-5cfff",
  storageBucket: "michat-app-5cfff.appspot.com",
  messagingSenderId: "292510293229",
  appId: "1:292510293229:web:1a68fc0e64c940b2ad40e4",
  measurementId: "G-21RYHDJM39",
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app)
