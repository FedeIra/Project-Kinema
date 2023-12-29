// Import the functions for SDKs:
const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const { getFirestore } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyCOQTIpN9NOsw53K_m7xjSN7oMFOihRIhI",
  authDomain: "first-try-6e607.firebaseapp.com",
  projectId: "first-try-6e607",
  storageBucket: "first-try-6e607.appspot.com",
  messagingSenderId: "848679521149",
  appId: "1:848679521149:web:2309eba141174fa2d25a14"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const firestore = getFirestore(app)

module.exports = {
	app,
	auth,
    firestore
}