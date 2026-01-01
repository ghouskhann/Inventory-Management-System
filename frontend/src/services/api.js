import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Attach token to every request EXCEPT login
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");

    if (
      token &&
      !req.url.includes("/auth/login")
    ) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => Promise.reject(error)
);

// Optional: response error logging (VERY useful)
API.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error(
      "API Error:",
      err.response?.status,
      err.response?.data
    );
    return Promise.reject(err);
  }
);

// Transaction APIs
export const createTransaction = (data) => API.post("/transactions", data);
export const getTransactions = () => API.get("/transactions");
export const getTransactionsByProduct = (productId) =>
  API.get(`/transactions/product/${productId}`);

// Product APIs
export const updateStock = (id, amount) =>
  API.put(`/products/stock/${id}`, { amount });

export default API;
