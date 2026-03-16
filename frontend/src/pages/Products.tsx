import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CategorySidebar from "@/components/CategorySidebar";
import ProductCard, { ProductCardSkeleton } from "@/components/ProductCard";
import { getProducts, type Product } from "@/services/api";

const mockProducts: Product[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: ["Wireless Earbuds Pro", "Cotton T-Shirt", "Smart Watch Ultra", "Running Shoes", "Laptop Stand", "Phone Case", "Backpack Travel", "LED Desk Lamp", "Yoga Mat", "Bluetooth Speaker", "Sunglasses Premium", "Leather Wallet"][i],
  description: "High quality product with great value",
  price: [299000, 149000, 1299000, 599000, 249000, 79000, 399000, 189000, 159000, 349000, 199000, 289000][i],
  stock: 50,
  category_id: (i % 6) + 1,
}));

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then((res) => setProducts(res.data))
      .catch(() => setProducts(mockProducts))
      .finally(() => setLoading(false));
  }, []);

  const filtered = products.filter((p) => {
    const matchCategory = selectedCategory === null || p.category_id === selectedCategory;
    const matchSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <CategorySidebar selectedCategory={selectedCategory} onSelect={setSelectedCategory} />
      <div className="flex-1">
        <div className="flex items-center justify-between mb-6">
          <h1 className="section-title">
            {searchQuery ? `Results for "${searchQuery}"` : "All Products"}
          </h1>
          <span className="text-sm text-muted-foreground">{filtered.length} products</span>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg">No products found</p>
            <p className="text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}
