import axios from "axios";

// Use the Vite environment variable to get the absolute URL for the production API.
// This variable will be injected during the `npm run build` process.
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";

const api = axios.create({
  // Append '/api' to the base URL here, which is a cleaner separation of concerns.
  baseURL: `${BASE_URL}/api`, 
});

export default api;