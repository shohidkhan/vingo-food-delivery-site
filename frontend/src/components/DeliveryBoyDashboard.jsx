import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const DeliveryBoyDashboard = () => {
  // Pulling user data from Redux state (adjust state.auth/state.user based on your setup)
  const { userData } = useSelector((state) => state.user);
  console.log(userData);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [errorMsg, setErrorMsg] = useState("");
  const [availableOrders, setAvailableOrders] = useState([]); // Empty state placeholder for orders

  return (
    <div className="w-screen min-h-screen bg-[#faf0f0] flex flex-col items-center pt-10 px-4">
      <div className="w-full max-w-xl space-y-4">
        {/* Profile / Location Info Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-orange-50/50 text-center flex flex-col gap-1">
          <h2 className="text-[#f04f35] font-bold text-base sm:text-lg">
            Welcome, {userData?.fullName}
          </h2>
          <p className="text-[#f04f35] font-medium text-xs sm:text-sm">
            {errorMsg ? (
              <span className="text-gray-400 italic">{errorMsg}</span>
            ) : (
              <>
                Latitude:{" "}
                <span className="font-normal text-gray-700 mr-2">
                  {userData?.location.coordinates[1] || "Loading..."}
                </span>
                Longitude:{" "}
                <span className="font-normal text-gray-700">
                  {userData?.location.coordinates[0] || "Loading..."}
                </span>
              </>
            )}
          </p>
        </div>

        {/* Available Orders Section Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-orange-50/50 min-h-[120px] flex flex-col justify-start">
          <h3 className="text-gray-800 font-bold text-sm sm:text-base mb-2">
            Available Orders
          </h3>

          {availableOrders.length === 0 ? (
            <div className="flex-1 flex items-center">
              <p className="text-gray-300 text-xs sm:text-sm font-medium">
                No Available Orders
              </p>
            </div>
          ) : (
            <div className="space-y-3 mt-2">
              {/* Maps order cards here once integrated with backend */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryBoyDashboard;
