import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const instance = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("adminToken");
      if (token && typeof token === "string") {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
      }
    }
    return Promise.reject(error || new Error("Request failed"));
  }
);

export default instance;