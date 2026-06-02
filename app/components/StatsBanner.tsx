"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 1.5, suffix: " Million+", label: "Households Reached" },
  { value: 70, suffix: "%", label: "Fuel Savings" },
  { value: 50, prefix: "Up to ", suffix: "W", label: "Electricity Generated" },
  { value: 40, suffix: "+", label: "Global Awards" },
];

function useCountUp(target: number, duration = 2000, started: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target * 10) / 10);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return count;
}

function StatItem({ stat, started }: { stat: typeof stats[0]; started: boolean }) {
  const count = useCountUp(stat.value, 2000, started);

  const formatted = Number.isInteger(stat.value)
    ? count.toLocaleString()
    : count.toFixed(1);

  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <span className="text-3xl sm:text-4xl font-extrabold text-gray-900">
        {stat.prefix ?? ""}{formatted}{stat.suffix}
      </span>
      <div className="w-6 h-0.5 rounded-full" style={{ backgroundColor: "#FF9500" }} />
      <span className="text-sm text-gray-500 mt-1">{stat.label}</span>
    </div>
  );
}

export default function StatsBanner() {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-[#F8F8F8] py-10 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <StatItem key={stat.label} stat={stat} started={started} />
        ))}
      </div>
    </section>
  );
}