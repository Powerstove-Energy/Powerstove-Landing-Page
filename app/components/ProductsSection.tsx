"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

type Product = {
  id: number;
  badge?: string;
  badgeColor?: string;
  image: string;
  category: string;
  name: string;
  desc: string;
  price: string;
  tab: string;
};

const products: Product[] = [
  {
    id: 1,
    badge: "FEATURED",
    badgeColor: "#FF9500",
    image: "/Powerstove X200.webp",
    category: "HOUSEHOLD COOKSTOVES",
    name: "Powerstove X200",
    desc: "Our flagship advanced household cookstove with slide-folding design, built-in 4200mAh Lithium Ion Battery, and continuous 10W/1V output. Cooks 5x faster while generating electricity. Includes IoT monitoring chip for carbon credits.",
    price: "₦220,000",
    tab: "Cookstoves",
  },
  {
    id: 2,
    image: "/GoodLife Biomass Pellets.webp",
    category: "HOUSEHOLD COOKSTOVES",
    name: "T100 Pellet Stove",
    desc: "Advanced efficient household cookstove with replaceable burn chamber, designed specifically for GoodLife Biomass Pellets. Lower smoke emissions and 60% more efficient than charcoal cooking. Ideal for urban households.",
    price: "₦45,000",
    tab: "Cookstoves",
  },
  {
    id: 3,
    badge: "NEW",
    badgeColor: "#22c55e",
    image: "/Powerstov X200.webp",
    category: "HOUSEHOLD COOKSTOVES",
    name: "Powerstove X200",
    desc: "Our flagship advanced household cookstove with slide-folding design, built-in 4200mAh Lithium Ion Battery, and continuous 10W/1V output. Cooks 5x faster while generating electricity. Includes IoT monitoring chip for carbon credits.",
    price: "₦220,000",
    tab: "Cookstoves",
  },
  {
    id: 4,
    image: "/W100 Rocket Stove.webp",
    category: "T400",
    name: "W100 Rocket Stove",
    desc: "World's most fuel-efficient rocket stove designed for household and small enterprise use. Uses any biomass fuel. Ideal for community kitchens, small restaurants and catering businesses.",
    price: "₦18,000",
    tab: "Cookstoves",
  },
  {
    id: 5,
    image: "/Powerstove3.webp",
    category: "FUEL & BIOMASS",
    name: "GoodLife Biomass Pellets",
    desc: "Locally produced high-density biomass briquette pellets from agricultural waste. Clean-burning, consistent heat output, and zero deforestation impact. Available in 3kg, 10kg and 50kg sacks for households and businesses.",
    price: "₦1,000 / 3kg",
    tab: "Pellets & Fuel",
  },
  {
    id: 6,
    image: "/Biomass pellets.webp",
    category: "FUEL & BIOMASS",
    name: "GoodLife Biomass Pellets",
    desc: "Locally produced high-density biomass briquette pellets from agricultural waste. Clean-burning, consistent heat output, and zero deforestation impact. Available in 3kg, 10kg and 50kg sacks for households and businesses.",
    price: "₦1,000 / 3kg",
    tab: "Pellets & Fuel",
  },
  {
    id: 7,
    image: "/Mini Electricity Kit.webp",
    category: "OFF-GRID ELECTRICITY",
    name: "Hot Bird Burner",
    desc: "Complete off-grid electricity generation kit compatible with the Powerstove X200. Extends the stove's power output to run larger appliances, store excess energy, and power homes after cooking hours.",
    price: "₦120,000",
    tab: "Cookstoves",
  },
  {
    id: 8,
    image: "/Solar Box.webp",
    category: "OFF-GRID ELECTRICITY",
    name: "Stove",
    desc: "Complete off-grid electricity generation kit compatible with the Powerstove X200. Extends the stove's power output to run larger appliances, store excess energy, and power homes after cooking hours.",
    price: "₦120,000",
    tab: "Cookstoves",
  },
  {
    id: 9,
    image: "/Electricity Kit.webp",
    category: "OFF-GRID ELECTRICITY",
    name: "Solar Box",
    desc: "Portable solar power box for lighting, phone charging, and small device power. Works as a standalone off-grid power unit or complement to the Powerstove electricity generation kit.",
    price: "₦65,000",
    tab: "Accessories",
  },
];

const tabs = ["All", "Cookstoves", "Pellets & Fuel", "Electricity Kits", "Accessories"];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function AnimatedHeader() {
  const { ref, visible } = useInView(0.2);
  return (
    <div
      ref={ref}
      className="text-center mb-10"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#FF9500" }}>
        Our Products
      </span>
      <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-900">
        Our Clean Energy Products
      </h2>
      <div className="mt-3 w-10 h-1 rounded-full mx-auto" style={{ backgroundColor: "#FF9500" }} />
      <p className="mt-4 text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
        Renewable energy products meet community-first innovation to power a greener Africa.
      </p>
    </div>
  );
}

function ProductCard({
  product,
  index,
  currency,
}: {
  product: Product;
  index: number;
  currency: "NGN" | "USD";
}) {
  const { ref, visible } = useInView(0.1);

  const usdPrice = product.price.startsWith("₦")
    ? "$" + (parseInt(product.price.replace(/[₦,]/g, "")) / 1600).toFixed(0)
    : product.price;

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(40px) scale(0.97)",
        transition: `opacity 0.6s ease ${index * 0.08}s, transform 0.6s ease ${index * 0.08}s`,
      }}
    >
      {/* Image */}
      <div className="relative w-full h-52 bg-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.badge && (
          <span
            className="absolute top-3 left-3 text-white text-xs font-bold px-2.5 py-1 rounded-full"
            style={{ backgroundColor: product.badgeColor }}
          >
            {product.badge}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#FF9500" }}>
          {product.category}
        </p>
        <h3 className="text-base font-bold text-gray-900">{product.name}</h3>
        <p className="text-xs text-gray-500 mt-1.5 leading-relaxed line-clamp-3">{product.desc}</p>
        <p className="mt-3 text-lg font-extrabold text-gray-900">
          {currency === "NGN" ? product.price : usdPrice}
        </p>
        <div className="mt-4 flex items-center gap-3">
          <Link
            href={`/products/${product.id}`}
            className="text-sm font-medium flex items-center gap-1 transition hover:underline"
            style={{ color: "#FF9500" }}
          >
            View Detail →
          </Link>
          <Link
            href="/buy"
            className="ml-auto px-4 py-2 rounded-lg text-sm font-semibold text-white transition hover:opacity-90"
            style={{ backgroundColor: "#FF9500" }}
          >
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ProductsSection() {
  const [activeTab, setActiveTab] = useState("All");
  const [currency, setCurrency] = useState<"NGN" | "USD">("NGN");
  const [animKey, setAnimKey] = useState(0);

  const filtered =
    activeTab === "All" ? products : products.filter((p) => p.tab === activeTab);

  function handleTabChange(tab: string) {
    setActiveTab(tab);
    setAnimKey((k) => k + 1);
  }

  const { ref: controlsRef, visible: controlsVisible } = useInView(0.1);

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <AnimatedHeader />

      {/* Tabs + Currency Toggle */}
      <div
        ref={controlsRef}
        className="flex flex-wrap items-center justify-between gap-4 mb-8"
        style={{
          opacity: controlsVisible ? 1 : 0,
          transform: controlsVisible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
        }}
      >
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === tab ? "text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              style={activeTab === tab ? { backgroundColor: "#FF9500" } : {}}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>🇳🇬 Switch Currency</span>
          <button
            onClick={() => setCurrency(currency === "NGN" ? "USD" : "NGN")}
            className="font-bold px-3 py-1 rounded-full border text-xs transition"
            style={{ borderColor: "#FF9500", color: "#FF9500" }}
          >
            {currency}
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div key={animKey} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            index={index}
            currency={currency}
          />
        ))}
      </div>
    </section>
  );
}