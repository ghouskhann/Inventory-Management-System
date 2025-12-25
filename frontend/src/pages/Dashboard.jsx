import StatCard from "../components/StatCard";
import LowStockAlert from "../components/LowStockAlert";

export default function Dashboard() {
  const lowStock = [
    { name: "Classic Paan", quantity: 4 },
    { name: "Saada Paan", quantity: 3 },
  ];

  return (
    <div className="page">

      {/* Header */}
      <h1 className="page-title">Dashboard</h1>
      <p className="page-subtitle">
        Inventory overview & alerts
      </p>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "24px",
          marginBottom: "32px"
        }}
      >
        <StatCard title="Total Products" value="45" />
        <StatCard title="Low Stock Items" value="2" />
        <StatCard title="Suppliers" value="6" />
        <StatCard title="Categories" value="5" />
      </div>

      {/* Alerts */}
      <div className="card">
        <h2 className="page-title" style={{ fontSize: "18px" }}>
          Low Stock Alerts
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {lowStock.map(item => (
            <LowStockAlert key={item.name} item={item} />
          ))}
        </div>
      </div>

    </div>
  );
}
