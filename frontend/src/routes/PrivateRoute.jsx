import React from "react";
import useCurrentUser from "../hooks/useCurrentUser";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useCurrentUser();
  const { userData } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.auth);
  // console.log(userData, loading);
  if (loading) return "loading.....";
  if (!userData) return <Navigate to="/signin" />;
  return children;
};

export default PrivateRoute;
