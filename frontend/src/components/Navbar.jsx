import React, { useState } from "react";
import { FaLocationDot, FaPlus } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { PiShoppingCart } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { setUserData } from "../redux/userSlice";
import { TbReceiptFilled } from "react-icons/tb";
import Loading from "./Loading";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { userData, currentCity, currentAddress } = useSelector(
    (state) => state.user,
  );

  const { serverUrl, loading } = useSelector((state) => state.auth);
  const { myShopData } = useSelector((state) => state.owner);
  const [showInfo, setShowInfo] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.user);
  // console.log(currentCity);

  const handleLogOut = async () => {
    try {
      const result = await axios.get(`${serverUrl}/auth/signout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      // console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <Loading />;
  // console.log(userData);
  return (
    <div className="w-full flex justify-between items-center h-[80px] md:justify-center gap-[30px] px-3 fixed top-0 z-[9999] bg-[#fff9f6] overflow-visible">
      <Link to="/" className="text-3xl font-bold mb-2 text-[#ff4d2d]">
        Vingo
      </Link>
      {showSearch && userData.role === "user" && (
        <div className="md:hidden w-[90%] h-[60px] bg-white shadow-xl rounded-[5px] flex justify-between items-center gap-[20px] fixed top-20 left-[5%] z-[9999]">
          <div className="flex items-center gap-2 w-[40%] md:w-[10%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400">
            <FaLocationDot size={20} className="text-[#ff4d2d]"></FaLocationDot>
            <div
              onClick={() => setShowLocation(true)}
              className="w-[80%] truncate text-gray-600 cursor-pointer"
            >
              {currentAddress}
            </div>
            {showLocation && (
              <div className="absolute py-10 top-[60px] left-[10px] max-w-xl left-0 w-full bg-white shadow-xl rounded-[5px] z-[9999]">
                <div className="flex items-center gap-2 w-[100%] overflow-hidden gap-[10px] px-[10px] ">
                  <RxCross2
                    onClick={() => setShowLocation(false)}
                    size={20}
                    className="text-[#ff4d2d] cursor-pointer"
                  ></RxCross2>
                  <div className="w-[100%]  text-gray-600">
                    {currentAddress}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="w-[60%] md:w-[70%] flex items-center gap-[10px]">
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
      {userData.role === "user" && (
        <div className="lg:w-[40%] md:[w-60%] h-[60px] bg-white shadow-xl rounded-[5px] flex justify-between items-center gap-[20px] hidden md:flex">
          <div className="flex  items-center gap-2 w-[35%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400">
            <FaLocationDot size={20} className="text-[#ff4d2d]"></FaLocationDot>
            <div
              onClick={() => setShowLocation(true)}
              className="w-[80%] cursor-pointer truncate text-gray-600"
            >
              {currentAddress}
            </div>
            {showLocation && (
              <div className="absolute py-10 top-[60px] left-[336px] max-w-xl left-0 w-full bg-white shadow-2xl rounded-[5px] z-[9999]">
                <div className="flex items-center gap-2 w-[100%] overflow-hidden gap-[10px] px-[10px] ">
                  <RxCross2
                    onClick={() => setShowLocation(false)}
                    size={20}
                    className="text-[#ff4d2d] cursor-pointer"
                  ></RxCross2>
                  <div className="w-[100%]  text-gray-600">
                    {currentAddress}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="w-[65%] flex items-center gap-[10px]">
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

      <div className="flex gap-[20px] items-center">
        {userData.role === "user" &&
          (showSearch ? (
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
          ))}
        {userData.role === "user" && (
          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/carts")}
          >
            <PiShoppingCart
              size={30}
              className="text-[#ff4d2d]"
            ></PiShoppingCart>
            <span className="text-[#ff4d2d] absolute top-[-10px] right-[-10px]">
              {cartItems.length}
            </span>
          </div>
        )}
        {userData.role === "user" && (
          <>
            <div
              onClick={() => navigate("/my-orders")}
              className="hidden cursor-pointer md:block px-3 py-1 text-sm text-[#ff4d2d] font-bold bg-[#f7e7e5] rounded-lg"
            >
              <span>My Orders</span>
            </div>
          </>
        )}

        {userData.role === "owner" ? (
          <>
            {myShopData && (
              <>
                <div
                  onClick={() => navigate("/add-item")}
                  className="flex px-3 gap-2 items-center cursor-pointer py-1 text-[12px] text-[#ff4d2d] font-bold bg-[#f7e7e5] rounded-lg"
                >
                  <FaPlus size={15} className="text-[#ff4d2d] "></FaPlus>
                  <Link className="hidden md:block">Add Food</Link>
                </div>
                <div
                  onClick={() => navigate("/my-orders")}
                  className="flex cursor-pointer relative px-3 py-1 items-center gap-2 text-[12px] text-[#ff4d2d] font-bold bg-[#f7e7e5] rounded-lg"
                >
                  <TbReceiptFilled size={15} className="text-[#ff4d2d] " />
                  <span className="hidden md:block"> My Orders</span>
                  <span className="absolute top-[-10px] right-[-10px] w-[20px] h-[20px] bg-[#ff4d2d] text-white flex items-center justify-center rounded-full">
                    0
                  </span>
                </div>
              </>
            )}
          </>
        ) : null}

        <div
          className="w-10 h-10 rounded-full bg-[#ff4d2d] text-white text-center flex items-center text-[18px] font-bold justify-center shadow-2xl cursor-pointer"
          onClick={() => setShowInfo(!showInfo)}
        >
          {userData?.fullName.slice(0, 1).toUpperCase()}
        </div>
        {showInfo && (
          <div className="fixed top-20 right-2.5 md:right-[10%] lg:right-[18%] w-[180px] bg-white shadow-2xl rounded-xl p-5 flex flex-col gap-2.5 z-[99999]">
            <div className="text-base font-semibold cursor-pointer">
              {userData?.fullName}
            </div>
            {userData.role === "user" && (
              <div
                onClick={() => navigate("/my-orders")}
                className="md:hidden text-[#ff4d2d] font-semibold cursor-pointer"
              >
                My orders
              </div>
            )}

            <div
              className="text-sm font-semibold cursor-pointer text-[#ff4d2d]"
              onClick={handleLogOut}
            >
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
