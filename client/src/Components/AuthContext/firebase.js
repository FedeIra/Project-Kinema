// Import the functions for SDKs:
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA71Ptkw2pB43zBfOlmWPWXTmIftrJOMbg',
  authDomain: 'first-try-6e607.firebaseapp.com',
  databaseURL: 'https://first-try-6e607-default-rtdb.firebaseio.com',
  projectId: 'first-try-6e607',
  storageBucket: 'first-try-6e607.appspot.com',
  messagingSenderId: '848679521149',
  appId: '1:848679521149:web:2309eba141174fa2d25a14',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
});

export { auth, firestore };
