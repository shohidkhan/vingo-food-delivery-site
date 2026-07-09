import React from "react";
import { useSelector } from "react-redux";
import UserOrderCard from "../../components/UserOrderCard";
import OwnerOrderCard from "../../components/OwnerOrderCard";

const MyOrders = () => {
  const { userData, myOrders } = useSelector((state) => state.user);

  return (
    <div className="w-full min-h-screen bg-[#faf0f0] py-8 px-4 md:px-8">
      <div className="w-full mx-auto max-w-4xl">
        {/* Clean, unboxed header style */}
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-black text-gray-800 tracking-tight">
            My Orders
          </h1>
          <span className="text-xs font-bold text-gray-500 bg-white border border-gray-200 px-3 py-1 rounded-full shadow-sm">
            Total Orders: {myOrders?.length || 0}
          </span>
        </div>

        {/* Empty State */}
        {!myOrders || myOrders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
            <p className="text-gray-400 font-medium">
              No orders found items yet.
            </p>
          </div>
        ) : (
          /* Cards List Container */
          <div className="space-y-4">
            {myOrders.map((order, index) =>
              userData?.role === "user" ? (
                <UserOrderCard key={order._id || index} data={order} />
              ) : (
                <OwnerOrderCard key={order._id || index} data={order} />
              ),
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
