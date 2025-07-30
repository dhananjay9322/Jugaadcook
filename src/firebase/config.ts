import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB-AyzMFPUAf1XF4ilgqlJg_ivcevskcJI",
  authDomain: "jugaadcook-app-b4784.firebaseapp.com",
  projectId: "jugaadcook-app-b4784",
  storageBucket: "jugaadcook-app-b4784.firebasestorage.app",
  messagingSenderId: "271076439996",
  appId: "1:271076439996:web:4aad5b60650b54d5c2ddb9",
  measurementId: "G-CMDGC4CD85"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app; 