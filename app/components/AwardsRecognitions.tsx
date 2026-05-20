"use client";
import { useState } from "react";

const awards = [
  { n: 1, name: "King Hamad Youth Empowerment Award for SDGs", sub: "Winner, US$20,000 — Bahrain", year: "2019", type: "Competition" },
  { n: 2, name: "Cisco Global Problem Solver Challenge", sub: "Winner, US$25,000 — California, USA", year: "2018", type: "Competition" },
  { n: 3, name: "USAID Community Reinvestment Grant", sub: "Winner, $49,566", year: "2021", type: "Grant" },
  { n: 4, name: "TEF-GIZ Nigeria", sub: "Winner, US$5,000 — Abuja, Nigeria", year: "2018", type: "Grant" },
  { n: 5, name: "France-Africa 1000 Challenge Nigeria", sub: "Winner — Paris, France", year: "2020", type: "Competition" },
  { n: 6, name: "UNDP GSW Award (Energy Category)", sub: "Winner", year: "2021", type: "Competition" },
  { n: 7, name: "GSMA IG Grant Award", sub: "Winner, 141,710 British Pounds", year: "2021", type: "Grant" },
  { n: 8, name: "AFD Digital Energy Grant", sub: "Winner, €70,000", year: "2021", type: "Grant" },
  { n: 9, name: "Shell LiveWIRE Nigeria", sub: "Top 10 Innovator", year: "2018", type: "Competition" },
  { n: 10, name: "Tony Elumelu Foundation", sub: "Entrepreneurship Programme Selected", year: "2018", type: "Grant" },
  { n: 11, name: "Chivas Venture Nigeria", sub: "National Finalist", year: "2019", type: "Competition" },
  { n: 12, name: "LSETF Innovation Grant", sub: "Winner", year: "2019", type: "Grant" },
];

const filters = ["All", "2018", "2019", "2020", "2021", "Grant", "Competition"];

export default function AwardsRecognitions() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? awards
      : awards.filter((a) => a.year === active || a.type === active);

  return (
    <section className="px-6 py-20 bg-white">
      <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
        Awards & Recognitions
      </h2>

      {/* Filter tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all border ${
              active === f
                ? "bg-[#FF9500] border-[#FF9500] text-white"
                : "bg-transparent border-[#FF9500]/20 text-gray-500 hover:border-[#FF9500]/40"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Awards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {filtered.map((award) => (
          <div
            key={award.n}
            className="rounded-xl border border-[#FF9500]/20 p-5 bg-white"
          >
            <div className="flex items-start gap-3 mb-1">
              <span className="w-7 h-7 rounded-full bg-[#FF9500] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {award.n}
              </span>
              <p className="text-sm font-semibold text-gray-900 leading-snug">
                {award.name}
              </p>
            </div>
            <p className="text-xs text-gray-400 ml-10 mb-2">{award.sub}</p>
            <span className="ml-10 inline-block text-xs text-gray-400 border border-[#FF9500]/20 rounded px-2 py-0.5">
              {award.year}
            </span>
          </div>
        ))}
      </div>

      {/* Show All button */}
      <div className="flex justify-center mt-10">
        <button className="px-8 py-2.5 rounded-md border border-[#FF9500] text-[#FF9500] text-sm font-semibold hover:bg-[#FF9500]/5 transition-colors">
          Show All Awards
        </button>
      </div>
    </section>
  );
}