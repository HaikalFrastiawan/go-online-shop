import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ShoppingCart, Minus, Plus, ChevronLeft, Loader2 } from "lucide-react";
import { getProduct, type Product, getImageUrl } from "@/services/api";
import { useCart } from "@/context/CartContext";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [zoomed, setZoomed] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getProduct(id)
      .then((res) => setProduct(res.data))
      .catch(() => {
        // Mock fallback
        setProduct({
          id: id,
          name: "Sample Product",
          description: "This is a high-quality product with excellent features. Made from premium materials for lasting durability. Perfect for everyday use.",
          price: 299000,
          stock: 50,
          category_id: 1,
        });
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-32 text-muted-foreground">
        <p className="text-lg">Product not found</p>
        <Link to="/products" className="text-primary hover:underline mt-2 inline-block">← Back to products</Link>
      </div>
    );
  }

  const imageUrl = product.images?.[0]?.url ? getImageUrl(product.images[0].url) : `https://placehold.co/600x600/e2e8f0/64748b?text=${encodeURIComponent(product.name)}`;

  return (
    <div>
      <Link to="/products" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
        <ChevronLeft className="h-4 w-4" /> Back to products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image */}
        <div
          className={`relative overflow-hidden rounded-xl border border-border bg-card cursor-zoom-in ${zoomed ? "cursor-zoom-out" : ""}`}
          onClick={() => setZoomed(!zoomed)}
        >
          <img
            src={imageUrl}
            alt={product.name}
            className={`w-full aspect-square object-cover transition-transform duration-300 ${zoomed ? "scale-150" : "scale-100"}`}
          />
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{product.name}</h1>
            <p className="text-3xl font-extrabold text-primary mt-2">
              Rp {product.price.toLocaleString("id-ID")}
            </p>
          </div>

          <p className="text-muted-foreground leading-relaxed">{product.description}</p>

          <div className="text-sm text-muted-foreground">
            Stock: <span className={product.stock > 0 ? "text-green-600 font-medium" : "text-destructive font-medium"}>
              {product.stock > 0 ? `${product.stock} available` : "Out of stock"}
            </span>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-foreground">Quantity:</span>
            <div className="flex items-center border border-border rounded-lg">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:bg-secondary transition-colors rounded-l-lg">
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-4 py-2 text-sm font-medium min-w-[3rem] text-center">{quantity}</span>
              <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="p-2 hover:bg-secondary transition-colors rounded-r-lg">
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <button
            onClick={() => addToCart(product, quantity)}
            disabled={product.stock <= 0}
            className="btn-cart w-full py-3 text-base flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="h-5 w-5" /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
