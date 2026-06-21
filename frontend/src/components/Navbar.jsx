import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { PiShoppingCart } from "react-icons/pi";
import { useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";

const Navbar = () => {
  const { userData } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.auth);
  const [showInfo, setShowInfo] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  // if (loading) return "loading.....";
  console.log(userData);
  return (
    <div className="w-full flex justify-between items-center h-[80px] md:justify-center gap-[30px] px-3 fixed top-0 z-[9999] bg-[#fff9f6] overflow-visible">
      <h1 className="text-3xl font-bold mb-2 text-[#ff4d2d]">Vingo</h1>
      {showSearch && (
        <div className="md:hidden w-[90%] h-[60px] bg-white shadow-xl rounded-[5px] flex justify-between items-center gap-[20px] fixed top-20 left-[5%] z-[9999]">
          <div className="flex items-center gap-2 w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400">
            <FaLocationDot size={20} className="text-[#ff4d2d]"></FaLocationDot>
            <div className="w-[80%] truncate text-gray-600">location</div>
          </div>
          <div className="w-[80%] flex items-center gap-[10px]">
            <IoIosSearch size={20} className="text-[#ff4d2d]"></IoIosSearch>
            <input
              type="text"
              name=""
              id=""
              className="outline-0 px-[10px] w-full text-gray-600"
              placeholder="Search food"
            />
          </div>
        </div>
      )}
      <div className="lg:w-[40%] md:[w-60%] h-[60px] bg-white shadow-xl rounded-[5px] flex justify-between items-center gap-[20px] hidden md:flex">
        <div className="flex items-center gap-2 w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400">
          <FaLocationDot size={20} className="text-[#ff4d2d]"></FaLocationDot>
          <div className="w-[80%] truncate text-gray-600">location</div>
        </div>
        <div className="w-[80%] flex items-center gap-[10px]">
          <IoIosSearch size={20} className="text-[#ff4d2d]"></IoIosSearch>
          <input
            type="text"
            name=""
            id=""
            className="outline-0 px-[10px] w-full text-gray-600"
            placeholder="Search food"
          />
        </div>
      </div>
      <div className="flex gap-[20px] items-center">
        {showSearch ? (
          <RxCross2
            size={20}
            className="text-[#ff4d2d] md:hidden"
            onClick={() => setShowSearch(false)}
          ></RxCross2>
        ) : (
          <IoIosSearch
            size={20}
            className="text-[#ff4d2d] md:hidden"
            onClick={() => setShowSearch(true)}
          ></IoIosSearch>
        )}

        <div className="relative cursor-pointer">
          <PiShoppingCart size={30} className="text-[#ff4d2d]"></PiShoppingCart>
          <span className="text-[#ff4d2d] absolute top-[-10px] right-[-10px]">
            0
          </span>
        </div>
        <button className="hidden md:block px-3 py-1 text-sm text-[#ff4d2d] font-bold bg-[#f7e7e5] rounded-lg">
          My Orders
        </button>
        <div
          className="w-10 h-10 rounded-full bg-[#ff4d2d] text-white text-center flex items-center text-[18px] font-bold justify-center shadow-2xl cursor-pointer"
          onClick={() => setShowInfo(!showInfo)}
        >
          {userData?.fullName.slice(0, 1).toUpperCase()}
        </div>
        {showInfo && (
          <div className="fixed top-20 right-2.5 md:right-[10%] lg:right-[25%] w-[180px] bg-white shadow-2xl rounded-xl p-5 flex flex-col gap-2.5 z-[99999]">
            <div className="text-base font-semibold cursor-pointer">
              {userData?.fullName}
            </div>
            <div className="md:hidden text-[#ff4d2d] font-semibold cursor-pointer">
              My orders
            </div>
            <div className="text-sm font-semibold cursor-pointer text-[#ff4d2d]">
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
