import axios from "axios";

const api = axios.create({
  baseURL: "https://weaving-management-backend.onrender.com/api",
});

export default api;