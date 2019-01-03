import firebase from 'firebase'
import firestore from 'firebase/firestore'

  // Initialize Firebase
var config = {
    apiKey: "AIzaSyBh2KU9x34d6iY5Kp2LzXdl8Nsy51P-ql0",
    authDomain: "voting-app-7c486.firebaseapp.com",
    databaseURL: "https://voting-app-7c486.firebaseio.com",
    projectId: "voting-app-7c486",
    storageBucket: "",
    messagingSenderId: "919672877635"
  };

const firebaseApp= firebase.initializeApp(config);
firebaseApp.firestore().settings({timestampsInSnapshots:true})

export default firebaseApp.firestore();
