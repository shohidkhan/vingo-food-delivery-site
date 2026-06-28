import axios from "axios";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setMyShopData } from "../../redux/ownerSlice";
import { setLoading } from "../../redux/authSlice";
import Loading from "../../components/Loading";

const OwnerItemCard = ({ data }) => {
  const navigate = useNavigate();
  const { serverUrl, loading } = useSelector((state) => state.auth);
  console.log(data);
  const { _id, name, category, foodType, price, image } = data;
  const dispatch = useDispatch();
  const handleRemoveItem = async () => {
    try {
      dispatch(setLoading(true));
      const result = await axios.delete(
        `${serverUrl}/item/delete-item/${_id}`,
        {
          withCredentials: true,
        },
      );
      console.log(result);

      dispatch(setMyShopData(result.data));
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));
    }
  };

  if (loading) return <Loading />;
  return (
    <div className="flex items-center bg-white p-4 shadow-2xl rounded-lg gap-4">
      {/* Product Image */}
      <div className="w-24 h-20 flex-shrink-0 overflow-hidden rounded-md border">
        <img src={image} alt="Burger" className="w-full h-full object-cover" />
      </div>

      {/* Product Details */}
      <div className="flex-1">
        <h2 className="text-sm font-bold text-gray-800">{name}</h2>

        <p className="text-xs text-gray-500 mt-1">
          <span className="font-semibold text-gray-700">Category:</span>{" "}
          {category}
        </p>

        <p className="text-xs text-gray-500">
          <span className="font-semibold text-gray-700">Food Type:</span>{" "}
          {foodType}
        </p>

        <p className="text-sm font-bold text-red-500 mt-2">৳ {price}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col justify-end gap-3">
        <button
          onClick={() => navigate(`/edit-item/${_id}`)}
          className="text-orange-500 cursor-pointer hover:text-orange-600 transition"
        >
          <FaEdit size={14} />
        </button>

        <button
          onClick={handleRemoveItem}
          className="text-red-500 cursor-pointer hover:text-red-600 transition"
        >
          <FaTrash size={14} />
        </button>
      </div>
    </div>
  );
};

export default OwnerItemCard;
