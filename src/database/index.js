// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const {
	getDatabase,
	ref,
	set,
	child,
	get,
	remove,
	update,
} = require("firebase/database");

const firebaseStorage = require("firebase/storage");
const { getStorage, uploadBytes } = firebaseStorage;
const storageRef = firebaseStorage.ref;

require("dotenv").config();

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
	apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
	authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.VUE_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app);

module.exports = {
	db,
	storage,
	ref,
	set,
	child,
	get,
	remove,
	update,
	uploadBytes,
	storageRef,
};
