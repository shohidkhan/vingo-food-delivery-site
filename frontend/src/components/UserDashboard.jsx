import React, { useEffect, useRef, useState } from "react";
import { categories } from "../categories.js";
import CategoryCard from "./CategoryCard";
import { useSelector } from "react-redux";
import ShopCard from "./ShopCard.jsx";
import GetItemByCity from "./GetItemByCity.jsx";

const UserDashboard = () => {
  const scrollContainerRef = useRef(null);
  const scrollShopContainerRef = useRef(null);
  const { currentCity } = useSelector((state) => state.user);
  const { getShopByCity, getItemByCity } = useSelector((state) => state.owner);

  // Track button visibility states
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [showShopLeftArrow, setShowShopLeftArrow] = useState(false);
  const [showShopRightArrow, setShowShopRightArrow] = useState(true);

  // 1. Position check logic for Categories Carousel
  const checkCategoryScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 2);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  // 2. Position check logic for Restaurants Carousel
  const checkShopScroll = () => {
    if (scrollShopContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollShopContainerRef.current;
      setShowShopLeftArrow(scrollLeft > 2);
      setShowShopRightArrow(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  // Attach scroll listeners for Categories
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      checkCategoryScroll();
      container.addEventListener("scroll", checkCategoryScroll);
      window.addEventListener("resize", checkCategoryScroll);
    }
    return () => {
      if (container)
        container.removeEventListener("scroll", checkCategoryScroll);
      window.removeEventListener("resize", checkCategoryScroll);
    };
  }, []);

  // Attach scroll listeners for Restaurants
  useEffect(() => {
    const container = scrollShopContainerRef.current;
    if (container) {
      checkShopScroll();
      container.addEventListener("scroll", checkShopScroll);
      window.addEventListener("resize", checkShopScroll);
    }
    return () => {
      if (container) container.removeEventListener("scroll", checkShopScroll);
      window.removeEventListener("resize", checkShopScroll);
    };
  }, []);

  // Click handler actions
  const scrollLeftAction = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -240, behavior: "smooth" });
    }
  };

  const scrollRightAction = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 240, behavior: "smooth" });
    }
  };

  const scrollShopLeftAction = () => {
    if (scrollShopContainerRef.current) {
      scrollShopContainerRef.current.scrollBy({
        left: -240,
        behavior: "smooth",
      });
    }
  };

  const scrollShopRightAction = () => {
    if (scrollShopContainerRef.current) {
      scrollShopContainerRef.current.scrollBy({
        left: 240,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-screen bg-[#faf0f0] min-h-screen pt-10">
      {/* SECTION 1: INSPIRATION/CATEGORIES */}
      <div className="w-full mx-auto max-w-6xl flex flex-col justify-start p-2.5">
        <h2 className="text-md md:text-xl font-semibold text-gray-800 mb-6">
          Inspiration for your first order
        </h2>

        <div className="relative flex items-center group">
          {showLeftArrow && (
            <button
              onClick={scrollLeftAction}
              className="absolute left-2 bg-red-500 text-white rounded-full p-2 shadow-md hover:bg-red-600 active:scale-95 transition-all focus:outline-none z-10 flex items-center justify-center opacity-90 group-hover:opacity-100"
              aria-label="Scroll left"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
          )}

          {/* Fixed: Attached scrollContainerRef here */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-none py-2 w-full scroll-smooth snap-x"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>

          {showRightArrow && (
            <button
              onClick={scrollRightAction}
              className="absolute right-2 bg-red-500 text-white rounded-full p-2 shadow-md hover:bg-red-600 active:scale-95 transition-all focus:outline-none z-10 flex items-center justify-center opacity-90 group-hover:opacity-100"
              aria-label="Scroll right"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* SECTION 2: RESTAURANTS */}
      <div className="w-full mx-auto max-w-6xl flex flex-col justify-start p-2.5 mt-8">
        <h2 className="text-md md:text-xl font-semibold text-gray-800 mb-6">
          Best Restaurants in {currentCity}
        </h2>

        <div className="relative flex items-center group">
          {showShopLeftArrow && (
            <button
              onClick={scrollShopLeftAction}
              className="absolute left-2 bg-red-500 text-white rounded-full p-2 shadow-md hover:bg-red-600 active:scale-95 transition-all focus:outline-none z-10 flex items-center justify-center opacity-90 group-hover:opacity-100"
              aria-label="Scroll left"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
          )}

          <div
            ref={scrollShopContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-none py-2 w-full scroll-smooth snap-x"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {getShopByCity &&
              getShopByCity.map((shop) => (
                <ShopCard key={shop._id} shop={shop} />
              ))}
          </div>

          {showShopRightArrow && (
            <button
              onClick={scrollShopRightAction}
              className="absolute right-2 bg-red-500 text-white rounded-full p-2 shadow-md hover:bg-red-600 active:scale-95 transition-all focus:outline-none z-10 flex items-center justify-center opacity-90 group-hover:opacity-100"
              aria-label="Scroll right"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
      <div className="w-full mx-auto max-w-6xl flex flex-col justify-start p-2.5 mt-8">
        <h2 className="text-md md:text-xl font-semibold text-gray-800 mb-6">
          Suggested Food Items
        </h2>
        <div
          className="flex gap-4 overflow-x-auto scrollbar-none py-2 w-full scroll-smooth snap-x"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {getItemByCity &&
            getItemByCity.map((item) => (
              <GetItemByCity key={item._id} item={item} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
