import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { setLoading } from "../redux/authSlice";

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);
  const serverUrl = useSelector((state) => state.auth.serverUrl);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        dispatch(setLoading(true));
        const result = await axios.get(`${serverUrl}/user/current-user`, {
          withCredentials: true,
        });
        setCurrentUser(result.data);
        dispatch(setUserData(result.data));
        dispatch(setLoading(false));
      } catch (error) {
        setError(error.message);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchCurrentUser();
  }, [serverUrl, dispatch]);

  return { currentUser, loading, error };
};

export default useCurrentUser;
