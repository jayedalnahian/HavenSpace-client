import React from "react";
import { Navigate } from "react-router";
import useUserData from "../CustomHooks/useUserData";
import LoadingSpinner from "../components/LoadingSpinner";

const UserPrivateRoute = ({ children }) => {
  const { userData, isUserLoading } = useUserData();

  if (isUserLoading) {
    return <LoadingSpinner />;
  }

  if (userData?.role !== "user") {
    return (
      <Navigate
        to="/forbidden-page"
      />
    );
  }

  return children;
};

export default UserPrivateRoute;
