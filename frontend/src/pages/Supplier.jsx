import { useEffect, useState } from "react";
import SupplierTable from "../components/SupplierTable";
import API from "../services/api";

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    let mounted = true;
    API.get("/suppliers")
      .then((res) => {
        if (!mounted) return;
        setSuppliers(res.data || []);
      })
      .catch(async () => {
        // fallback: derive from products or sample
        try {
          const res = await API.get("/products");
          if (!mounted) return;
          const supNames = Array.from(new Set((res.data || []).map((p) => p.supplier || "Unknown")));
          setSuppliers(supNames.map((name, i) => ({ id: i + 1, name, contact: "-" })));
        // eslint-disable-next-line no-unused-vars
        } catch (e) {
          if (!mounted) return;
          setSuppliers([
            { id: 1, name: "Lahore Betel", contact: "0301-1111111" },
            { id: 2, name: "Karachi Traders", contact: "0321-2222222" },
          ]);
        }
      });

    return () => (mounted = false);
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Suppliers</h2>
      <div className="card">
        <SupplierTable suppliers={suppliers} />
      </div>
    </div>
  );
}
