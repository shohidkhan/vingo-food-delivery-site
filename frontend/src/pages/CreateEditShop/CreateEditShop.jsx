import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setMyShopData } from "../../redux/ownerSlice";

const CreateEditShop = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { myShopData } = useSelector((state) => state.owner);
  const { currentCity, currentState, currentAddress } = useSelector(
    (state) => state.user,
  );
  console.log(myShopData);
  const { serverUrl } = useSelector((state) => state.auth);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  // add this after your useState declarations
  useEffect(() => {
    if (myShopData) {
      setName(myShopData.name || "");
      setCity(myShopData.city || "");
      setState(myShopData.state || "");
      setAddress(myShopData.address || "");
      setFrontendImage(myShopData.image || null);
    } else {
      if (currentCity) setCity(currentCity);
      if (currentState) setState(currentState);
      if (currentAddress) setAddress(currentAddress);
    }
  }, [myShopData, currentCity, currentState, currentAddress]);
  const [frontendImage, setFrontendImage] = useState(null);
  console.log(name, address, city, state, frontendImage);
  const [backendImage, setBackendImage] = useState(null);

  // console.log(city, state, address);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("address", address);
      formData.append("city", city);
      formData.append("state", state);
      formData.append("image", backendImage);
      const result = await axios.post(
        `${serverUrl}/shop/create-edit`,
        formData,
        {
          withCredentials: true,
        },
      );
      dispatch(setMyShopData(result.data.shop));
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-orange-50 to-rose-50 flex flex-col items-center justify-center p-6">
      <div
        className="absolute top-[20px] left-[20px] z-[10] mb-[10px]"
        onClick={() => navigate("/")}
      >
        <IoIosArrowRoundBack
          size={35}
          className="text-[#ff4d2d] cursor-pointer"
        />
      </div>
      <div className="w-full max-w-md mt-10">
        <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-8">
          {/* Icon */}
          <div className="w-14 h-14 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center mx-auto mb-3">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ff4d2d"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 2h1l1 7H3zM20 2h1l-1 7h-1zM5 9a7 7 0 0 0 14 0" />
              <line x1="12" y1="16" x2="12" y2="21" />
              <line x1="9" y1="21" x2="15" y2="21" />
            </svg>
          </div>

          <h2 className="text-center text-xl font-semibold text-gray-900 mb-6">
            {myShopData ? "Edit Shop" : "Create Shop"}
            {/* Edit Shop */}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Shop name"
                className="w-full h-10 border border-gray-300 rounded-lg px-3 text-sm text-gray-900 outline-none focus:border-[#ff4d2d] focus:ring-2 focus:ring-[#ff4d2d]/10 transition"
              />
            </div>

            {/* Shop Image */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Shop Image
              </label>
              <label className="flex items-center h-10 border border-gray-300 rounded-lg px-3 text-sm text-gray-400 cursor-pointer hover:border-[#ff4d2d] transition w-full">
                <span className="truncate">
                  {myShopData ? myShopData.name : "Choose file  No file chosen"}
                </span>
                <input
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
              </label>
              {frontendImage && (
                <div className="mt-2 rounded-lg overflow-hidden h-40 border border-orange-100">
                  <img
                    src={frontendImage}
                    alt="Shop preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* City & State */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                  className="w-full h-10 border border-gray-300 rounded-lg px-3 text-sm text-gray-900 outline-none focus:border-[#ff4d2d] focus:ring-2 focus:ring-[#ff4d2d]/10 transition"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="State"
                  className="w-full h-10 border border-gray-300 rounded-lg px-3 text-sm text-gray-900 outline-none focus:border-[#ff4d2d] focus:ring-2 focus:ring-[#ff4d2d]/10 transition"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Full address"
                className="w-full h-10 border border-gray-300 rounded-lg px-3 text-sm text-gray-900 outline-none focus:border-[#ff4d2d] focus:ring-2 focus:ring-[#ff4d2d]/10 transition"
              />
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="w-full h-11 mt-2 cursor-pointer bg-[#ff4d2d] hover:bg-[#e63d1e] active:scale-[0.99] text-white text-sm font-medium rounded-lg transition"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEditShop;
