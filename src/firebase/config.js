import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA_GfpCBU7615iCb3Pj5d3n8QG3qRSn9wc",
  authDomain: "pulsetrack-ead67.firebaseapp.com",
  projectId: "pulsetrack-ead67",
  storageBucket: "pulsetrack-ead67.firebasestorage.app",
  messagingSenderId: "881063892423",
  appId: "1:881063892423:web:cad84d5feff82d575e75e2",
  measurementId: "G-QKVJES017T"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);