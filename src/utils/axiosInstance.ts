import axios from "axios";


const axiosInstance = axios.create({
  baseURL: "https://highway-delite-backend-7irg.onrender.com/api" // backend ka base URL
});

// JWT automatically headers me add karne ke liye
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosInstance;
