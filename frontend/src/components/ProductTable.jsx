export default function ProductTable({ products }) {
  if (!products.length) return <p>No products found</p>;

  return (
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
          <tr key={p._id}>
            <td>{p.name}</td>
            <td>{p.category || "-"}</td>
            <td>{p.supplier || "-"}</td>
            <td>{p.quantity}</td>
            <td style={{ color: p.quantity <= p.minStock ? "red" : "green" }}>
              {p.quantity <= p.minStock ? "LOW" : "OK"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
