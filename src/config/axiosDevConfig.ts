const BASE_URL = import.meta.env.VITE_API_BASE_URL;

import axios from "axios";

const devApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default devApi;
