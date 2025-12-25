export default function Navbar() {
  return (
    <header className="card" style={{ borderRadius: "0", borderLeft: "none", borderRight: "none" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "20px", fontWeight: 700, color: "#f87171" }}>
            Khan’s Management System
          </h1>
          <p className="page-subtitle">Inventory • Stock • Sales</p>
        </div>

        <div style={{ display: "flex", gap: "16px" }}>
          <button className="btn">Notifications</button>
          <button className="btn">Profile</button>
        </div>
      </div>
    </header>
  );
}
