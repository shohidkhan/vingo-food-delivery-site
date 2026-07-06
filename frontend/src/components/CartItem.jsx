import React from "react";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  const subtotal = item.price * item.quantity;

  return (
    <div className="rounded-2xl border border-orange-100 bg-white p-3 shadow-sm sm:p-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <img
          src={item.image}
          alt={item.name}
          className="h-20 w-full rounded-xl object-cover sm:h-24 sm:w-24"
        />

        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-base font-semibold capitalize text-gray-800">
                {item.name}
              </h3>
              <p className="mt-0.5 text-sm text-gray-500">
                {item.foodType || "Freshly prepared"}
              </p>
              <p className="mt-1 text-sm font-semibold text-[#ff4d2d]">
                ৳{item.price}
              </p>
            </div>

            <button
              onClick={() => onRemove(item.id)}
              className="rounded-full p-1.5 text-gray-400 transition hover:bg-orange-50 hover:text-[#ff4d2d]"
              aria-label="Remove item"
            >
              <FiTrash2 size={18} />
            </button>
          </div>

          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center overflow-hidden rounded-full border border-gray-200 bg-gray-50">
              <button
                onClick={() => onDecrease(item.id)}
                className="flex h-8 w-8 items-center justify-center text-gray-600 transition hover:bg-orange-50 hover:text-[#ff4d2d]"
                aria-label="Decrease quantity"
              >
                <FiMinus size={14} />
              </button>
              <span className="min-w-8 text-center text-sm font-semibold text-gray-800">
                {item.quantity}
              </span>
              <button
                onClick={() => onIncrease(item.id)}
                className="flex h-8 w-8 items-center justify-center text-gray-600 transition hover:bg-orange-50 hover:text-[#ff4d2d]"
                aria-label="Increase quantity"
              >
                <FiPlus size={14} />
              </button>
            </div>

            <div className="text-left sm:text-right">
              <p className="text-xs text-gray-500">Subtotal</p>
              <p className="text-base font-semibold text-gray-900">
                ৳{subtotal}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
