import { useEffect, useState } from "react";
import { getCategories, type Category } from "@/services/api";
import { Tag, Loader2 } from "lucide-react";

interface Props {
  selectedCategory: number | null;
  onSelect: (id: number | null) => void;
}

const fallbackCategories: Category[] = [
  { id: 1, name: "Fashion" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Home & Kitchen" },
  { id: 4, name: "Baby & Toys" },
  { id: 5, name: "Sports" },
  { id: 6, name: "Digital Goods" },
];

export default function CategorySidebar({ selectedCategory, onSelect }: Props) {
  const [categories, setCategories] = useState<Category[]>(fallbackCategories);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories()
      .then((res) => setCategories(res.data))
      .catch(() => setCategories(fallbackCategories))
      .finally(() => setLoading(false));
  }, []);

  return (
    <aside className="w-full lg:w-56 shrink-0">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Categories</h3>
      {loading ? (
        <div className="flex items-center gap-2 text-muted-foreground text-sm py-2">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading...
        </div>
      ) : (
        <ul className="space-y-1">
          <li>
            <button
              onClick={() => onSelect(null)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                selectedCategory === null
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-foreground hover:bg-secondary"
              }`}
            >
              <Tag className="h-3.5 w-3.5" /> All Products
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => onSelect(cat.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                  selectedCategory === cat.id
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-foreground hover:bg-secondary"
                }`}
              >
                <Tag className="h-3.5 w-3.5" /> {cat.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
