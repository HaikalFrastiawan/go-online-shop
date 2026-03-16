import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) navigate(`/products?search=${encodeURIComponent(query.trim())}`);
  };

  return (
    <form onSubmit={handleSearch} className="relative flex-1 max-w-xl">
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full rounded-lg border border-input bg-card px-4 py-2.5 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all duration-150"
      />
      <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-primary transition-colors">
        <Search className="h-4 w-4" />
      </button>
    </form>
  );
}
