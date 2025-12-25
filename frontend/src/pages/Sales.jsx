import LowStockAlert from "../components/LowStockAlert";

export default function Sales() {
  const salesData = [
    { id: 1, product: "Classic Paan", qty: 5, amount: 500, date: "2025-09-20" },
    { id: 2, product: "Meetha Paan", qty: 8, amount: 960, date: "2025-09-20" },
    { id: 3, product: "Chocolate Paan", qty: 3, amount: 450, date: "2025-09-21" }
  ];

  return (
    <div className="container">
      <h2>Sales Management</h2>

      <LowStockAlert />

      <div className="card">
        <h3>Recent Sales</h3>

        <table width="100%">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Total (PKR)</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((sale) => (
              <tr key={sale.id}>
                <td>{sale.product}</td>
                <td>{sale.qty}</td>
                <td>{sale.amount}</td>
                <td>{sale.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
