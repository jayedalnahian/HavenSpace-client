import React from "react";
import useUserData from "../CustomHooks/useUserData";
import LoadingSpinner from "../components/LoadingSpinner";
import { Navigate } from "react-router";

const AdminPrivateRoute = ({ children }) => {
  const { userData, isUserLoading } = useUserData();

  if (isUserLoading) {
    return <LoadingSpinner />;
  }

  if (userData?.role !== "admin") {
    return (
      <Navigate
        to="/forbidden-page"
      />
    );
  }

  return children;
};

export default AdminPrivateRoute;