/* eslint-disable react/prop-types */
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebaseConfig";
import axiosPublic from "../Hooks/axiosPublic";
import Loader from "../Hooks/Loader";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);
  //google login
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //register user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //sign in user
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //sign out
  const signOutUser = () => {
    return signOut(auth);
  };

  const { data: products, isLoading } = Loader("/products", "products");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      const userEmail = currentUser?.email || user?.email;
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        axiosPublic.get(`/users/${userEmail}`).then((res) => {
          setUserData(res.data);
          setRoleLoading(false);
        });
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user]);

  const authenticate = {
    user,
    googleLogin,
    createUser,
    signInUser,
    signOutUser,
    loading,
    isLoading,
    roleLoading,
    userData,
    products,
  };

  return (
    <AuthContext.Provider value={authenticate}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
