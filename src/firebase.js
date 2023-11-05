// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyCfGjmYiUUjW9hnc76fKrQGTNHC6GKZz6A",
//     authDomain: "hi88huy.firebaseapp.com",
//     databaseURL: "https://hi88huy-default-rtdb.asia-southeast1.firebasedatabase.app",
//     projectId: "hi88huy",
//     storageBucket: "hi88huy.appspot.com",
//     messagingSenderId: "263330634555",
//     appId: "1:263330634555:web:5d04303bce564ec749351e",
// };
const firebaseConfig = {
  apiKey: "AIzaSyACGzjs1S3QI8wipOXp7zBAmbLsRz3DNEQ",
  authDomain: "toolbl.firebaseapp.com",
  databaseURL: "https://toolbl-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "toolbl",
  storageBucket: "toolbl.appspot.com",
  messagingSenderId: "573318686600",
  appId: "1:573318686600:web:bc2295d398eecc6fe17c3d",
  measurementId: "G-L8ZSSXBQFX"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);
const auth = getAuth(app);
const dbstore = getFirestore(app);

export { db, auth, dbstore };