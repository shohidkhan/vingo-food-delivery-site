import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/userSlice";

const GetItemByCity = ({ item }) => {
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.user);
  const renderStart = (rating) => {
    const starts = [];
    for (let i = 1; i <= 5; i++) {
      i <= rating
        ? starts.push(<FaStar key={i} className="text-amber-400" />)
        : starts.push(<FaRegStar key={i} className="text-amber-400" />);
    }
    1;
    return starts;
  };

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
    }
  };

  return (
    <div
      key={item._id}
      className="flex-none w-44 bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between snap-start"
    >
      {/* Top Section: Image & Veg Badge */}
      <div className="relative w-full h-28 overflow-hidden bg-gray-50">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />

        {/* Veg Badge (Top Right) */}
        <div className="absolute top-2 right-2 bg-white p-[3px] rounded border border-green-600 flex items-center justify-center w-5 h-5 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-green-600"></div>
        </div>
      </div>

      {/* Bottom Section: Content Plate */}
      <div className="p-3 flex flex-col gap-1.5 flex-1 justify-between">
        <div>
          {/* Title */}
          <h3 className="text-gray-800 font-medium text-sm tracking-wide capitalize truncate">
            {item.name}
          </h3>

          {/* Rating Stars (5 outline/empty stars matching the image) */}
          <div className="flex items-center gap-1 mt-0.5">
            <div className="flex text-amber-400 text-xs tracking-tighter">
              {renderStart(item.rating?.count)}
            </div>
            <span className="text-gray-400 text-[10px]">
              ({item.rating?.average || 0})
            </span>
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="flex items-center justify-between mt-2">
          {/* Price */}
          <span className="text-gray-900 font-bold text-sm">
            {item.price || 199} Tk
          </span>

          {/* Quantity & Cart Controller Pill */}
          <div className="flex items-center border border-gray-300 rounded-full h-7 overflow-hidden bg-white">
            <button
              className="px-1.5 cursor-pointer text-gray-500 hover:bg-gray-50 text-xs font-semibold focus:outline-none"
              onClick={handleDecrease}
            >
              −
            </button>
            <span className="px-1 text-gray-800 text-xs font-medium min-w-[12px] text-center">
              {quantity}
            </span>
            <button
              className="px-1.5 cursor-pointer text-gray-500 hover:bg-gray-50 text-xs font-semibold focus:outline-none"
              onClick={handleIncrease}
            >
              +
            </button>
            {/* Orange Cart CTA */}
            <button
              className={`${cartItems.some((cartItem) => cartItem.id === item._id) ? "bg-gray-800" : "bg-[#f04f35]"} cursor-pointer hover:bg-[#e03f26] h-full px-2 flex items-center justify-center text-white transition-colors duration-150`}
              onClick={() =>
                quantity > 0
                  ? dispatch(
                      addToCart({
                        id: item._id,
                        name: item.name,
                        price: item.price,
                        quantity: quantity,
                        image: item.image,
                        shop: item.shop,
                        foodType: item.foodType,
                      }),
                    )
                  : null
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetItemByCity;
