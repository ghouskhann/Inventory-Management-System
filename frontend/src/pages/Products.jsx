import { useEffect, useState } from "react";
import ProductTable from "../components/ProductTable";
import AddProduct from "./AddProduct";
import API from "../services/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    API.get("/products")
      .then(res => {
        if (mounted) setProducts(res.data || []);
      })
      .catch(() => setProducts([]))
      .finally(() => mounted && setLoading(false));

    return () => (mounted = false);
  }, []);

async function handleAdd() {
  const res = await API.get("/products");
  setProducts(res.data || []);
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
          {loading ? (
            <p style={{ textAlign: "center", padding: "24px", color: "#9ca3af" }}>
              Loading products...
            </p>
          ) : (
            <ProductTable products={products} />
          )}
        </div>
      </div>

    </div>
  );
}
