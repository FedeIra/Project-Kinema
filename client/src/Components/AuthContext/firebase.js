// Import the functions for SDKs:
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: 'AIzaSyA71Ptkw2pB43zBfOlmWPWXTmIftrJOMbg',
  authDomain: 'first-try-6e607.firebaseapp.com',
  databaseURL: 'https://first-try-6e607-default-rtdb.firebaseio.com',
  projectId: 'first-try-6e607',
  storageBucket: 'first-try-6e607.appspot.com',
  messagingSenderId: '848679521149',
  appId: '1:848679521149:web:2309eba141174fa2d25a14',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
