import axios from "axios";

const API = axios.create({
  baseURL: "https://app.tasprocompany.in/api",
});

// 🔥 interceptor (BEST WAY)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getCustomerAddresses = async () => {
  const res = await API.get("/customers/customer-addresses", {
    headers: {
      Accept: "application/json",
    },
  });

  return res.data;
};
