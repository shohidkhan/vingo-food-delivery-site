import React from "react";
import { useSelector } from "react-redux";
import UserOrderCard from "../../components/UserOrderCard";
import OwnerOrderCard from "../../components/OwnerOrderCard";

const MyOrders = () => {
  const { userData, myOrders } = useSelector((state) => state.user);
  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 bg-[#faf0f0]">
      {/* The main white card with shadow and borders */}
      <div className="bg-white border border-gray-100 rounded-3xl shadow-xl shadow-gray-100 overflow-hidden">
        <div className="p-4 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            My Orders
          </h1>
          <div className="space-y-6">
            {myOrders?.map((order, index) =>
              userData?.role === "user" ? (
                <UserOrderCard key={order._id || index} data={order} />
              ) : (
                <OwnerOrderCard key={order._id || index} data={order} />
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
