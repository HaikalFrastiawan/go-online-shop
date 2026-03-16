import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Truck, CreditCard, RotateCcw, ArrowRight } from "lucide-react";
import HeroBanner from "@/components/HeroBanner";
import ProductCard, { ProductCardSkeleton } from "@/components/ProductCard";
import { getProducts, type Product } from "@/services/api";

const features = [
  { icon: Truck, title: "Fast Shipping", desc: "Free delivery on orders over Rp 200k" },
  { icon: CreditCard, title: "Online Payment", desc: "Secure payment methods available" },
  { icon: RotateCcw, title: "Free Returns", desc: "30-day hassle-free returns" },
];

// Mock products for demo when API is unavailable
const mockProducts: Product[] = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  name: ["Wireless Earbuds Pro", "Cotton T-Shirt", "Smart Watch Ultra", "Running Shoes", "Laptop Stand", "Phone Case", "Backpack Travel", "LED Desk Lamp"][i],
  description: "High quality product",
  price: [299000, 149000, 1299000, 599000, 249000, 79000, 399000, 189000][i],
  stock: 50,
  category_id: (i % 6) + 1,
}));

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res.data.slice(0, 8)))
      .catch(() => setProducts(mockProducts))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-12">
      <HeroBanner />

      {/* Features */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {features.map((f) => (
          <div key={f.title} className="feature-card">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <f.icon className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-foreground">{f.title}</h4>
              <p className="text-xs text-muted-foreground">{f.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Trending Products */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title">Trending Products</h2>
          <Link to="/products" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}
