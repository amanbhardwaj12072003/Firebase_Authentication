import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBgFlXpCk57m0-BsPDyzSHWfAh-2ftr3uo",
  authDomain: "learnfirebaseauth-b9a73.firebaseapp.com",
  projectId: "learnfirebaseauth-b9a73",
  storageBucket: "learnfirebaseauth-b9a73.appspot.com",
  messagingSenderId: "31816309393",
  appId: "1:31816309393:web:c184430fdd8ce35c9f7d30",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export { app, auth };
