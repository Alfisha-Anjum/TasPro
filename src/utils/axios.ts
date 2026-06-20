import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://app.tasprocompany.in/api",
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

export default axiosInstance;
