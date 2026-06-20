import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import axios from "axios";

const useCurrentUser = () => {
  const { serverUrl } = useAuth();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
