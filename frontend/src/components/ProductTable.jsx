export default function ProductTable({ products }) {
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
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>{p.supplier}</td>
              <td>{p.quantity}</td>
              <td style={{ color: p.quantity <= p.minStock ? "#f87171" : "#4ade80" }}>
                {p.quantity <= p.minStock ? "Low" : "OK"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
