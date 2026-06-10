"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 1.5, suffix: "Million", label: "Households With Clean Cookstoves" },
  { value: 70, suffix: "%", label: "Fuel Savings Per Household" },
  { value: 280625, suffix: "", label: "Tonnes CO₂e Mitigated Yearly" },
  { value: 40, suffix: "+", label: "Global Awards & Grants" },
];

function useInView(threshold = 0.3) {
  const ref = useRef<HTMLElement>(null);
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

function useCountUp(target: number, duration = 2000, started: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return count;
}

function StatItem({
  stat,
  index,
  started,
  visible,
}: {
  stat: (typeof stats)[0];
  index: number;
  started: boolean;
  visible: boolean;
}) {
  const count = useCountUp(stat.value, 2000, started);

  return (
    <div
      className="flex flex-col items-center gap-2"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${index * 0.12}s, transform 0.6s ease ${index * 0.12}s`,
      }}
    >
      <p className="text-3xl sm:text-4xl font-extrabold text-gray-900">
        {count.toLocaleString()}{stat.suffix}
      </p>
      <div className="w-8 h-0.5 rounded-full" style={{ backgroundColor: "#FF9500" }} />
      <p className="text-sm text-gray-500">{stat.label}</p>
    </div>
  );
}

export default function AboutStatsBanner() {
  const { ref, visible } = useInView(0.3);

  return (
    <section
      ref={ref}
      className="border-t-4 border-b border-gray-100"
      style={{ borderTopColor: "#FF9500" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        {stats.map((stat, index) => (
          <StatItem
            key={stat.label}
            stat={stat}
            index={index}
            started={visible}
            visible={visible}
          />
        ))}
      </div>
    </section>
  );
}
