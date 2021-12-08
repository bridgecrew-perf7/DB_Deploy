import axios from "axios";
require("dotenv").config();

const apiClient = axios.create({
  // baseURL: process.env.REACT_APP_API_BASEURL,
  baseURL: `${window.location.protocol}//${window.location.hostname}:${process.env.PORT}/api`,
  timeout: 5000,
  withCredentials: true,
  headers: {
    "content-type": "application/json",
  },
});

export default apiClient;
