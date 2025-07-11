import React from "react";
import useAuth from "../CustomHooks/useAuth";
import LoadingSpinner from "../components/LoadingSpinner";
import LoginPage from "../pages/Login/LoginPage";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();
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
