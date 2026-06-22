import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMyShopData } from "../redux/ownerSlice";

const useGetShop = () => {
  const dispatch = useDispatch();
  const { serverUrl } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const result = await axios.get(`${serverUrl}/shop/get-shop`, {
          withCredentials: true,
        });
        console.log(result);
        dispatch(setMyShopData(result.data.shop));
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    fetchShop();
  }, [dispatch, serverUrl]);
  return <div></div>;
};

export default useGetShop;
