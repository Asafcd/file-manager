// Import the functions you need from the SDKs you need
import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyAautxho1wg-3u8PEhy9xBgbFF3h0Oc660",
  authDomain: "filemanager-fb0d3.firebaseapp.com",
  projectId: "filemanager-fb0d3",
  storageBucket: "filemanager-fb0d3.appspot.com",
  messagingSenderId: "495614580484",
  appId: "1:495614580484:web:0d271055c6ce96227a2251",
  measurementId: "G-0DE6HJEB52"
};

// Initialize Firebase
export const app: FirebaseApp = initializeApp(firebaseConfig);
//const analytics: Anaytics = getAnalytics(app);