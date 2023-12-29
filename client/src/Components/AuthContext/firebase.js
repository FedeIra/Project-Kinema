// Import the functions for SDKs:
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: 'probando',
  authDomain: 'probando',
  databaseURL: 'probando',
  projectId: 'probando',
  storageBucket: 'probando',
  messagingSenderId: 'probando',
  appId: 'probando',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
