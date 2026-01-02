import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

/**
 * Optional: global error logger (safe)
 */
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      "API ERROR:",
      error?.response?.status,
      error?.response?.data || error.message
    );
    return Promise.reject(error);
  }
);

// =======================
// Product APIs
// =======================
export const getProducts = () => API.get("/products");
export const searchProducts = (q) =>
  API.get(`/products/search?q=${encodeURIComponent(q)}`);
export const createProduct = (data) => API.post("/products", data);
export const updateStock = (id, amount) =>
  API.put(`/products/stock/${id}`, { amount });

// =======================
// Transaction APIs
// =======================
export const createTransaction = (data) =>
  API.post("/transactions", data);
export const getTransactions = () =>
  API.get("/transactions");
export const getTransactionsByProduct = (productId) =>
  API.get(`/transactions/product/${productId}`);

export default API;
