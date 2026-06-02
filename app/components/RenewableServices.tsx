"use client";

import { useState, useEffect, useRef } from "react";

const services = [
  {
    category: "Clean Cookstove Technology",
    icon: "/p1.jpg",
    title: "Powerstove X200 & T100",
    desc: "Our innovative clean cookstove technology, featuring the Powerstove X200, T100 and 22 different other models, provides efficient and eco-friendly cooking solutions. Designed to reduce smoke emissions and fuel consumption, these stoves not only enhance indoor air quality but also promote sustainable cooking practices. With their durable construction and user-friendly design, our cookstoves cater to the needs of households, commercial and institutional organisations while minimising environmental impact.",
    img: "/Powerstove1.webp",
    href: "/products",
    details: [
      "24 stove models for household, commercial & institutional use",
      "Reaches 1100°C in under 3 minutes",
      "Up to 5x faster cooking than traditional stoves",
      "Stainless steel burn chamber — built to last",
      "Dramatically reduces indoor smoke and harmful emissions",
    ],
  },
  {
    category: "Electricity Generation",
    icon: "/p2.jpg",
    title: "Energy Storage & Batteries",
    desc: "Generate up to 50 Watts of continuous electricity while cooking. Built-in 4,000mAh lithium battery charges phones, lights, and small appliances — off-grid.",
    img: "/Powerstove2.webp",
    href: "/products",
    details: [
      "Generates up to 50W of continuous electricity",
      "Built-in 4,000mAh lithium battery",
      "Charges phones, lights, and small appliances",
      "Fully off-grid capable",
      "Dual-purpose: cook and power your home simultaneously",
    ],
  },
  {
    category: "Biomass Fuel Production",
    icon: "/p3.jpg",
    title: "GoodLife Pellet Systems",
    desc: "Our GoodLife Pellet Systems facilitate the production of biomass fuel, offering a sustainable alternative to traditional fuels. These systems convert organic wastes from wood and post-harvest crops into high-quality pellets, which can be used in our cookstoves and other biomass applications. This not only helps reduce waste but also promotes circular economy practices, providing an affordable energy source for communities.",
    img: "/Powerstove3.webp",
    href: "/products",
    details: [
      "Converts agricultural waste into clean, high-density pellets",
      "70% more fuel-efficient than traditional charcoal",
      "Virtually smokeless — improves indoor air quality",
      "Supports circular economy and zero deforestation",
      "Available in 3kg, 10kg and 30kg packs for households and businesses",
    ],
  },
  {
    category: "Smart Technology",
    icon: "/p4.jpg",
    title: "IoT System Upgrades",
    desc: "Pre-programmed sensors and 2G/3G connectivity track fuel usage, carbon offsets, and usage data in real-time — enabling verifiable carbon credit monetisation.",
    img: "/Powerstove4.webp",
    href: "/products",
    details: [
      "Pre-programmed sensors for real-time tracking",
      "2G/3G connectivity built-in",
      "Monitors fuel usage and carbon offsets",
      "Verifiable carbon credit monetisation",
      "Remote diagnostics and usage analytics",
    ],
  },
  {
    category: "Women Empowerment",
    icon: "/p5.jpg",
    title: "Pay-As-You-Cook Financing",
    desc: "Flexible micro-financing that makes clean cookstoves accessible to households with limited income. Women earn commissions as local pellet entrepreneurs.",
    img: "/Powerstove5.webp",
    href: "/about",
    details: [
      "Flexible micro-financing with no large upfront cost",
      "Pay small amounts as you use the stove",
      "Women earn commissions as pellet distributors",
      "Financially inclusive model for low-income households",
      "Builds long-term financial independence for women",
    ],
  },
  {
    category: "Carbon Markets",
    icon: "/p6.jpg",
    title: "Performance Monitoring",
    desc: "Real-time IoT dashboard monitors stove usage, quantifies carbon savings, and issues verified carbon credits — reinvesting funds into community projects.",
    img: "/Powerstove6.webp",
    href: "/about",
    details: [
      "Real-time IoT dashboard for live monitoring",
      "Quantifies carbon savings per household",
      "Issues verified carbon credits automatically",
      "Funds reinvested into local community projects",
      "Transparent and auditable reporting system",
    ],
  },
];

type Service = (typeof services)[0];

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
      className="text-center mb-12"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#FF9500" }}>
        What We Offer
      </span>
      <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
        Our Renewable Energy Services
      </h2>
      <p className="mt-3 text-gray-500 text-sm sm:text-base max-w-md mx-auto">
        Renewable support meets community-first innovation to power a greener Africa.
      </p>
      <div className="mt-4 mx-auto w-10 h-1 rounded-full" style={{ backgroundColor: "#FF9500" }} />
    </div>
  );
}

function ServiceCard({ service, index, onSelect }: { service: Service; index: number; onSelect: () => void }) {
  const { ref, visible } = useInView(0.15);

  return (
    <div
      ref={ref}
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0) scale(1)"
          : "translateY(40px) scale(0.97)",
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
      }}
    >
      <div className="w-full h-52 overflow-hidden">
        <img
          src={service.img}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <span
          className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1"
          style={{ color: "#FF9500" }}
        >
          <img src={service.icon} alt="" className="w-4 h-4 rounded-full object-cover" />
          {service.category}
        </span>
        <h3 className="mt-1 text-lg font-extrabold text-gray-900">{service.title}</h3>
        <button
          onClick={onSelect}
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold transition-all duration-200 hover:gap-2"
          style={{ color: "#FF9500" }}
        >
          View Detail →
        </button>
      </div>
    </div>
  );
}

function Modal({ service, onClose }: { service: Service; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl overflow-hidden w-full max-w-4xl shadow-2xl flex flex-col sm:flex-row"
        style={{ animation: "modalIn 0.3s ease" }}
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          @keyframes modalIn {
            from { opacity: 0; transform: scale(0.95) translateY(20px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
        `}</style>

        {/* Left: Image */}
        <div className="w-full sm:w-1/2 h-56 sm:h-auto overflow-hidden shrink-0">
          <img src={service.img} alt={service.title} className="w-full h-full object-cover" />
        </div>

        {/* Right: Content */}
        <div className="flex-1 p-6 overflow-y-auto max-h-[80vh] relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 transition flex items-center justify-center text-gray-500 text-xs font-bold"
          >
            ✕
          </button>
          <span
            className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5"
            style={{ color: "#FF9500" }}
          >
            <img src={service.icon} alt="" className="w-4 h-4 rounded-full object-cover" />
            {service.category}
          </span>
          <h3 className="mt-2 text-xl font-extrabold text-gray-900 leading-snug">{service.title}</h3>
          <p className="mt-3 text-sm text-gray-500 leading-relaxed">{service.desc}</p>
          <ul className="mt-4 space-y-2">
            {service.details.map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="mt-1 w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: "#FF9500" }} />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function RenewableServices() {
  const [selected, setSelected] = useState<Service | null>(null);

  return (
    <>
      <section className="bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <AnimatedHeader />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={service.title}
                service={service}
                index={index}
                onSelect={() => setSelected(service)}
              />
            ))}
          </div>
        </div>
      </section>

      {selected && <Modal service={selected} onClose={() => setSelected(null)} />}
    </>
  );
}