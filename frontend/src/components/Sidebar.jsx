import { NavLink } from "react-router-dom";

const allLinks = [
  { name: "Dashboard", path: "/", roles: ["Admin", "Manager"] },
  { name: "Products", path: "/products", roles: ["Admin", "Manager"] },
  { name: "Categories", path: "/categories", roles: ["Admin", "Manager"] },
  { name: "Suppliers", path: "/suppliers", roles: ["Admin", "Manager"] },
  { name: "Stock", path: "/stock", roles: ["Admin", "Manager"] },
  { name: "Users", path: "/users", roles: ["Admin"] },
  { name: "Reports", path: "/reports", roles: ["Admin", "Manager"] },
];

export default function Sidebar() {
  const role = localStorage.getItem("role") || "Manager";
  const links = allLinks.filter(link => link.roles.includes(role));

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
