import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import useGetCity from "../hooks/useGetCity";

const BackendLayout = () => {
  useGetCity();
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
