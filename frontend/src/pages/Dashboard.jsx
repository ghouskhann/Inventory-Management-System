import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import LowStockAlert from "../components/LowStockAlert";
import API from "../services/api";

export default function Dashboard() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [lowStockItems, setLowStockItems] = useState(0);
  const [suppliers, setSuppliers] = useState(0);
  const [categories, setCategories] = useState(0);
  const [lowStock, setLowStock] = useState([]);

  const fetchStats = async () => {
    try {
      const res = await API.get("/products");
      const products = res.data || [];

      // Compute stats
      const total = products.length;
      const lowStockCount = products.filter(
        (p) => Number(p.quantity || 0) <= 5
      ).length;

      const categoriesSet = new Set(
        products.map((p) => p.category || "Uncategorized")
      );
      const suppliersSet = new Set(
        products.map((p) => p.supplier || "Not Specified")
      );

      const lowStockItemsList = products
        .filter((p) => Number(p.quantity || 0) <= 5)
        .slice(0, 5);

      // Set state safely
      setTotalProducts(total);
      setLowStockItems(lowStockCount);
      setCategories(categoriesSet.size);
      setSuppliers(suppliersSet.size);
      setLowStock(lowStockItemsList);
    } catch (err) {
      console.error("Failed to fetch product stats:", err);
    }
  };

  useEffect(() => {
    const loadStats = async () => {
      await fetchStats();
    };
    loadStats();

    const handler = async () => {
      await fetchStats();
    };
    window.addEventListener("productsUpdated", handler);

    return () => window.removeEventListener("productsUpdated", handler);
  }, []);

  return (
    <div className="page">

      {/* Header */}
      <h1 className="page-title">Dashboard</h1>
      <p className="page-subtitle">Inventory overview & alerts</p>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "24px",
          marginBottom: "32px",
        }}
      >
        <StatCard title="Total Products" value={totalProducts} />
        <StatCard title="Low Stock Items" value={lowStockItems} />
        <StatCard title="Suppliers" value={suppliers} />
        <StatCard title="Categories" value={categories} />
      </div>

      {/* Alerts */}
      <div className="card">
        <h2 className="page-title" style={{ fontSize: "18px" }}>
          Low Stock Alerts
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {lowStock.map((item) => (
            <LowStockAlert key={item._id || item.name} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
