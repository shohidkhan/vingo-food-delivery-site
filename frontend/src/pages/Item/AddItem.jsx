import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../../redux/authSlice";
import Loading from "../../components/Loading";

const AddItem = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [frontendImage, setFrontendImage] = useState(null);
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [foodType, setFoodType] = useState("");
  const { serverUrl, loading } = useSelector((state) => state.auth);
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [backendImage, setBackendImage] = useState(null);
  useEffect(() => {
    if (userData?.role !== "owner") {
      navigate("/");
    }
  }, [userData, navigate]);
  const categories = [
    "Snacks",
    "Desserts",
    "Main Course",
    "Pizza",
    "Fast Food",
    "Chinese",
    "Bengali",
    "Drinks",
    "others",
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // dispatch(setLoading(true));
      dispatch(setLoading(true));
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", backendImage);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("foodType", foodType);
      const result = await axios.post(`${serverUrl}/item/add-item`, formData, {
        withCredentials: true,
      });
      console.log(result);
      dispatch(setLoading(false));
      navigate("/");
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));
    }
  };
  const handleImageChange = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  if (loading) return <Loading />;

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
            Add Item
            {/* Edit Shop */}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Item Name
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Food item name"
                className="w-full h-10 border border-gray-300 rounded-lg px-3 text-sm text-gray-900 outline-none focus:border-[#ff4d2d] focus:ring-2 focus:ring-[#ff4d2d]/10 transition"
              />
            </div>

            {/* Shop Image */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Food Image
              </label>
              <label className="flex items-center h-10 border border-gray-300 rounded-lg px-3 text-sm text-gray-400 cursor-pointer hover:border-[#ff4d2d] transition w-full">
                <span className="truncate">Choose file No file chosen</span>
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
                    alt="food preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* City & State */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="price"
                  className="w-full h-10 border border-gray-300 rounded-lg px-3 text-sm text-gray-900 outline-none focus:border-[#ff4d2d] focus:ring-2 focus:ring-[#ff4d2d]/10 transition"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Category
                </label>
                <select
                  type="text"
                  name="state"
                  placeholder="State"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-10 border border-gray-300 rounded-lg px-3 text-sm text-gray-900 outline-none focus:border-[#ff4d2d] focus:ring-2 focus:ring-[#ff4d2d]/10 transition"
                >
                  <option value="">Selected Category</option>
                  {categories.map((category, index) => (
                    <option value={category} key={index}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Food Type
              </label>
              <select
                type="text"
                name="state"
                placeholder="State"
                value={foodType}
                onChange={(e) => setFoodType(e.target.value)}
                className="w-full h-10 border border-gray-300 rounded-lg px-3 text-sm text-gray-900 outline-none focus:border-[#ff4d2d] focus:ring-2 focus:ring-[#ff4d2d]/10 transition"
              >
                <option value="">Selected food type</option>
                <option value="veg">Veg</option>
                <option value="non-veg">Non-Veg</option>
              </select>
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

export default AddItem;
