"use client";

import { useState, useEffect, useRef } from "react";
import { Users, Wrench, Home, Wifi, ChevronDown, ChevronRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Community Consultation",
    icon: Users,
    iconColor: "#FF9500",
    iconBg: "#FFF3E0",
    activeIconBg: "#FF9500",
    desc: "We engage communities to understand their unique cooking habits, energy challenges, and household needs. Through on-the-ground conversations with women, household heads, and local leaders, we identify the right stove size, fuel type, and payment model before recommending any solution.",
  },
  {
    number: "02",
    title: "Custom Product Design",
    icon: Wrench,
    iconColor: "#3B82F6",
    iconBg: "#EFF6FF",
    activeIconBg: "#3B82F6",
    desc: "Based on consultation insights, we design or configure a Powerstove product tailored to the community's needs — accounting for household size, fuel availability, cooking styles, and budget constraints to ensure the best fit.",
  },
  {
    number: "03",
    title: "Household Installation",
    icon: Home,
    iconColor: "#22C55E",
    iconBg: "#F0FDF4",
    activeIconBg: "#22C55E",
    desc: "Our trained local distributors handle safe and professional installation in every home. We ensure the stove is set up correctly, demonstrate proper usage to the household, and provide guidance on maintenance and safety practices.",
  },
  {
    number: "04",
    title: "Activation & Monitoring",
    icon: Wifi,
    iconColor: "#A855F7",
    iconBg: "#FAF5FF",
    activeIconBg: "#A855F7",
    desc: "Once installed, each stove is activated with our IoT monitoring system. We track usage patterns, fuel efficiency, and carbon savings in real time — enabling ongoing support, data-driven improvements, and transparent impact reporting.",
  },
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

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const [prevActive, setPrevActive] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const { ref: headerRef, visible: headerVisible } = useInView(0.2);
  const { ref: leftRef, visible: leftVisible } = useInView(0.15);
  const { ref: rightRef, visible: rightVisible } = useInView(0.15);

  const activeStep = steps[active];
  const ActiveIcon = activeStep.icon;

  function handleSelect(i: number) {
    if (i === active) return;
    setPrevActive(active);
    setActive(i);
    setAnimKey((k) => k + 1);
  }

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div
          ref={headerRef}
          className="text-center mb-12"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#FF9500" }}>
            Our Process
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
            How Powerstove Works: Planning <br className="hidden sm:block" /> To Powering Your Home
          </h2>
          <div className="mt-3 mx-auto w-10 h-1 rounded-full" style={{ backgroundColor: "#FF9500" }} />
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col sm:flex-row gap-6 items-start">

          {/* Left: Accordion list */}
          <div
            ref={leftRef}
            className="flex flex-col gap-3 w-full sm:w-2/5"
            style={{
              opacity: leftVisible ? 1 : 0,
              transform: leftVisible ? "translateX(0)" : "translateX(-40px)",
              transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
            }}
          >
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isActive = active === i;
              return (
                <button
                  key={step.number}
                  onClick={() => handleSelect(i)}
                  className={`w-full flex items-center justify-between px-4 py-4 rounded-xl border transition-all text-left ${
                    isActive
                      ? "bg-white shadow-sm"
                      : "border-gray-200 bg-white hover:border-orange-200"
                  }`}
                  style={isActive ? { borderColor: step.iconColor } : {}}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300"
                      style={{ backgroundColor: isActive ? step.activeIconBg : "#F3F4F6" }}
                    >
                      <Icon size={16} style={{ color: isActive ? "#fff" : step.iconColor }} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">{step.number}</p>
                      <p className="text-sm font-semibold text-gray-800">{step.title}</p>
                    </div>
                  </div>
                  {isActive ? (
                    <ChevronDown size={16} style={{ color: step.iconColor }} className="shrink-0" />
                  ) : (
                    <ChevronRight size={16} className="text-gray-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right: Detail card */}
          <div
            ref={rightRef}
            className="w-full sm:w-3/5"
            style={{
              opacity: rightVisible ? 1 : 0,
              transform: rightVisible ? "translateX(0)" : "translateX(40px)",
              transition: "opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s",
            }}
          >
            <style>{`
              @keyframes cardFadeIn {
                from { opacity: 0; transform: translateY(16px); }
                to   { opacity: 1; transform: translateY(0); }
              }
              .card-animate {
                animation: cardFadeIn 0.35s ease forwards;
              }
            `}</style>

            <div
              key={animKey}
              className="card-animate bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col gap-5"
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: activeStep.iconBg }}
              >
                <ActiveIcon size={22} style={{ color: activeStep.iconColor }} />
              </div>

              {/* Title */}
              <div className="flex items-center gap-3">
                <span className="text-2xl font-extrabold" style={{ color: activeStep.iconColor }}>
                  {activeStep.number}
                </span>
                <h3 className="text-xl font-bold text-gray-900">{activeStep.title}</h3>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-500 leading-relaxed">{activeStep.desc}</p>

              {/* Dot indicators */}
              <div className="flex gap-2 mt-2">
                {steps.map((step, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: active === i ? "20px" : "8px",
                      backgroundColor: active === i ? step.iconColor : "#E5E7EB",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}