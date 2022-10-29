// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6lEFULZWT8B9LlQgmmCTzvyKV6xF9g_Y",
  authDomain: "pixegami-online-store.firebaseapp.com",
  projectId: "pixegami-online-store",
  storageBucket: "pixegami-online-store.appspot.com",
  messagingSenderId: "65159947925",
  appId: "1:65159947925:web:721a96140e7a93b5a9dd9c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Export function to initialize firebase.
export const initFirebase = () => {
  return app;
};
