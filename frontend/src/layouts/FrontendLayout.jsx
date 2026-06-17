import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";

const FrontendLayout = () => {
  return (
    <div>
      <Navbar />
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default FrontendLayout;
