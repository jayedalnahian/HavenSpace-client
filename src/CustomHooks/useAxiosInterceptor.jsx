import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", // replace with your real API base
});

const useAxiosInterceptor = () => {
  const { logout, user } = useAuth();
  const token = user?.accessToken;

  useEffect(() => {
    // Setup request interceptor
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Setup response interceptor
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          logout()
            .then(() => {
              console.warn("Logged out due to auth error:", error.response.status);
            })
            .catch((err) => console.error("Logout failed:", err));
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on unmount
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [token, logout]);

  return axiosInstance;
};

export default useAxiosInterceptor;
