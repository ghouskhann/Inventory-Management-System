import { useState } from "react";
import API from "../services/api";

export default function AddProduct({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    supplier: "",
    quantity: 0,
    minStock: 0
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await API.post("/products", {
        ...form,
        quantity: Number(form.quantity),
        minStock: Number(form.minStock),
      });

      setForm({ name:"", category:"", supplier:"", quantity:0, minStock:0 });
      onAdd();
    } catch {
      setError("Failed to save product");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <h3>Add Product</h3>

      {["name","category","supplier","quantity","minStock"].map(f => (
        <input
          key={f}
          name={f}
          value={form[f]}
          onChange={handleChange}
          placeholder={f}
        />
      ))}

      {error && <p style={{ color: "orange" }}>{error}</p>}

      <button disabled={loading}>
        {loading ? "Saving..." : "Add Product"}
      </button>
    </form>
  );
}
