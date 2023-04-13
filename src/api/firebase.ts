// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { ref, set, get, getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBrd6G-4ugBkgeln1RfHDLO5yoNRJ9i30s',
  authDomain: 'sangshop-8c6ab.firebaseapp.com',
  databaseURL:
    'https://sangshop-8c6ab-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'sangshop-8c6ab',
  storageBucket: 'sangshop-8c6ab.appspot.com',
  messagingSenderId: '923430359659',
  appId: '1:923430359659:web:158b088b8776a2af8c172e',
  measurementId: 'G-64ED80KLRC',
};

const provider = new GoogleAuthProvider();

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export async function login() {
  return signInWithPopup(auth, provider) //
    .catch((error) => {
      console.error(error);
    });
}

export async function logout() {
  return signOut(auth)
    .then(() => {
      return true;
    })
    .catch((error) => {
      return error;
    });
}

export async function checkLoginUser(callback: any) {
  return onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;
    return callback(updatedUser);
  });
}

async function adminUser(user: any) {
  return get(ref(database, 'admins')) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        const adminList = snapshot.val();
        const isAdmin = adminList.includes(user.uid);
        return { ...user, isAdmin };
      }
    });
}
