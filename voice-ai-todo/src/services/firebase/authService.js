import { auth, db } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

// Register user + save role
export const registerUser = async (email, password, role) => {
  const userCred = await createUserWithEmailAndPassword(auth, email, password);

  // Save user role in Firestore
  await setDoc(doc(db, "users", userCred.user.uid), {
    email,
    role,
    createdAt: Date.now(),
  });

  return userCred.user;
};

// Login
export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Get user role
export const getUserRole = async (uid) => {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? snap.data().role : null;
};

// Logout
export const logoutUser = () => signOut(auth);
