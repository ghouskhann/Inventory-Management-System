import { useState } from "react";
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
  const [success, setSuccess] = useState(false);
  const [isDuplicateError, setIsDuplicateError] = useState(false);

  async function handleSubmit(e) {
    e?.preventDefault();
    setError(null);
    setSuccess(false);
    setIsDuplicateError(false);

    // Validate form
    if (!name.trim()) {
      setError("Product name is required");
      return;
    }

    const payload = {
      name: name.trim(),
      quantity: Number(quantity || 0),
      minStock: Number(minStock || 0),
      category: category.trim() || "Uncategorized",
      supplier: supplier.trim() || "Not Specified",
    };

    setLoading(true);

    try {
      const res = await API.post("/products", payload);
      const created = res.data;

      console.log("✅ Product created:", created);

      if (!created || !created._id) throw new Error("Product not saved!");

      setSuccess(true);
      
      // Call parent's callback to refresh products
      if (onAdd) onAdd(created);

      // Notify other parts of the app (e.g., dashboard) that products changed
      try {
        window.dispatchEvent(new CustomEvent("productsUpdated", { detail: created }));
      // eslint-disable-next-line no-unused-vars
      } catch (e) {
        // ignore in non-browser test environments
      }
      // Reset form
      setName("");
      setQuantity(0);
      setMinStock(0);
      setCategory("");
      setSupplier("");

      // Clear success message after 2 seconds
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      console.error("❌ Error creating product:", err.response?.data || err.message);
      const errorMessage = err.response?.data?.error || "Failed to save product to database";
      setError(errorMessage);
      if (errorMessage === "Product from this supplier already exists") {
        setIsDuplicateError(true);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {isDuplicateError && (
        <div className="bg-red-600 text-white p-4 rounded mb-4 font-semibold">
          ⚠️ {error}
        </div>
      )}
      <form className="space-y-3 max-w-md card" onSubmit={handleSubmit}>
        <h3 className="card-title">Add Product</h3>

      <div>
        <label className="block mb-2 text-gray-300 font-medium">Product Name *</label>
        <input 
          required
          value={name} 
          onChange={(e)=>setName(e.target.value)} 
          className="bg-gray-800 border border-gray-700 text-white p-3 w-full rounded-lg" 
          placeholder="Enter product name"
        />
      </div>

      <div>
        <label className="block mb-2 text-gray-300 font-medium">Quantity</label>
        <input 
          type="number" 
          value={quantity} 
          onChange={(e)=>setQuantity(e.target.value)} 
          className="bg-gray-800 border border-gray-700 text-white p-3 w-full rounded-lg" 
          placeholder="0"
        />
      </div>

      <div>
        <label className="block mb-2 text-gray-300 font-medium">Minimum Stock</label>
        <input 
          type="number" 
          value={minStock} 
          onChange={(e)=>setMinStock(e.target.value)} 
          className="bg-gray-800 border border-gray-700 text-white p-3 w-full rounded-lg" 
          placeholder="0"
        />
      </div>

      <div>
        <label className="block mb-2 text-gray-300 font-medium">Category</label>
        <input 
          value={category} 
          onChange={(e)=>setCategory(e.target.value)} 
          className="bg-gray-800 border border-gray-700 text-white p-3 w-full rounded-lg" 
          placeholder="e.g., Electronics"
        />
      </div>

      <div>
        <label className="block mb-2 text-gray-300 font-medium">Supplier</label>
        <input 
          value={supplier} 
          onChange={(e)=>setSupplier(e.target.value)} 
          className="bg-gray-800 border border-gray-700 text-white p-3 w-full rounded-lg" 
          placeholder="e.g., Supplier Inc."
        />
      </div>

        {error && !isDuplicateError && <div className="text-sm text-red-400 bg-red-900 bg-opacity-30 p-2 rounded">{error}</div>}
        {success && <div className="text-sm text-green-400 bg-green-900 bg-opacity-30 p-2 rounded">✅ Product added successfully!</div>}

        <div>
          <Button text={loading ? "Adding..." : "Add Product"} onClick={handleSubmit} />
        </div>
      </form>
    </div>
  );
}
