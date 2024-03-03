import axios from "axios";

const API_URL = "http://localhost:5000/api";

const instance = axios.create();
instance.interceptors.request.use((config) => {
  const originalRequest = config;
  originalRequest.baseURL = API_URL;
  return originalRequest;
});

export default instance;
