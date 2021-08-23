import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyBNGh0bTO9mkqSmiqN0lGHSE69gjtQ4DYM",
	authDomain: "cryp-info.firebaseapp.com",
	projectId: "cryp-info",
	storageBucket: "cryp-info.appspot.com",
	messagingSenderId: "872750754853",
	appId: "1:872750754853:web:bea7da12922a4765b2a3cc",
});

export const db = firebase.database();
export const auth = firebaseApp.auth();
export default firebaseApp;
