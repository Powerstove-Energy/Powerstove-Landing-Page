"use client";

import { useEffect, useRef, useState } from "react";

const timelineItems = [
  {
    year: "2016",
    title: "Powerstove Founded",
    desc: "Okay Esse founded Powerstove Africa in Abuja, Nigeria, with a vision to solve indoor air pollution and energy poverty for African households through smart biomass cookstove technology.",
  },
  {
    year: "2018",
    title: "First Awards & Recognition",
    desc: "Won the Cisco Global Problem Solver Challenge (US$25,000) and the TEF-G2 Nigeria award. Launched the first Powerstove X300 prototype and began pilot distribution in Abuja communities.",
  },
  {
    year: "2020",
    title: "Scaling Impact Across Nigeria",
    desc: "Reached 10,000+ households with clean cookstove technology. Launched GoodLife biomass pellet production and the Pay-As-You-Cook micro-financing model to ensure affordability.",
  },
  {
    year: "2021",
    title: "Global Grants & Expansion",
    desc: "Secured USAID, GSMA, AFD and UNDP grants totalling over $300,000. Expanded operations to 5 states across Nigeria and developed the proprietary IoT carbon credit monitoring system.",
  },
  {
    year: "2023",
    title: "Carbon Markets & New Products",
    desc: "Launched real-time IoT carbon credit monetisation platform. Released the T100 Pellet Stove and Solar Box, and began international distribution discussions across East and West Africa.",
  },
];

function TimelineItem({ item, index }: { item: typeof timelineItems[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(40px)",
        transition: `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`,
      }}
    >
      <span
        className="absolute -left-[2.85rem] w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
        style={{
          backgroundColor: "#FF9500",
          transform: visible ? "scale(1)" : "scale(0)",
          transition: `transform 0.4s ease ${index * 0.15 + 0.2}s`,
        }}
      >
        {item.year.slice(0)}
      </span>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <span className="text-xs font-semibold text-gray-400">{item.year}</span>
        <h3 className="mt-1 text-base font-bold text-gray-900">{item.title}</h3>
        <p className="mt-2 text-sm text-gray-500 leading-relaxed">{item.desc}</p>
      </div>
    </div>
  );
}

function LeftPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="lg:sticky lg:top-24"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-40px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#FF9500" }}>
        Our Story
      </span>
      <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
        Our Evolution: Building A Greener Future
      </h2>
      <div className="mt-3 w-10 h-1 rounded-full" style={{ backgroundColor: "#FF9500" }} />
      <p className="mt-5 text-gray-500 leading-relaxed">
        From a single prototype in Abuja to 50,000+ households across Nigeria — our journey
        is one of relentless innovation, community trust, and a mission to make clean energy
        accessible to every family.
      </p>
    </div>
  );
}

export default function EvolutionSection() {
  return (
    <section className="bg-[#F8F8F8] py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <LeftPanel />

        <div className="relative border-l-2 border-gray-200 pl-8 space-y-10">
          {timelineItems.map((item, index) => (
            <TimelineItem key={item.year} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}