"use client";

import { useEffect, useRef, useState } from "react";

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

function SlideIn({
  children,
  direction = "left",
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  direction?: "left" | "right";
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useInView(0.15);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateX(0)"
          : `translateX(${direction === "left" ? "-40px" : "40px"})`,
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useInView(0.15);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function CallToAction() {
  return (
    <section className="py-16 px-6">
      <FadeUp delay={0}>
        <div
          className="max-w-5xl mx-auto rounded-2xl px-10 py-10 flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{ background: "#FF9500" }}
        >
          {/* Left: Text */}
          <SlideIn direction="left" delay={0.1} className="flex-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              Got you interested?!
            </h2>
            <p className="mt-2 text-white/90 text-sm leading-relaxed max-w-sm">
              Join us to save more lives, improve livelihoods, empower women, and preserve the environment.
            </p>
          </SlideIn>

          {/* Right: Buttons */}
          <SlideIn direction="right" delay={0.2} className="flex flex-wrap gap-3 shrink-0">
            <a
              href="/buy"
              className="px-5 py-2.5 rounded-md text-sm font-semibold bg-white text-[#FF9500] hover:bg-orange-50 transition"
            >
              Buy Product →
            </a>
            <a
              href="/distributors"
              className="px-5 py-2.5 rounded-md text-sm font-semibold text-white border border-white hover:bg-white hover:text-orange-500 transition"
            >
              Our Distributors
            </a>
          </SlideIn>
        </div>
      </FadeUp>
    </section>
  );
}