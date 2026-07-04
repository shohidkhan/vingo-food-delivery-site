import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGetItemByCity } from "../redux/ownerSlice";

const useGetItemByCity = () => {
  const dispatch = useDispatch();
  const { currentCity } = useSelector((state) => state.user);
  const { serverUrl } = useSelector((state) => state.auth);
  useEffect(() => {
    const fetchItemsByCity = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/item/get-item-by-city/${currentCity}`,
          {
            withCredentials: true,
          },
        );
        console.log(result);
        dispatch(setGetItemByCity(result.data.items));
      } catch (error) {
        console.error("Error fetching items by city:", error);
      }
    };
    fetchItemsByCity();
  }, [currentCity, serverUrl, dispatch]);
  return <div></div>;
};

export default useGetItemByCity;
