"use client";

import { useState } from "react";

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

export default function Partners() {
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? partners : partners.slice(0, 5);

  return (
    <section className="bg-white py-14 px-6 border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto text-center">
        <span
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color: "#FF9500" }}
        >
          Trusted By
        </span>
        <h2 className="mt-2 text-2xl font-extrabold text-gray-900">
          Our Global Partners
        </h2>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-10">
          {visible.map((partner) => (
            <img
              key={partner.src}
              src={partner.src}
              alt={partner.alt}
              className="h-14 object-contain"
            />
          ))}
        </div>

        {!showAll && (
          <button
            onClick={() => setShowAll(true)}
            className="mt-10 px-8 py-2.5 rounded-lg text-sm font-semibold transition hover:bg-orange-50"
            style={{ color: "#FF9500", border: "1.5px solid #FF9500" }}
          >
            View More
          </button>
        )}
      </div>
    </section>
  );
}