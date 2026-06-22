import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import useGetCity from "../hooks/useGetCity";
import useGetShop from "../hooks/useGetShop";

const BackendLayout = () => {
  useGetCity();
  useGetShop();
  return (
    <div>
      <Navbar></Navbar>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default BackendLayout;
