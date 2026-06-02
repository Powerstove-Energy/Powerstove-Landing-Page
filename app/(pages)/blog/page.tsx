"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import BlogGrid from "@/app/components/BlogGrid";

// ── animation primitives ──────────────────────────────────────────────────────

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
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
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
          : `translateX(${direction === "left" ? "-50px" : "50px"})`,
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export default function BlogPage() {
  return (
    <main>
      {/* Featured Story */}
      <section className="w-full px-6 py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-10">

          {/* Left Content */}
          <SlideIn direction="left" delay={0} className="flex-1 text-center lg:text-left">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#FF9500" }}>
              Featured Story
            </span>
            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
              How Powerstove's Pay-As-You-Cook Model Benefits Women in African Households
            </h1>
            <p className="mt-4 sm:mt-5 text-gray-500 text-sm sm:text-base leading-relaxed max-w-md mx-auto lg:mx-0">
              Powerstove's innovative Pay-As-You-Cook (PAYC) financing model is designed to make clean
              cooking accessible while eliminating the upfront cost barrier — empowering women across
              Africa financially, socially, and environmentally.
            </p>
            <div className="flex justify-center lg:justify-start">
              <Link
                href="/blog/featured"
                className="mt-6 sm:mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white transition hover:opacity-90"
                style={{ backgroundColor: "#FF9500" }}
              >
                Read Story →
              </Link>
            </div>
          </SlideIn>

          {/* Right Image */}
          <SlideIn direction="right" delay={0.15} className="flex-1 w-full">
            <div className="rounded-2xl overflow-hidden">
              <Image
                src="/blog.webp"
                alt="Powerstove clean energy home"
                width={800}
                height={500}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </SlideIn>

        </div>
      </section>

      {/* Blog Grid — bare, no wrapper */}
      <BlogGrid />

      {/* Newsletter */}
      <section className="py-16 px-6">
        <FadeUp delay={0}>
          <div
            className="max-w-5xl mx-auto rounded-2xl px-10 py-12 flex flex-col lg:flex-row items-center justify-between gap-8"
            style={{ background: "linear-gradient(135deg, #FF9500 0%, #E67E00 100%)" }}
          >
            {/* Left */}
            <div className="max-w-sm">
              <h2 className="text-3xl font-extrabold text-white leading-tight">
                Stay Updated on Clean Energy
              </h2>
              <p className="mt-3 text-white/80 text-sm leading-relaxed">
                Join 50,000+ subscribers and get the latest news on climate action,
                technology, and community impact delivered to your inbox.
              </p>
            </div>

            {/* Right */}
            <div className="flex flex-col gap-2 w-full lg:w-auto">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="px-4 py-3 rounded-lg text-sm text-gray-700 outline-none w-full lg:w-72 bg-white"
                />
                <button className="px-6 py-3 rounded-lg text-sm font-semibold text-white border border-white hover:bg-gray-800 transition whitespace-nowrap">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-white/60">
                By subscribing, you agree to our Privacy Policy. No spam, ever.
              </p>
            </div>
          </div>
        </FadeUp>
      </section>
    </main>
  );
}