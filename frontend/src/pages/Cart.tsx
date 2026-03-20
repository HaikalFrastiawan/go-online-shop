import { Link } from "react-router-dom";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { getImageUrl } from "@/services/api";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="text-center py-32 space-y-4">
        <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground/40" />
        <h2 className="text-xl font-semibold text-foreground">Your cart is empty</h2>
        <p className="text-muted-foreground">Start adding some products!</p>
        <Link to="/products" className="btn-cart inline-block">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="section-title mb-6">Shopping Cart</h1>

      <div className="space-y-4">
        {items.map(({ product, quantity }) => {
          const imageUrl = product.images?.[0]?.url ? getImageUrl(product.images[0].url) : `https://placehold.co/100x100/e2e8f0/64748b?text=${encodeURIComponent(product.name.charAt(0))}`;
          return (
            <div key={product.id} className="flex gap-4 p-4 bg-card rounded-xl border border-border">
              <img src={imageUrl} alt={product.name} className="h-20 w-20 rounded-lg object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <Link to={`/products/${product.id}`} className="font-medium text-foreground hover:text-primary text-sm line-clamp-1 transition-colors">
                  {product.name}
                </Link>
                <p className="text-primary font-bold mt-1">Rp {product.price.toLocaleString("id-ID")}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center border border-border rounded-lg">
                    <button onClick={() => updateQuantity(product.id, quantity - 1)} className="p-1.5 hover:bg-secondary transition-colors rounded-l-lg">
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="px-3 text-sm font-medium">{quantity}</span>
                    <button onClick={() => updateQuantity(product.id, quantity + 1)} className="p-1.5 hover:bg-secondary transition-colors rounded-r-lg">
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <button onClick={() => removeFromCart(product.id)} className="p-1.5 text-destructive hover:bg-destructive/10 rounded-lg transition-colors ml-auto">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-foreground">
                  Rp {(product.price * quantity).toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-6 bg-card rounded-xl border border-border">
        <div className="flex items-center justify-between text-lg font-bold text-foreground">
          <span>Total</span>
          <span className="text-primary">Rp {totalPrice.toLocaleString("id-ID")}</span>
        </div>
        <Link to="/checkout" className="btn-cart w-full mt-4 py-3 text-center block text-base font-semibold">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
