
import { initializeApp } from "firebase/app"
// import { getAnalytics } from "firebase/analytics"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBNZefCjbTDcW8JED50xWgApcz5w9kj90U",
  authDomain: "test1-f2c60.firebaseapp.com",
  projectId: "test1-f2c60",
  storageBucket: "test1-f2c60.appspot.com",
  messagingSenderId: "715406216677",
  appId: "1:715406216677:web:808727ac713e830466b30c",
  measurementId: "G-4DVJF3H5Z4"
};


const app = initializeApp(firebaseConfig)
const db = getFirestore(app)


export {
    db
}