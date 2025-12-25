import { NavLink } from "react-router-dom";

const links = [
  { name: "Dashboard", path: "/" },
  { name: "Products", path: "/products" },
  { name: "Categories", path: "/categories" },
  { name: "Suppliers", path: "/suppliers" },
  { name: "Stock", path: "/stock" },
  { name: "Users", path: "/users" },
  { name: "Reports", path: "/reports" },
];

export default function Sidebar() {
  return (
    <aside className="card" style={{ width: "260px", borderRadius: "0" }}>
      <h3 className="page-subtitle" style={{ marginBottom: "16px" }}>
        Navigation
      </h3>

      <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {links.map(link => (
          <NavLink
            key={link.name}
            to={link.path}
            style={({ isActive }) => ({
              padding: "12px 16px",
              borderRadius: "8px",
              color: isActive ? "#fff" : "#cbd5f5",
              background: isActive ? "#dc2626" : "transparent",
              textDecoration: "none",
              fontWeight: 500
            })}
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
