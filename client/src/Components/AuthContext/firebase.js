// Import the functions for SDKs:
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
import { initializeFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: '',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
});

export { auth, firestore };
