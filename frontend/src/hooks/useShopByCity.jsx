import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGetShopByCity } from "../redux/ownerSlice";
import axios from "axios";

const useShopByCity = () => {
  const dispatch = useDispatch();
  const { currentCity } = useSelector((state) => state.user);
  const { serverUrl } = useSelector((state) => state.auth);
  useEffect(() => {
    const fetchShopsByCity = async () => {
      try {
        // Assuming you have an action to fetch shops by city
        const result = await axios.get(
          `${serverUrl}/shop/get-shop-by-city/${currentCity}`,
          {
            withCredentials: true,
          },
        );
        // console.log(result);
        dispatch(setGetShopByCity(result.data));
      } catch (error) {
        console.error("Error fetching shops by city:", error);
      }
    };
    fetchShopsByCity();
  }, [currentCity, dispatch, serverUrl]);
  return <div></div>;
};

export default useShopByCity;
