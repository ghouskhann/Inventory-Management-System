export default function Stock() {
  return (
    <div className="card">
      <h2 className="card-title">Stock Management</h2>
      <p className="text-muted">
        Track stock in / out and low inventory alerts.
      </p>

      <table className="mt-4">
        <thead>
          <tr>
            <th>Product</th>
            <th>Available</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Paan Classic</td>
            <td>12</td>
            <td style={{ color: "orange" }}>Low</td>
          </tr>
          <tr>
            <td>Meetha Paan</td>
            <td>40</td>
            <td style={{ color: "green" }}>OK</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
