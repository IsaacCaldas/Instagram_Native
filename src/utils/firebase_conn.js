import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyA_NPe_QSECIKbYcb3X4a_qXm3qFLA66wg",
  authDomain: "instaclone-4fed6.firebaseapp.com",
  databaseURL: "https://instaclone-4fed6-default-rtdb.firebaseio.com",
  projectId: "instaclone-4fed6",
  storageBucket: "instaclone-4fed6.appspot.com",
  messagingSenderId: "104053349396",
  appId: "1:104053349396:web:9682dbc07b57f6c5d75b01"
}

// Initialize Firebase
if(!firebase.apps.length){
  // open the connection
  firebase.initializeApp(firebaseConfig)
}

export default firebase
