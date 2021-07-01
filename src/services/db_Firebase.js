import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

export const initializeFirebase = () => {
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
}

export const login = async (email, password) => {
  initializeFirebase();

  return await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(async () => {
      const { name } = await getDataUser();
      localStorage.setItem('username', name);
      return true;
    })
    .catch(() => {
      return false;
    })
};

export const logout = () => {
  firebase.auth().signOut().then(() => {
    return true;
  }).catch(() => {
    return false;
  });
  return false;
}

export const register = async values => {
  initializeFirebase();

  await firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
    .then((userCredential) => {
      delete values["email"];
      delete values["password"];

      firebase.database().ref('users/' + userCredential.user.uid).set({
        data: values
      }).then(() => {
        localStorage.setItem('username', values.name);
        return true
      }).catch(() => {
        alert('Erro desconhecido, por favor tente novamente mais tarde');
      });
    }).catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        alert('Esse email já esta em uso, por favor utilize outro email');
      }
      return false;
    });
}

export const edit = async values => {
  initializeFirebase();

  const { uid } = firebase.auth().currentUser;
  delete values["email"];
  delete values["password"];

  await firebase.database().ref('users/' + uid).set({
    data: values
  }).then(() => {
    localStorage.setItem('username', values.name);
  }).catch(() => {
    alert('Erro desconhecido, por favor tente novamente mais tarde');
  });
};

export const getDataUser = async () => {
  initializeFirebase();

  if (firebase.auth().currentUser) {
    const { uid } = firebase.auth().currentUser;
    const dbRef = firebase.database().ref();

    return await dbRef.child("users").child(uid).get().then((data) => {
      if (data.exists()) {
        return data.val().data;
      } else {
        return null;
      }
    }).catch((error) => {
      console.error(error);
    });
  }
  return {};
};

export const deleteAccount = async () => {
  // initializeFirebase();

  const user = firebase.auth().currentUser;
  try {
    await user.delete();
    return true;
  } catch (e) {
    return false;
  }
}