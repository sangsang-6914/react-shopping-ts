import { IProduct } from './../interface/product';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { ref, set, get, getDatabase, remove } from 'firebase/database';
import { v4 as uuid } from 'uuid';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
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

export async function writeProduct(product: IProduct) {
  const id = uuid();
  const updatedProduct = {
    ...product,
    id,
    price: parseInt(product.price),
    options: product.options.split(','),
  };
  console.log(updatedProduct);
  return set(ref(database, `products/${id}`), updatedProduct);
}

export async function getProducts() {
  return get(ref(database, 'products')) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        const products = Object.values(snapshot.val());
        return products;
      }
    });
}

export async function addOrUpdateCart(uid: string, product: any) {
  return set(ref(database, `carts/${uid}/${product.id}`), product);
}

export async function getCarts(uid: string) {
  return get(ref(database, `carts/${uid}`)) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val()) || [];
      }
    });
}

export async function removeFromCart(uid: string, productId: string) {
  return remove(ref(database, `carts/${uid}/${productId}`));
}
