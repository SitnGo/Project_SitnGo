import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyAEjOCmERrjnQpDEHCMPcfSUGKYs-qPP4I',
  authDomain: 'sitngo-8a880.firebaseapp.com',
  databaseURL: 'https://sitngo-8a880.firebaseio.com',
  projectId: 'sitngo-8a880',
  storageBucket: 'sitngo-8a880.appspot.com',
  messagingSenderId: '838425598428',
  appId: '1:838425598428:web:ed453d1c345eb9f3f05719'
};

const fire = firebase.initializeApp(config);
export default fire;