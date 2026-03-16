import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/services/api";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart();
  const imageUrl = product.images?.[0]?.url || `https://placehold.co/400x400/e2e8f0/64748b?text=${encodeURIComponent(product.name)}`;

  return (
    <div className="product-card group">
      <Link to={`/products/${product.id}`} className="block aspect-square overflow-hidden">
        <img
          src={imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
          loading="lazy"
        />
      </Link>
      <div className="p-4 space-y-2">
        <Link to={`/products/${product.id}`} className="block">
          <h3 className="text-sm font-medium text-foreground line-clamp-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">
            Rp {product.price.toLocaleString("id-ID")}
          </span>
          <button
            onClick={() => addToCart(product)}
            className="btn-cart flex items-center gap-1.5 text-xs"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="product-card">
      <div className="aspect-square skeleton" />
      <div className="p-4 space-y-3">
        <div className="h-4 skeleton w-3/4" />
        <div className="flex justify-between items-center">
          <div className="h-5 skeleton w-1/3" />
          <div className="h-8 skeleton w-16 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
