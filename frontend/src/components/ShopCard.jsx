import React from "react";

const ShopCard = ({ shop }) => {
  return (
    <div
      key={shop._id}
      className="flex-none w-36 h-44 sm:w-35 sm:h-35 md:w-33 md:h-33 rounded-2xl overflow-hidden border border-orange-100 shadow-sm cursor-pointer hover:shadow-md  transition-all duration-200 relative flex flex-col justify-between snap-start"
    >
      {/* Category Thumbnail */}
      <img
        src={shop.image}
        alt={shop.name}
        className="w-full h-full object-cover hover:scale-[1.25] transition-transform duration-500"
      />

      {/* Text Plate Overlay aligned to bottom */}
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pt-8 pb-3 px-2 text-center">
        <span className="text-white font-medium text-xs sm:text-sm md:text-base tracking-wide drop-shadow-sm capitalize">
          {shop.name}
        </span>
      </div>
    </div>
  );
};

export default ShopCard;
