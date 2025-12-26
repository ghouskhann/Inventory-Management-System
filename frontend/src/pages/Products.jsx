import { useEffect, useState } from "react";
import ProductTable from "../components/ProductTable";
import AddProduct from "./AddProduct";
import API from "../services/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadProducts() {
    try {
      const res = await API.get("/products");
      setProducts(res.data || []);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="page">
      <h1 className="page-title">Products</h1>
      <p className="page-subtitle">Manage inventory</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 24 }}>
        <div className="card">
          <AddProduct onAdd={loadProducts} />
        </div>

        <div className="card">
          {loading ? "Loading..." : <ProductTable products={products} />}
        </div>
      </div>
    </div>
  );
}
