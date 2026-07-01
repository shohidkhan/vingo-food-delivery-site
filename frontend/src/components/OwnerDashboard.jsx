import React from "react";

import { useSelector } from "react-redux";
import { FaUtensils } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { TbMoodEdit } from "react-icons/tb";
import OwnerItemCard from "../pages/OwnerItemCard/OwnerItemCard";

const OwnerDashboard = () => {
  const { myShopData } = useSelector((state) => state.owner);
  const { currentCity } = useSelector((state) => state.user);
  const navigate = useNavigate();
  console.log(myShopData);
  return (
    <div>
      {!myShopData && (
        <div className="w-full min-h-screen bg-[#fff9f6] flex flex-col items-center">
          {!myShopData && (
            <div className="flex justify-center items-center p-4 sm:p-6">
              <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col items-center text-center">
                  <FaUtensils className="text-[#ff4d2d] w-16 h-16 sm:w-20 sm:h-20 mb-4" />
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                    Add Your Restaurant
                  </h2>
                  <p>
                    Join our food delivery platform and reach thousands of
                    hungry customers every day.
                  </p>
                  <Link
                    to="/create-edit-shop"
                    className="bg-[#ff4d2d] mt-5 cursor-pointer text-white px-5 sm:px-6 py-2 rounded-full font-medium shadow-md hover:bg-orange-600 transition-colors duration-200"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {myShopData && (
        <div className="min-h-screen bg-gray-50 p-4">
          {/* Header */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <FaUtensils size={35} className="text-[#ff4d2d] mb-4" />
            <h1 className="text-lg font-semibold text-gray-800">
              Welcome to {myShopData?.name || "your Shop"}
            </h1>
          </div>

          {/* Shop Card */}
          {myShopData && (
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 max-w-3xl mx-auto">
              {/* Image with Edit button */}
              <div className="relative">
                <img
                  src={myShopData.image}
                  alt={myShopData.name}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() => navigate("/create-edit-shop")}
                  className="group absolute top-3 right-3 bg-[#ff4d2d] p-1.5 rounded-full shadow-md hover:bg-white transition cursor-pointer"
                >
                  <TbMoodEdit
                    size={16}
                    className="text-white transition-colors group-hover:text-[#ff4d2d]"
                  />
                </button>
              </div>

              {/* Info */}
              <div className="p-4">
                <h2 className="text-base font-semibold text-gray-900">
                  {myShopData.name}
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  {myShopData.city};{myShopData.state}
                </p>
                <p className="text-sm text-gray-500 mt-0.5">
                  {myShopData.address}
                </p>
              </div>
            </div>
          )}
          {myShopData.items.length === 0 && (
            <div className="flex justify-center items-center p-4 sm:p-6">
              <div className="w-full max-w-sm bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col items-center text-center">
                  <FaUtensils size={25} className="text-[#ff4d2d]" />
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                    Add Item
                  </h2>
                  <p>
                    Join our food delivery platform and reach thousands of
                    hungry customers every day.
                  </p>
                  <Link
                    to="/add-item"
                    className="bg-[#ff4d2d] mt-5 cursor-pointer text-white px-5 sm:px-6 py-2 rounded-full font-medium shadow-md hover:bg-orange-600 transition-colors duration-200"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          )}
          {myShopData.items.length > 0 && (
            <div className="grid max-w-7xl mx-auto grid-cols-1 mt-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-4">
              {myShopData.items.map((item) => (
                <OwnerItemCard key={item._id} data={item} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OwnerDashboard;
