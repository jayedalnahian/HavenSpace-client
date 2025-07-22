import React from "react";
import useAuth from "../CustomHooks/useAuth";
import LoadingSpinner from "../components/LoadingSpinner";
import { Navigate, useLocation } from "react-router"; // Added useLocation
import useUserData from "../CustomHooks/useUserData";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const { userData, isLoading: isUserDataLoading } = useUserData();
  const location = useLocation(); // Get current location

  if (loading || isUserDataLoading) {
    return <LoadingSpinner />;
  }

  if (!user || !userData) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }} // Pass the current location
      />
    );
  }

  return children;
};

export default PrivateRoutes;