import { useEffect, useState } from "react";
import ProductTable from "../components/ProductTable";
import AddProduct from "./AddProduct";
import API from "../services/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 400); // 400ms delay

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchProducts = async (query = "") => {
    try {
      setLoading(true);
      const url = query ? `/products/search?q=${encodeURIComponent(query)}` : "/products";
      const res = await API.get(url);
      setProducts(res.data || []);
      console.log("✅ Products loaded:", res.data);
    } catch (err) {
      console.error("❌ Failed to load products:", err.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch products when debounced search changes
  useEffect(() => {
    fetchProducts(debouncedSearch);
  }, [debouncedSearch]);

  // Listen to global productsUpdated event
  useEffect(() => {
    const handler = async () => {
      await fetchProducts(debouncedSearch);
    };
    window.addEventListener("productsUpdated", handler);
    return () => window.removeEventListener("productsUpdated", handler);
  }, [debouncedSearch]);

  // Refresh products after adding a new one
  function handleAdd(newProduct) {
    console.log("🆕 Product added:", newProduct);
    fetchProducts(debouncedSearch);
  }

  return (
    <div className="page">

      {/* Header */}
      <h1 className="page-title">Products</h1>
      <p className="page-subtitle">
        Manage inventory items and stock levels
      </p>

      {/* Grid layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "24px",
          marginTop: "24px"
        }}
      >
        {/* Add Product Card */}
        <div className="card" style={{ transition: "all 0.2s", cursor: "pointer" }}>
          <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "12px" }}>
            Add New Product
          </h3>
          <div className="add-product-container" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <AddProduct onAdd={handleAdd} />
          </div>
        </div>

        {/* Product Table */}
        <div className="card" style={{ transition: "all 0.2s" }}>
          {/* Search always visible */}
          <div className="mb-4">
            <div className="relative">
              <label className="block mb-2 text-gray-300 font-medium">Search Products</label>
              <input
                type="text"
                placeholder="Search by name or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-black-800 border border-gray-700 text-white pl-4 pr-4 py-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {loading ? (
            <p className="text-center p-6 text-gray-400">Loading products...</p>
          ) : products.length === 0 ? (
            <p className="text-center p-6 text-gray-400">No products found. Add one to get started!</p>
          ) : (
            <ProductTable products={products} />
          )}
        </div>
      </div>
    </div>
  );
}
