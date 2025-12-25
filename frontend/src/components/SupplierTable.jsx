export default function SupplierTable({ suppliers }) {
  return (
    <table className="border w-full">
      <tbody>
        {suppliers.map(s => (
          <tr key={s.name}>
            <td>{s.name}</td>
            <td>{s.contact}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
