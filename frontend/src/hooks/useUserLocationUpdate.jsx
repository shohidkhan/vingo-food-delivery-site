import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useUserLocationUpdate = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const { serverUrl } = useSelector((state) => state.auth);

  useEffect(() => {
    const updateLocation = async (lat, lon) => {
      try {
        const result = await axios.put(
          `${serverUrl}/user/update-location`,
          { lat, lon },
          {
            withCredentials: true,
          },
        );

        // console.log(lat, lon);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    };

    navigator.geolocation.watchPosition((pos) => {
      const { latitude, longitude } = pos.coords;

      // console.log(pos);
      updateLocation(latitude, longitude);
    });
  }, [serverUrl]);
  return <div></div>;
};

export default useUserLocationUpdate;
