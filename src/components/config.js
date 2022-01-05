// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_o1TKHZBdWXFYlrjPK5sEyLMOxLZb5EA",
  authDomain: "authtest-471db.firebaseapp.com",
  projectId: "authtest-471db",
  storageBucket: "authtest-471db.appspot.com",
  messagingSenderId: "987938896712",
  appId: "1:987938896712:web:d86c4943deee0677da917d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app)


export default fireDB