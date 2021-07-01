import { useHistory } from 'react-router-dom';

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const CheckLogged = () => {
  const history = useHistory();

  const firebaseConfig = {
    apiKey: "AIzaSyDyAj3VngZtLGgaOXkSmipd98RL7-2aYpY",
    authDomain: "prova-pratica-pontotel.firebaseapp.com",
    projectId: "prova-pratica-pontotel",
    storageBucket: "prova-pratica-pontotel.appspot.com",
    messagingSenderId: "106703126556",
    appId: "1:106703126556:web:9887dd95dd517c5c531fd9"
  };

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      history.push('/login');
    }
  });

}

export default CheckLogged;