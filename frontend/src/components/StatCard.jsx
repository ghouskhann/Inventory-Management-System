export default function StatCard({ title, value }) {
  return (
    <div className="card">
      <p className="page-subtitle">{title}</p>
      <h2 style={{ fontSize: "32px", fontWeight: 700 }}>{value}</h2>
    </div>
  );
}
