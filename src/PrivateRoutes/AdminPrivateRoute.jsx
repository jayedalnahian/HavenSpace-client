import React from "react";
import { useLocation, Navigate } from "react-router";
import useUserData from "../CustomHooks/useUserData";
import LoadingSpinner from "../components/LoadingSpinner";

const AdminPrivateRoute = ({ children }) => {
  const { userData, isLoading: isUserDataLoading } = useUserData();
  const location = useLocation();

  if (isUserDataLoading) {
    return <LoadingSpinner />;
  }

  if (userData?.role !== "admin") {
    return (
      <Navigate
        to="/forbidden-page"
        replace
        state={{ from: location }}
      />
    );
  }

  return children;
};

export default AdminPrivateRoute;