import React from "react";

const UserOrderCard = ({ data }) => {
  console.log(data);
  return (
    <div>
      {/* === HEADER SECTION === */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-bold text-gray-900 text-lg">order #{data._id}</p>
            <p className="text-gray-400 text-sm mt-0.5">
              Date: {Date(data.createdAt).toDateString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 font-medium text-sm">
              {data.paymentMethod}
            </p>
            {/* Blue text matching image for pending status */}
            <p className="font-semibold text-sky-700 mt-1">pending</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOrderCard;
