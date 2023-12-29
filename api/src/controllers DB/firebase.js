// Import the functions for SDKs:
const { initializeApp } = require('firebase/app');
const { getAuth } = require('firebase/auth');
const { getFirestore } = require('firebase/firestore');
require(`dotenv`).config();
const {
  API_FIREBASE_KEY,
  API_FIREBASE_DOMAIN,
  API_FIREBASE_DATABASE,
  API_FIREBASE_PROJECTID,
  API_FIREBASE_BUCKET,
  API_FIREBASE_SENDER_ID,
  API_FIREBASE_APP_ID,
} = process.env;

const firebaseConfig = {
  apiKey: API_FIREBASE_KEY,
  authDomain: API_FIREBASE_DOMAIN,
  databaseURL: API_FIREBASE_DATABASE,
  projectId: API_FIREBASE_PROJECTID,
  storageBucket: API_FIREBASE_BUCKET,
  messagingSenderId: API_FIREBASE_SENDER_ID,
  appId: API_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

module.exports = {
  app,
  auth,
  firestore,
};
