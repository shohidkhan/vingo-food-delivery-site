import React from "react";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const handleBackToOrders = () => {
    navigate("/my-orders");
  };
  return (
    <>
      <div className="min-h-screen w-full bg-[#FFFDFB] flex flex-col items-center justify-center p-4">
        <div className="max-w-md text-center flex flex-col items-center animate-fade-in">
          {/* Success Checkmark Icon */}
          <div className="w-16 h-16 bg-[#00D254] rounded-full flex items-center justify-center shadow-sm mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3.5}
              stroke="white"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>

          {/* Heading */}
          <h1 className="text-[28px] md:text-3xl font-bold text-[#1E2A38] mb-3 tracking-tight">
            Order Placed!
          </h1>

          {/* Description Text */}
          <p className="text-gray-500 font-normal text-sm md:text-base leading-relaxed max-w-[340px] md:max-w-md mb-8">
            Thank you for your purchase. Your order is being prepared. You can
            track your order status in the "My Orders" section.
          </p>

          {/* Navigation Action Button */}
          <button
            onClick={handleBackToOrders}
            className="bg-[#FF4F2E] text-white font-medium text-sm md:text-base px-6 py-2.5 rounded-lg shadow-sm hover:bg-[#E03E20] active:scale-[0.98] transition-all duration-150 focus:outline-none"
          >
            Back to my orders
          </button>
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
