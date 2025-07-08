import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const UseAuth = () => {
  const {
    registerUser,
    loginUser,
    googleLogin,
    user,
    setUser,
    logOut,
    loading,
    setLoading,
  } = useContext(AuthContext);
  return {
    registerUser,
    loginUser,
    googleLogin,
    user,
    setUser,
    logOut,
    loading,
    setLoading,
  };
};

export default UseAuth;
