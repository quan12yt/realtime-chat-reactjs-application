import firebase from "firebase";

import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyDEa62_Tgt-INJC4vcLpfqSncIyzftET-A",
    authDomain: "chat-react-app-44070.firebaseapp.com",
    projectId: "chat-react-app-44070",
    storageBucket: "chat-react-app-44070.appspot.com",
    messagingSenderId: "976187516299",
    appId: "1:976187516299:web:ca1c4e957e71d49334bb8e",
    measurementId: "G-FCV6ZCJE1R"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  const auth = firebase.auth();
  const db = firebase.firestore();

  auth.useEmulator('http://localhost:9099');
  if(window.location.hostname === 'localhost'){
    db.useEmulator('localhost', '8080');
  }

  export { auth, db };
  export default firebase;