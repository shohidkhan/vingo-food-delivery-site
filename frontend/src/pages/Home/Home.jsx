import React from "react";
import useCurrentUser from "../../hooks/useCurrentUser";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Home = () => {
  // if (!userData?.fullName) return <Navigate to="/signin" />;
  return <div>Home</div>;
};

export default Home;
