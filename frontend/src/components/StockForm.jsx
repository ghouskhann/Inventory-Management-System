import { useState, useEffect } from "react";
import API, { createTransaction } from "../services/api";

export default function StockForm({ onTransaction }) {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    productId: "",
    type: "in",
    quantity: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data || []);
      } catch (err) {
        console.error("Failed to load products:", err);
      }
    };
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.productId || !formData.quantity) return;

    setLoading(true);
    try {
      await createTransaction({
        productId: formData.productId,
        type: formData.type,
        quantity: Number(formData.quantity)
      });
      alert("Transaction recorded successfully!");
      setFormData({ productId: "", type: "in", quantity: "" });
      // Refresh products to show updated quantities
      const res = await API.get("/products");
      setProducts(res.data || []);
      // Notify parent to refresh low stock alerts
      if (onTransaction) onTransaction();
      // Dispatch global event for other components
      window.dispatchEvent(new Event("productsUpdated"));
    } catch (err) {
      console.error("Error creating transaction:", err);
      const message = err.response?.data?.error || "Failed to record transaction";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="flex items-center mb-2 text-gray-300 font-medium">
          <svg className="w-2.5 h-2.5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          Product
        </label>
        <select
          value={formData.productId}
          onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
          className="bg-gray-800 border border-gray-700 text-white p-3 w-full rounded-lg"
          required
        >
          <option value="">Select a product</option>
          {products.map(product => (
            <option key={product._id} value={product._id}>
              {product.name} (Current: {product.quantity})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="flex items-center mb-2 text-gray-300 font-medium">
          <svg className="w-2.5 h-2.5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
          Transaction Type
        </label>
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="bg-gray-800 border border-gray-700 text-white p-3 w-full rounded-lg"
        >
          <option value="in">Stock In (Purchase/Restock)</option>
          <option value="out">Stock Out (Sale/Return)</option>
        </select>
      </div>

      <div>
        <label className="flex items-center mb-2 text-gray-300 font-medium">
          <svg className="w-2.5 h-2.5 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h16" />
          </svg>
          Quantity
        </label>
        <input
          type="number"
          value={formData.quantity}
          onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
          className="bg-gray-800 border border-gray-700 text-white p-3 w-full rounded-lg"
          placeholder="Enter quantity"
          min="1"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-lg font-medium hover:from-red-700 hover:to-red-800 active:scale-95 transition-all duration-150 shadow-md hover:shadow-lg w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Recording..." : "Record Transaction"}
      </button>
    </form>
  );
}
