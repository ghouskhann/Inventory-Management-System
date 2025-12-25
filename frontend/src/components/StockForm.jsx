export default function StockForm() {
  return (
    <div className="space-y-2">
      <input className="border p-2 w-full" placeholder="Product name" />
      <input className="border p-2 w-full" placeholder="Amount" />
      <button className="bg-black text-white px-4 py-2">Update Stock</button>
    </div>
  );
}
