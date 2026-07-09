import React from "react";

const UserOrderCard = ({ data }) => {
  return (
    /* Main Card Layout Container */
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden mb-6">
      {/* === HEADER SECTION === */}
      <div className="p-4 sm:p-5 border-b border-gray-100 bg-white">
        <div className="flex flex-row justify-between items-center gap-2">
          <div>
            <p className="font-bold text-gray-900 text-sm sm:text-base tracking-tight">
              order{" "}
              <span className="text-orange-600">
                #{data._id?.slice(-6) || data._id}
              </span>
            </p>
            <p className="text-gray-400 text-[11px] sm:text-xs mt-0.5 font-medium">
              {new Date(data.createdAt).toDateString()}
            </p>
          </div>
          <div className="text-right flex flex-col items-end gap-1.5">
            <span className="inline-block bg-orange-50 text-orange-600 font-bold text-[10px] px-2 py-0.5 rounded tracking-wider uppercase">
              {data.paymentMethod || "COD"}
            </span>
            <p className="font-bold text-sky-600 text-xs sm:text-sm capitalize tracking-wide">
              {data?.shopOrder[0]?.status || "pending"}
            </p>
          </div>
        </div>
      </div>

      {/* === RESTAURANT SECTIONS === */}
      <div className="p-3 sm:p-5 space-y-4 bg-stone-50/40">
        {data.shopOrder?.map((order, index) => (
          <div
            key={index}
            className="bg-white border border-gray-100 rounded-xl p-3 sm:p-4 shadow-sm"
          >
            {/* Restaurant Title Banner */}
            <h3 className="font-bold text-gray-800 text-xs sm:text-sm mb-3 border-b border-gray-50 pb-2 flex justify-between items-center">
              <span>{order.shop?.name || "Restaurant Partner"}</span>
              <span className="text-[10px] text-gray-400 font-normal">
                Items: {order.shopOrderItems?.length || 0}
              </span>
            </h3>

            {/* RESPONSIVE LAYOUT ENGINE: 
                Mobile: Thin, sleek horizontal rows stacked vertically.
                Desktop (sm:): Changes into a neat, compact grid system. */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 w-full">
              {order.shopOrderItems?.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  className="flex sm:flex-col items-center sm:items-start gap-3 sm:gap-0 border border-gray-50 sm:border-gray-100 rounded-lg p-2 sm:p-0 overflow-hidden bg-white shadow-2xl shadow-transparent hover:border-orange-200 transition-colors"
                >
                  {/* Image wrapper: Compact square box */}
                  <div className="w-12 h-12 sm:w-full sm:h-auto sm:aspect-square flex-shrink-0 bg-gray-50 overflow-hidden rounded-md sm:rounded-none">
                    <img
                      src={
                        item.item?.image ||
                        "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=200&auto=format&fit=crop"
                      }
                      alt={item.item?.name || "food"}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  {/* Details block: Side-by-side on mobile, bottom-stacked on desktop */}
                  <div className="p-0 sm:p-2 flex-1 min-w-0">
                    <p className="font-bold text-gray-800 text-xs truncate">
                      {item.item?.name || "Delicious Item"}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5 font-medium">
                      Qty: {item.quantity} ×{" "}
                      <span className="text-gray-700 font-semibold">
                        ₹{item.price}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Inner Subtotal Status Bar */}
            <div className="flex justify-between items-center border-t border-gray-100 pt-2.5 mt-3">
              <p className="text-[11px] font-semibold text-gray-400">
                Subtotal:{" "}
                <span className="text-gray-900 font-extrabold text-xs sm:text-sm ml-1">
                  ₹{order.subtotal}
                </span>
              </p>
              <span className="text-[10px] font-bold text-sky-600 bg-sky-50 px-1.5 py-0.5 rounded capitalize">
                {order.status || "pending"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* === FOOTER ACTION SECTION === */}
      <div className="px-4 py-3 bg-white border-t border-gray-100 flex flex-row justify-between items-center gap-2">
        <div>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
            Grand Total
          </p>
          <p className="text-base sm:text-lg font-black text-gray-900 leading-tight">
            ₹
            {data.shopOrder?.reduce((acc, curr) => acc + curr.subtotal, 0) || 0}
          </p>
        </div>
        <button className="px-4 py-2 bg-[#FF4F2E] text-white font-bold rounded-lg text-xs shadow-sm hover:bg-[#E03E20] active:scale-[0.98] transition-all duration-150">
          Track Order
        </button>
      </div>
    </div>
  );
};

export default UserOrderCard;
