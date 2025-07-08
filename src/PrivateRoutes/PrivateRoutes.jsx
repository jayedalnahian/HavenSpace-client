import React from "react";
import UseAuth from "../CustomHooks/UseAuth";
import LoadingSpinner from "../components/LoadingSpinner";
import LoginPage from "../pages/Login/LoginPage";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = UseAuth();
  if (loading) return <LoadingSpinner></LoadingSpinner>;
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }} // 👈 pass current location
      />
    );
  }
  return children;
};

export default PrivateRoutes;
