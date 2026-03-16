import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroBanner1 from "@/assets/hero-banner-1.jpg";
import heroBanner2 from "@/assets/hero-banner-2.jpg";

const slides = [
  {
    image: heroBanner1,
    title: "Shop the Best Deals",
    subtitle: "Discover thousands of products at unbeatable prices",
    cta: "Shop Now",
  },
  {
    image: heroBanner2,
    title: "Electronics Sale",
    subtitle: "Up to 50% off on top electronics brands",
    cta: "Explore",
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  return (
    <div className="relative w-full overflow-hidden rounded-xl aspect-[3/1] min-h-[200px]">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-500 ${i === current ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <img src={slide.image} alt={slide.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 to-transparent flex items-center">
            <div className="container">
              <div className="max-w-lg space-y-3 text-primary-foreground">
                <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight">{slide.title}</h2>
                <p className="text-sm sm:text-base opacity-90">{slide.subtitle}</p>
                <Link to="/products" className="btn-cart inline-block text-sm">
                  {slide.cta} →
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-card/80 text-foreground hover:bg-card transition-colors">
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-card/80 text-foreground hover:bg-card transition-colors">
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`h-2 rounded-full transition-all ${i === current ? "w-6 bg-accent" : "w-2 bg-card/60"}`} />
        ))}
      </div>
    </div>
  );
}
