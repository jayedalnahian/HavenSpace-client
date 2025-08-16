import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import { getAuth } from "firebase/auth";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", // Replace with actual API URL in prod
});

const useAxiosInterceptor = () => {
  const { logout, user } = useAuth();
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const getToken = async () => {
      if (user) {
        const auth = getAuth();
        const idToken = await auth.currentUser.getIdToken();
        setToken(idToken);
        setReady(true); // ✅ signal that token is ready
      }
    };

    getToken();
  }, [user]);

  useEffect(() => {
    if (!token) return;

    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          logout()
            .then(() =>
              console.warn(
                "Logged out due to auth error:",
                error.response.status
              )
            )
            .catch((err) => console.error("Logout failed:", err));
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [token, logout]);

  // ⛔ block until token is ready
  return ready ? axiosInstance : null;
};

export default useAxiosInterceptor;
