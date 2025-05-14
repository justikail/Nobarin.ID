import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TMDB_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("TMDB API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

/**
 * Reusable TMDB API request handler
 * @param {string} url - API endpoint
 * @param {string} method - HTTP method (default: GET)
 * @param {object} data - Payload for POST/PUT or query params for GET
 * @param {object} config - Additional axios config
 */
export async function tmdbRequest(url, method = "GET", data = null, config = {}) {
  try {
    const response = await axiosInstance.request({
      url,
      method,
      ...(method === "GET" ? { params: data } : { data }),
      ...config,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
}
