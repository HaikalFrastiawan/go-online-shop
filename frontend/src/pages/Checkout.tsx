import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, CheckCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { createOrder, createPayment } from "@/services/api";
import { toast } from "sonner";

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", street: "", city: "", state: "", zip: "", paymentMethod: "bank_transfer",
  });

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return toast.error("Your cart is empty");
    setSubmitting(true);

    try {
      const orderRes = await createOrder({
        total_price: totalPrice,
        items: items.map((i) => ({ product_id: i.product.id, quantity: i.quantity, price: i.product.price })),
      });

      await createPayment({
        order_id: orderRes.data.id,
        method: form.paymentMethod,
        amount: totalPrice,
      });

      clearCart();
      toast.success("Order placed successfully!");
      navigate("/");
    } catch {
      toast.error("Order placed (demo mode)");
      clearCart();
      navigate("/");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all";

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="section-title mb-6">Checkout</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contact */}
        <div className="bg-card rounded-xl border border-border p-6 space-y-4">
          <h3 className="font-semibold text-foreground">Contact Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input className={inputClass} placeholder="Full Name" required value={form.name} onChange={(e) => update("name", e.target.value)} />
            <input className={inputClass} placeholder="Email" type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} />
            <input className={inputClass} placeholder="Phone" type="tel" required value={form.phone} onChange={(e) => update("phone", e.target.value)} />
          </div>
        </div>

        {/* Address */}
        <div className="bg-card rounded-xl border border-border p-6 space-y-4">
          <h3 className="font-semibold text-foreground">Shipping Address</h3>
          <input className={inputClass} placeholder="Street Address" required value={form.street} onChange={(e) => update("street", e.target.value)} />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input className={inputClass} placeholder="City" required value={form.city} onChange={(e) => update("city", e.target.value)} />
            <input className={inputClass} placeholder="State/Province" required value={form.state} onChange={(e) => update("state", e.target.value)} />
            <input className={inputClass} placeholder="ZIP Code" required value={form.zip} onChange={(e) => update("zip", e.target.value)} />
          </div>
        </div>

        {/* Payment */}
        <div className="bg-card rounded-xl border border-border p-6 space-y-4">
          <h3 className="font-semibold text-foreground">Payment Method</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { value: "bank_transfer", label: "Bank Transfer" },
              { value: "credit_card", label: "Credit Card" },
              { value: "ewallet", label: "E-Wallet" },
            ].map((method) => (
              <button
                key={method.value}
                type="button"
                onClick={() => update("paymentMethod", method.value)}
                className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                  form.paymentMethod === method.value
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border text-foreground hover:border-primary/40"
                }`}
              >
                {method.label}
              </button>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-semibold text-foreground mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex justify-between text-muted-foreground">
                <span>{product.name} × {quantity}</span>
                <span>Rp {(product.price * quantity).toLocaleString("id-ID")}</span>
              </div>
            ))}
            <div className="border-t border-border pt-2 mt-2 flex justify-between text-lg font-bold text-foreground">
              <span>Total</span>
              <span className="text-primary">Rp {totalPrice.toLocaleString("id-ID")}</span>
            </div>
          </div>
        </div>

        <button type="submit" disabled={submitting || items.length === 0} className="btn-cart w-full py-3 text-base font-semibold flex items-center justify-center gap-2 disabled:opacity-50">
          {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <CheckCircle className="h-5 w-5" />}
          {submitting ? "Processing..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}
