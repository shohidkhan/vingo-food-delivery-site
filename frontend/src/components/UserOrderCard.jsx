import React from "react";

const UserOrderCard = ({ data }) => {
  return (
    /* Main Card Layout Container - Minimized vertical margins and padding */
    <div className="bg-white border border-gray-100 rounded-xl shadow-xs overflow-hidden mb-4">
      {/* === HEADER SECTION === */}
      <div className="px-3 py-2.5 border-b border-gray-100 bg-white flex justify-between items-center gap-2">
        <div>
          <p className="font-bold text-gray-900 text-xs sm:text-sm tracking-tight">
            order{" "}
            <span className="text-orange-600">
              #{data._id?.slice(-6) || data._id}
            </span>
          </p>
          <p className="text-gray-400 text-[10px] sm:text-xs font-medium">
            {new Date(data.createdAt).toDateString()}
          </p>
        </div>
        <div className="text-right flex flex-col items-end">
          <span className="inline-block bg-orange-50 text-orange-600 font-bold text-[9px] px-1.5 py-0.5 rounded tracking-wider uppercase">
            {data.paymentMethod || "COD"}
          </span>
          <p className="font-bold text-sky-600 text-[11px] sm:text-xs capitalize tracking-wide mt-0.5">
            {data?.shopOrder[0]?.status || "pending"}
          </p>
        </div>
      </div>

      {/* === RESTAURANT SECTIONS === */}
      <div className="px-2 py-2 space-y-2 bg-stone-50/30">
        {data.shopOrder?.map((order, index) => (
          <div
            key={index}
            className="bg-white border border-gray-50 rounded-lg p-2 shadow-xs"
          >
            {/* Restaurant Title Banner */}
            <h3 className="font-bold text-gray-800 text-[11px] sm:text-xs mb-2 border-b border-gray-50 pb-1 flex justify-between items-center">
              <span>{order.shop?.name || "Restaurant Partner"}</span>
              <span className="text-[9px] text-gray-400 font-normal">
                Items: {order.shopOrderItems?.length || 0}
              </span>
            </h3>

            {/* HIGH-DENSITY GRID: Ultra-small profile image layouts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1.5 w-full">
              {order.shopOrderItems?.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  className="flex items-center gap-2 border border-gray-50/60 rounded-md p-1.5 bg-white hover:border-orange-200 transition-colors"
                >
                  {/* Micro Image Thumbnail: Scaled way down to a strict 36px/40px icon frame */}
                  <div className="w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0 bg-gray-50 overflow-hidden rounded-md">
                    <img
                      src={
                        item.item?.image ||
                        "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=150&auto=format&fit=crop"
                      }
                      alt={item.item?.name || "food"}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  {/* Micro Details block */}
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-gray-800 text-[11px] leading-tight truncate">
                      {item.item?.name || "Delicious Item"}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-0.5 font-medium leading-none">
                      Qty: {item.quantity} ×{" "}
                      <span className="text-gray-600 font-semibold">
                        ₹{item.price}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Inner Subtotal Status Bar */}
            <div className="flex justify-between items-center border-t border-gray-50 pt-1.5 mt-2">
              <p className="text-[10px] font-semibold text-gray-400">
                Subtotal:{" "}
                <span className="text-gray-900 font-extrabold text-xs ml-1">
                  ₹{order.subtotal}
                </span>
              </p>
              <span className="text-[9px] font-bold text-sky-600 bg-sky-50 px-1 py-0.5 rounded capitalize">
                {order.status || "pending"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* === FOOTER ACTION SECTION === */}
      <div className="px-3 py-2 bg-white border-t border-gray-100 flex justify-between items-center gap-2">
        <div>
          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">
            Grand Total
          </p>
          <p className="text-sm sm:text-base font-black text-gray-900 leading-tight">
            ₹
            {data.shopOrder?.reduce((acc, curr) => acc + curr.subtotal, 0) || 0}
          </p>
        </div>
        <button className="px-3.5 py-1.5 bg-[#FF4F2E] text-white font-bold rounded-md text-[11px] shadow-xs hover:bg-[#E03E20] active:scale-[0.98] transition-all duration-150">
          Track Order
        </button>
      </div>
    </div>
  );
};

export default UserOrderCard;
