import axios from "axios";
const API_URL = "https://api.severyanochka.judle.ru/";
export const apiClient = axios.create({
  baseURL: API_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
  },
  (error) => {
    throw error;
  }
);

apiClient.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("phoneInfo");
      document.location.reload();
    }
    throw error;
  }
);
