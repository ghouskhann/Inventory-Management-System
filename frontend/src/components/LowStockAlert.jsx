export default function LowStockAlert({ item }) {
  return (
    <div className="card" style={{ borderLeft: "4px solid #dc2626" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>{item.name}</span>
        <span style={{ color: "#f87171", fontWeight: 600 }}>
          {item.quantity} left
        </span>
      </div>
    </div>
  );
}
