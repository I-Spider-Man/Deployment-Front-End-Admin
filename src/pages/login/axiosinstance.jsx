import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://15.206.81.11:8079", 
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
