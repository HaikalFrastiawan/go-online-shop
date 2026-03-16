import { Link } from "react-router-dom";
import { ShoppingCart, Heart, User, Menu, X, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50">
      {/* Topbar */}
      <div className="bg-topbar text-topbar-foreground">
        <div className="container flex items-center justify-between py-2 text-xs">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> support@indomarket.com</span>
            <span className="hidden sm:flex items-center gap-1"><Phone className="h-3 w-3" /> +62 812 3456 7890</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="flex items-center gap-1 hover:text-accent transition-colors">
              <User className="h-3 w-3" /> Login
            </Link>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="bg-card border-b border-border shadow-sm">
        <div className="container flex items-center justify-between gap-4 py-3">
          <Link to="/" className="text-xl font-extrabold tracking-tight text-primary shrink-0">
            INDOMARKET
          </Link>

          <div className="hidden md:flex flex-1 justify-center">
            <SearchBar />
          </div>

          <div className="flex items-center gap-3">
            <Link to="/products" className="hidden md:inline-flex text-sm font-medium text-foreground hover:text-primary transition-colors">
              Shop
            </Link>
            <button className="relative p-2 text-foreground hover:text-primary transition-colors">
              <Heart className="h-5 w-5" />
            </button>
            <Link to="/cart" className="relative p-2 text-foreground hover:text-primary transition-colors">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-accent-foreground text-[10px] font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
            <button className="md:hidden p-2 text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border p-4 space-y-3 animate-slide-in">
            <SearchBar />
            <Link to="/products" onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-medium text-foreground hover:text-primary">
              Shop All Products
            </Link>
            <Link to="/cart" onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-medium text-foreground hover:text-primary">
              Cart ({totalItems})
            </Link>
            <Link to="/login" onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-medium text-foreground hover:text-primary">
              Login
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
