import { useEffect, useState } from "react";
import API from "../services/api";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let mounted = true;

    API.get("/categories")
      .then((res) => {
        if (!mounted) return;
        setCategories(res.data || []);
      })
      .catch(async () => {
        // fallback: try deriving from products
        try {
          const res = await API.get("/products");
          if (!mounted) return;
          const cats = Array.from(new Set((res.data || []).map((p) => p.category || "Uncategorized")));
          setCategories(cats.map((c, i) => ({ id: i + 1, name: c })));
        } catch (e) {
          // last fallback: sample data
          if (!mounted) return;
          setCategories([
            { id: 1, name: "Drinks" },
            { id: 2, name: "Red Bull" },
            { id: 3, name: "Traditional" },
            { id: 4, name: "Sweet" },
          ]);
        }
      });

    return () => (mounted = false);
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Categories</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((c) => (
          <div key={c.id || c.name} className="card">
            <div className="text-lg font-semibold text-white">{c.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
