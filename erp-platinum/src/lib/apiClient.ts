import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://localhost:5293/api/v1", // Your .NET API
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
