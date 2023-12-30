// Import the functions for SDKs:
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
});

export { auth, firestore };
