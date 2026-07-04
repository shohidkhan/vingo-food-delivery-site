import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import useGetCity from "../hooks/useGetCity";
import useGetShop from "../hooks/useGetShop";
import useShopByCity from "../hooks/useShopByCity";
import useGetItemByCity from "../hooks/useGetItemByCity";

const BackendLayout = () => {
  useGetCity();
  useGetShop();
  useShopByCity();
  useGetItemByCity();
  return (
    <div className="min-h-screen">
      <Navbar></Navbar>
      <div className="mt-[80px]">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default BackendLayout;
