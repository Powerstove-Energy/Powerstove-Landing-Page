"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import CallToAction from "@/app/components/CallToAction";
import RenewableServices from "@/app/components/RenewableServices";
import StatsBanner from "@/app/components/StatsBanner";
import AwardsTicker from "@/app/components/AwardsTicker";
import Partners from "@/app/components/Partners";
import HowItWorks from "@/app/components/HowPowerstoveWorks";
import HomePageVideo from "@/app/components/HomePageVide";
import EvolutionSection from "@/app/components/EvolutionSection";

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

const purposes = [
  {
    title: "Smokeless Cooking",
    desc: "Eliminates toxic indoor air pollution that kills 4 million people annually — protecting women and children most at risk.",
  },
  {
    title: "Fuel Independence",
    desc: "Uses locally-produced GoodLife biomass pellets, reducing dependence on charcoal and firewood by up to 70%.",
  },
  {
    title: "Income Generation",
    desc: "Empowers women as pellet entrepreneurs and clean energy distributors at the heart of a new green economy.",
  },
];

export default function Section() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-[#F8F8F8] flex flex-col items-center justify-center text-center px-6 py-16 sm:py-28">
        <FadeUp delay={0}>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight max-w-5xl">
            Empowering Homes And Businesses With Sustainable Energy
          </h1>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="mt-4 sm:mt-6 text-gray-500 text-sm sm:text-base lg:text-lg max-w-xl leading-relaxed">
            The world&apos;s first clean cookstove with built-in IoT — smokeless,
            cooks 5x faster, and generates up to 50W of electricity for African
            homes and businesses.
          </p>
        </FadeUp>
        <FadeUp delay={0.2}>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto justify-center">
            <Link
              href="/buy"
              className="px-6 py-3 rounded-md text-sm font-semibold text-white transition hover:opacity-90 text-center"
              style={{ backgroundColor: "#FF9500" }}
            >
              Buy Product
            </Link>
            <Link
              href="/about"
              className="px-6 py-3 rounded-md text-sm font-semibold text-gray-800 border border-gray-300 hover:bg-gray-100 transition text-center"
            >
              Learn More
            </Link>
          </div>
        </FadeUp>
      </section>

      <HomePageVideo />
      <StatsBanner />
      <AwardsTicker />

      {/* Our Purpose Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <SlideIn direction="left">
          <div className="rounded-2xl overflow-hidden w-full h-72 sm:h-96 relative">
            <img
              src="/clean.webp"
              alt="Solar panels representing sustainable energy"
              className="w-full h-full object-cover"
            />
          </div>
        </SlideIn>

        {/* Content */}
        <SlideIn direction="right" delay={0.1}>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#FF9500" }}>
              Our Purpose
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
              Our Journey Toward A Greener Future
            </h2>
            <div className="mt-3 w-10 h-1 rounded-full" style={{ backgroundColor: "#FF9500" }} />
            <p className="mt-5 text-gray-500 leading-relaxed">
              Every day, millions of women across sub-Saharan Africa breathe toxic smoke and walk
              dangerous distances for firewood. Powerstove was founded to change this - delivering
              a cleaner, smarter, and safer way to cook that also generates electricity for families
              with no grid access.
            </p>
            <ul className="mt-8 space-y-6">
              {purposes.map((item, i) => (
                <li key={item.title} className="flex items-start gap-4">
                  <span
                    className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#FF950020" }}
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="#FF9500" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900">{item.title}</p>
                    <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </SlideIn>
      </section>

      <EvolutionSection />
      <RenewableServices />
      <HowItWorks />

      {/* Real Stories / Testimonials */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Heading */}
          <div className="text-center mb-12">
            <FadeUp delay={0}>
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#FF9500" }}>
                Real Stories
              </span>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900">
                Real People. Real Power. Real Impact.
              </h2>
            </FadeUp>
            <FadeUp delay={0.15}>
              <div className="mt-3 mx-auto w-10 h-1 rounded-full" style={{ backgroundColor: "#FF9500" }} />
            </FadeUp>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "In three months I have used Powerstove, I have saved ₦27,000 on cooking fuel, which has helped me to pay for my children's school fees.",
                name: "Ugwunwa Ebi Okere",
                location: "Abuja, Nigeria",
              },
              {
                quote: "I love it when I can continue to charge my phones while cooking with Powerstove and at the same time saving money on charcoal.",
                name: "Joyce Danjuma",
                location: "Kano, Nigeria",
              },
              {
                quote: "Without Pay-As-You-Cook Financing from Powerstove, it would have been difficult for me to purchase the stove. No more sending my girls for firewood.",
                name: "Moumaife John",
                location: "Jos, Nigeria",
              },
            ].map((t, i) => (
              <FadeUp key={t.name} delay={0.1 + i * 0.1}>
                <div className="bg-[#F8F8F8] rounded-2xl p-6 flex flex-col gap-4 border border-gray-100 h-full">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <svg key={j} className="w-4 h-4" viewBox="0 0 20 20" fill="#FF9500">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-3 mt-auto">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                      <p className="text-xs text-gray-400">{t.location}</p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* CTA */}
          <FadeUp delay={0.1}>
            <div className="mt-10 flex justify-center">
              <button
                className="px-8 py-3 rounded-md text-sm font-semibold border transition hover:bg-orange-50"
                style={{ color: "#FF9500", borderColor: "#FF9500" }}
              >
                Read More Stories
              </button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="py-20 px-6" style={{ backgroundColor: "#1A1A1A" }}>
        <div className="max-w-5xl mx-auto text-center">

          <FadeUp delay={0}>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#FF9500" }}>
              Our Impact
            </span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Numbers That Tell The Story
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div className="mt-3 mx-auto w-10 h-1 rounded-full" style={{ backgroundColor: "#FF9500" }} />
          </FadeUp>

          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { value: "1.5 Million+", label: "Women & households reached" },
              { value: "70%", label: "Reduction in cooking fuel spend" },
              { value: "280,625", label: "Tonnes CO₂e mitigated per year" },
              { value: "3.4 MWh", label: "Electricity generated off-grid" },
            ].map((stat, i) => (
              <FadeUp key={stat.label} delay={0.1 + i * 0.1}>
                <div className="flex flex-col items-center gap-2">
                  <span className="text-4xl sm:text-5xl font-extrabold" style={{ color: "#FF9500" }}>
                    {stat.value}
                  </span>
                  <span className="text-sm text-gray-400 leading-snug">{stat.label}</span>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.2}>
            <div className="mt-12">
              <button
                className="px-7 py-3 rounded-md text-sm font-semibold text-white transition hover:opacity-90"
                style={{ backgroundColor: "#FF9500" }}
              >
                View Full Impact Report →
              </button>
            </div>
          </FadeUp>
        </div>
      </section>

      <Partners />
      <CallToAction />
    </main>
  );
}
