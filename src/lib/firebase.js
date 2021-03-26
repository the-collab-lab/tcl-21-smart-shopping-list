// NOTE: import only the Firebase modules that you need in your app... except
// for the second line, which makes both the linter and react-firebase happy
import firebase from 'firebase/app';
import 'firebase/firestore';

// Initalize Firebase.
// These details will need to be replaced with the project specific env vars at the start of each new cohort.
var firebaseConfig = {
    apiKey: "AIzaSyBKy8LopIqrio-WObiRGd9j8kxz_uwDsh4",
    authDomain: "tcl-21-shopping-list.firebaseapp.com",
    projectId: "tcl-21-shopping-list",
    storageBucket: "tcl-21-shopping-list.appspot.com",
    messagingSenderId: "134327258988",
    appId: "1:134327258988:web:209dff8130019d1a082d49"
};

let fb = firebase.initializeApp(firebaseConfig);

export { fb };
