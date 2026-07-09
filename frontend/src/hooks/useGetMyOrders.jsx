import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMyOrders } from "../redux/userSlice";

const useGetMyOrders = () => {
  const dispatch = useDispatch();
  const { serverUrl } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const result = await axios.get(`${serverUrl}/order/my-orders`, {
          withCredentials: true,
        });
        console.log(result.data);
        dispatch(setMyOrders(result.data));
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    fetchMyOrders();
  }, [serverUrl, dispatch]);

  return <div></div>;
};

export default useGetMyOrders;
