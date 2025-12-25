import { useState } from "react";
import InputField from "../components/Inputfield";
import Button from "../components/Button";
import API from "../services/api";

export default function AddProduct({ onAdd }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [minStock, setMinStock] = useState(0);
  const [category, setCategory] = useState("");
  const [supplier, setSupplier] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e?.preventDefault();
    setError(null);
    const payload = {
      name,
      quantity: Number(quantity || 0),
      minStock: Number(minStock || 0),
      category,
      supplier,
    };

    setLoading(true);
    try {
      const res = await API.post("/products", payload);
      const created = res.data;
      if (onAdd) onAdd(created);
      // reset
      setName("");
      setQuantity(0);
      setMinStock(0);
      setCategory("");
      setSupplier("");
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      // If backend requires admin token and call fails, still update UI locally
      const fallback = { id: Date.now(), ...payload };
      if (onAdd) onAdd(fallback);
      setError("Could not save to server (offline or unauthorized). Added locally.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-3 max-w-md card" onSubmit={handleSubmit}>
      <h3 className="card-title">Add Product</h3>

      <div>
        <label className="block mb-2 text-gray-300 font-medium">Product Name</label>
        <input value={name} onChange={(e)=>setName(e.target.value)} className="bg-gray-800 border border-gray-700 text-white p-3 w-full rounded-lg" />
      </div>

      <div>
        <label className="block mb-2 text-gray-300 font-medium">Quantity</label>
        <input type="number" value={quantity} onChange={(e)=>setQuantity(e.target.value)} className="bg-gray-800 border border-gray-700 text-white p-3 w-full rounded-lg" />
      </div>

      <div>
        <label className="block mb-2 text-gray-300 font-medium">Minimum Stock</label>
        <input type="number" value={minStock} onChange={(e)=>setMinStock(e.target.value)} className="bg-gray-800 border border-gray-700 text-white p-3 w-full rounded-lg" />
      </div>

      <div>
        <label className="block mb-2 text-gray-300 font-medium">Category</label>
        <input value={category} onChange={(e)=>setCategory(e.target.value)} className="bg-gray-800 border border-gray-700 text-white p-3 w-full rounded-lg" />
      </div>

      <div>
        <label className="block mb-2 text-gray-300 font-medium">Supplier</label>
        <input value={supplier} onChange={(e)=>setSupplier(e.target.value)} className="bg-gray-800 border border-gray-700 text-white p-3 w-full rounded-lg" />
      </div>

      {error && <div className="text-sm text-yellow-300">{error}</div>}

      <div>
        <Button text={loading ? "Adding..." : "Add Product"} onClick={handleSubmit} />
      </div>
    </form>
  );
}
