import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const serverUrl = useSelector((state) => state.auth.serverUrl);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const result = await axios.get(`${serverUrl}/user/current-user`, {
          withCredentials: true,
        });
        setCurrentUser(result.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, [serverUrl]);

  return { currentUser, loading, error };
};

export default useCurrentUser;
