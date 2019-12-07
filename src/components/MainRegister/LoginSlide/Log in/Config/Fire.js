import firebase from 'firebase';

  // Your web app's Firebase configuration
  const config= {
    apiKey: "AIzaSyDHeKSuxsYiyyb0lEhHuw2E9pRARPbXAFw",
    authDomain: "login-5e72e.firebaseapp.com",
    databaseURL: "https://login-5e72e.firebaseio.com",
    projectId: "login-5e72e",
    storageBucket: "login-5e72e.appspot.com",
    messagingSenderId: "838425598428",
    appId: "1:838425598428:web:ed453d1c345eb9f3f05719"
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(config);
  export default fire;