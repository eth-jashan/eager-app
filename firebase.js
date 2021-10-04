import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyC26e6_s2iipp-vY6rx7qohbajCT9c9UDs",
  authDomain: "eager-app-dc4ed.firebaseapp.com",
  projectId: "eager-app-dc4ed",
  storageBucket: "eager-app-dc4ed.appspot.com",
  messagingSenderId: "586780535281",
  appId: "1:586780535281:web:39f9ca9d0a9305d8aebc50",
};

firebase.initializeApp(firebaseConfig);

export default firebase;