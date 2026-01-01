import { useState, useEffect } from "react";
import StockForm from "../components/StockForm";
import LowStockAlert from "../components/LowStockAlert";
import API from "../services/api";

export default function StockInOut() {
  const [lowStock, setLowStock] = useState([]);

  const fetchLowStock = async () => {
    try {
      const res = await API.get("/products");
      const products = res.data || [];
      const lowStockItems = products.filter(
        (p) => Number(p.quantity || 0) <= 5
      );
      setLowStock(lowStockItems);
    } catch (err) {
      console.error("Failed to fetch low stock:", err);
    }
  };

  useEffect(() => {
    const loadLowStock = async () => {
      await fetchLowStock();
    };
    loadLowStock();
  }, []);

  return (
    <div className="page">
      <h1 className="page-title">Stock In/Out</h1>
      <p className="page-subtitle">Record transactions and manage inventory</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        <div className="card">
          <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "16px" }}>
            Record Transaction
          </h3>
          <StockForm onTransaction={fetchLowStock} />
        </div>

        <div className="card">
          <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "16px" }}>
            Low Stock Alerts
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {lowStock.length === 0 ? (
              <p style={{ color: "#9ca3af" }}>No low stock items</p>
            ) : (
              lowStock.map((item) => (
                <LowStockAlert key={item._id} item={item} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
