import React from "react";
import useCurrentUser from "../../hooks/useCurrentUser";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import UserDashboard from "../../components/UserDashboard.jsx";
import DeliveryBoyDashboard from "../../components/DeliveryBoyDashboard.jsx";
import OwnerDashboard from "../../components/OwnerDashboard.jsx";

const Home = () => {
  const { userData } = useSelector((state) => state.user);
  console.log(userData);
  if (!userData) return <Navigate to="/signin" />;
  const dashboardMap = {
    owner: <OwnerDashboard />,
    user: <UserDashboard />,
    deliveryBoy: <DeliveryBoyDashboard />,
  };

  return dashboardMap[userData.role];
};

export default Home;
