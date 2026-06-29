import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setCurrentAddress,
  setCurrentCity,
  setCurrentState,
} from "../redux/userSlice";

const useGetCity = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      //   console.log(position);
      const { latitude, longitude } = position.coords;
      const result = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${import.meta.env.VITE_GEOAPIKEY}`,
      );
      console.log(result.data.results[0]);
      dispatch(setCurrentCity(result?.data?.results[0]?.city));
      dispatch(setCurrentState(result?.data?.results[0]?.state));
      dispatch(setCurrentAddress(result?.data?.results[0]?.address_line2));
    });
  }, [dispatch]);
  return <div></div>;
};

export default useGetCity;
