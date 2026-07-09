import React, { useState } from "react";

const OwnerOrderCard = ({ data }) => {
  const [currentStatus, setCurrentStatus] = useState(
    data?.shopOrder?.[0]?.status || "pending",
  );

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setCurrentStatus(newStatus);
  };

  // Trigger print logic for just this card instance
  const handlePrint = () => {
    window.print();
  };

  const statusColors = {
    pending: "bg-amber-50 text-amber-700 border-amber-100",
    preparing: "bg-blue-50 text-blue-700 border-blue-100",
    "out of delivery": "bg-purple-50 text-purple-700 border-purple-100",
    delivered: "bg-emerald-50 text-emerald-700 border-emerald-100",
    cancelled: "bg-rose-50 text-rose-700 border-rose-100",
  };

  return (
    <>
      {/* 🟢 STEP 1: Injection of local print-media override styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media print {
          body * {
            visibility: hidden;
          }
          .print-container-${data._id}, .print-container-${data._id} * {
            visibility: visible;
          }
          .print-container-${data._id} {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            border: none !important;
            box-shadow: none !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `,
        }}
      />

      {/* 🟢 STEP 2: Added dynamic print identity class here */}
      <div
        className={`print-container-${data._id} bg-white border border-gray-100 rounded-xl shadow-xs overflow-hidden mb-4`}
      >
        {/* === HEADER SECTION === */}
        <div className="px-3 py-2.5 border-b border-gray-100 bg-white flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <p className="font-bold text-gray-900 text-xs sm:text-sm tracking-tight">
                ID:{" "}
                <span className="text-gray-500">
                  #{data._id?.slice(-6) || data._id}
                </span>
              </p>
              <span className="text-[10px] bg-stone-100 text-stone-600 font-bold px-1.5 py-0.5 rounded uppercase">
                {data.paymentMethod || "COD"}
              </span>
            </div>

            <div className="text-[11px] text-gray-600 space-y-0.5 font-medium">
              <p className="text-gray-900 font-bold flex items-center gap-1">
                👤 {data.user?.name || "Guest Customer"}
              </p>
              <p className="text-gray-500 flex items-center gap-1">
                ✉️{" "}
                <span className="truncate max-w-[180px] sm:max-w-xs">
                  {data.user?.email || "N/A"}
                </span>
              </p>
              <p className="text-gray-500 flex items-center gap-1">
                📞 <span>{data.user?.mobile || data.user?.phone || "N/A"}</span>
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right flex flex-row sm:flex-col justify-between sm:justify-start items-center sm:items-end gap-1 mt-1 sm:mt-0">
            <p className="text-gray-400 text-[10px] sm:text-xs font-medium">
              {new Date(data.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <span
              className={`inline-block border text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${statusColors[currentStatus] || statusColors.pending}`}
            >
              {currentStatus}
            </span>
          </div>
        </div>

        {/* === ITEMS GRID === */}
        <div className="px-2 py-2 space-y-2 bg-stone-50/30">
          {data.shopOrder?.map((order, index) => (
            <div
              key={index}
              className="bg-white border border-gray-50 rounded-lg p-2 shadow-xs"
            >
              <h3 className="font-bold text-gray-800 text-[11px] sm:text-xs mb-2 border-b border-gray-50 pb-1 flex justify-between items-center">
                <span className="text-orange-600 font-extrabold">
                  Prep List
                </span>
                <span className="text-[9px] text-gray-400 font-normal">
                  Total Items: {order.shopOrderItems?.length || 0}
                </span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1.5 w-full">
                {order.shopOrderItems?.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="flex items-center gap-2 border border-gray-50/60 rounded-md p-1.5 bg-white"
                  >
                    <div className="w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0 bg-gray-50 overflow-hidden rounded-md border border-gray-100">
                      <img
                        src={
                          item.item?.image ||
                          "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=150&auto=format&fit=crop"
                        }
                        alt={item.item?.name || "food"}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-gray-800 text-[11px] leading-tight truncate">
                        {item.item?.name || "Delicious Item"}
                      </p>
                      <p className="text-[11px] text-orange-600 mt-0.5 font-black leading-none">
                        QTY: {item.quantity}{" "}
                        <span className="text-[10px] text-gray-400 font-medium ml-1">
                          × ₹{item.price}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center border-t border-gray-50 pt-1.5 mt-2">
                <p className="text-[10px] font-semibold text-gray-400">
                  Earnings from Order:{" "}
                  <span className="text-emerald-600 font-extrabold text-xs ml-1">
                    ₹{order.subtotal}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* === ACTION TRAY (Hides itself automatically when printing) === */}
        <div className="no-print px-3 py-2 bg-white border-t border-gray-100 flex justify-between items-center gap-4">
          <div className="flex items-center gap-1.5">
            <label
              htmlFor={`status-select-${data._id}`}
              className="text-[10px] text-gray-400 font-bold uppercase tracking-wider hidden sm:inline"
            >
              Status:
            </label>
            <select
              id={`status-select-${data._id}`}
              value={currentStatus}
              onChange={handleStatusChange}
              className="bg-stone-50 border border-gray-200 text-gray-700 font-bold text-[11px] px-2 py-1.5 rounded-md focus:outline-none focus:border-orange-500 cursor-pointer"
            >
              <option value="pending">⏳ Pending</option>
              <option value="preparing">🍳 Preparing</option>
              <option value="out of delivery">🛵 Out For Delivery</option>
              <option value="delivered">✅ Delivered</option>
              <option value="cancelled">❌ Cancelled</option>
            </select>
          </div>

          <button
            onClick={handlePrint}
            className="px-2.5 py-1.5 border border-gray-200 text-gray-600 font-bold rounded-md text-[10px] hover:bg-stone-50 active:scale-[0.98] transition-all"
          >
            🖨️ KOT Print
          </button>
        </div>
      </div>
    </>
  );
};

export default OwnerOrderCard;
