import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import StockInOut from "./pages/StockInOut";
import Reports from "./pages/Reports";
import Users from "./pages/Users";
import Categories from "./pages/Categories";
import Supplier from "./pages/Supplier";

function AppLayout() {
  return (
    <div className="app-container">
      <Sidebar />

      <div className="main-content">
        <Navbar />
        <div className="page">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}

import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/suppliers" element={<Supplier />} />
        <Route path="/stock" element={<StockInOut />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/users" element={<Users />} />
      </Route>
    </Routes>
  );
}
