"use client";

import { useState, useEffect, useRef } from "react";

const partners = [
  { src: "/greentec.webp", alt: "GreenTec Capital Partners" },
  { src: "/wri.png", alt: "World Resources Institute" },
  { src: "/afd.webp", alt: "Agence Française de Développement" },
  { src: "/usadf.png", alt: "United States African Development Foundation" },
  { src: "/allon.webp", alt: "AllOn" },
  { src: "/a.webp", alt: "Partner" },
  { src: "/b.webp", alt: "Partner" },
  { src: "/c.webp", alt: "Partner" },
  { src: "/d.webp", alt: "Partner" },
  { src: "/e.webp", alt: "Partner" },
  { src: "/f.webp", alt: "Partner" },
  { src: "/g.webp", alt: "Partner" },
];

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

export default function Partners() {
  const [showAll, setShowAll] = useState(false);
  const { ref: headerRef, visible: headerVisible } = useInView(0.2);
  const { ref: gridRef, visible: gridVisible } = useInView(0.1);
  const { ref: btnRef, visible: btnVisible } = useInView(0.1);

  const visible = showAll ? partners : partners.slice(0, 5);

  return (
    <section className="bg-white py-14 px-6 border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto text-center">

        {/* Header */}
        <div
          ref={headerRef}
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#FF9500" }}>
            Trusted By
          </span>
          <h2 className="mt-2 text-2xl font-extrabold text-gray-900">
            Our Global Partners
          </h2>
        </div>

        {/* Logos grid */}
        <div
          ref={gridRef}
          className="mt-10 flex flex-wrap items-center justify-center gap-10"
        >
          {visible.map((partner, i) => (
            <img
              key={partner.src}
              src={partner.src}
              alt={partner.alt}
              className="h-14 object-contain"
              style={{
                opacity: gridVisible ? 1 : 0,
                transform: gridVisible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
                transition: `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`,
              }}
            />
          ))}
        </div>

        {/* View More button */}
        {!showAll && (
          <div
            ref={btnRef}
            style={{
              opacity: btnVisible ? 1 : 0,
              transform: btnVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s",
            }}
          >
            <button
              onClick={() => setShowAll(true)}
              className="mt-10 px-8 py-2.5 rounded-lg text-sm font-semibold transition hover:bg-orange-50"
              style={{ color: "#FF9500", border: "1.5px solid #FF9500" }}
            >
              View More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}