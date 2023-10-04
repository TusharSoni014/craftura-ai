import axios from "axios";
axios.defaults.withCredentials = true;

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

axiosClient.interceptors.request.use((config) => {
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error.response);
  }
);

export default axiosClient;
