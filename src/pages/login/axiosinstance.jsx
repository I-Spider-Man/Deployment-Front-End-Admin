import axios from "axios";
import { API_BASE_URL } from "../../config/api";
const axiosInstance = axios.create({
  baseURL: API_BASE_URL, 
});


axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
