import React from "react";
import { Navigate, useLocation } from "react-router";
import useUserData from "../CustomHooks/useUserData";
import LoadingSpinner from "../components/LoadingSpinner";

const AgentPrivateRoute = ({ children }) => {
  const { userData, isLoading: isUserDataLoading } = useUserData();
  const location = useLocation(); // Get current location

  if (isUserDataLoading) {
    return <LoadingSpinner />;
  }

  if (userData?.role !== "agent") {
    return (
      <Navigate
        to="/forbidden-page"
        replace
        state={{ from: location }} // Pass the current location
      />
    );
  }

  return children;
};

export default AgentPrivateRoute;
