import React from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../firebase/firebase.config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const AuthProvider = ({ children }) => {
  const serverUrl = "http://localhost:3000/api";
  const provider = new GoogleAuthProvider();

  const googleSignIn = async () => {};

  const googleSignUp = async () => {
    const result = await signInWithPopup(auth, provider);
    return result;
  };
  const dataInfo = { serverUrl, googleSignUp };
  return <AuthContext value={dataInfo}>{children}</AuthContext>;
};

export default AuthProvider;
