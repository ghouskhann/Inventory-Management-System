import API from "../services/api";
import Button from "./Button";

export default function ProductTable({ products }) {
  const handleDelete = async (product) => {
    if (!window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      return;
    }

    try {
      await API.delete(`/products/${product._id}`);
      window.dispatchEvent(new CustomEvent("productsUpdated"));
    } catch (err) {
      alert(`Failed to delete product: ${err.response?.data?.error || err.message}`);
    }
  };

  return (
    <div className="card">
      <h3 className="page-title">Product Inventory</h3>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Supplier</th>
            <th>Qty</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p._id || p.id}>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>{p.supplier}</td>
              <td>{p.quantity}</td>
              <td style={{ color: p.quantity <= p.minStock ? "#f87171" : "#4ade80" }}>
                {p.quantity <= p.minStock ? "Low" : "OK"}
              </td>
              <td>
                <Button text="Delete" onClick={() => handleDelete(p)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
