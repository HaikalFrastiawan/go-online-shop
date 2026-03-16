import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-topbar text-topbar-foreground mt-16">
      <div className="container py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-bold mb-4 text-accent">INDOMARKET</h3>
          <p className="text-sm opacity-75">Your trusted online marketplace for quality products at the best prices.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm opacity-75">
            <li><Link to="/products" className="hover:text-accent transition-colors">All Products</Link></li>
            <li><Link to="/cart" className="hover:text-accent transition-colors">Cart</Link></li>
            <li><Link to="/login" className="hover:text-accent transition-colors">My Account</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Categories</h4>
          <ul className="space-y-2 text-sm opacity-75">
            <li>Fashion</li>
            <li>Electronics</li>
            <li>Home & Kitchen</li>
            <li>Sports</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm opacity-75">
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> support@indomarket.com</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +62 812 3456 7890</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Jakarta, Indonesia</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-muted-foreground/20 py-4 text-center text-xs opacity-60">
        © 2026 IndoMarket. All rights reserved.
      </div>
    </footer>
  );
}
