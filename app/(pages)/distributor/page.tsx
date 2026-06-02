"use client";

import { useEffect, useRef, useState } from "react";
import AwardsRecognitions from "@/app/components/AwardsRecognitions";
import AwardsTicker from "@/app/components/AwardsTicker";
import CallToAction from "@/app/components/CallToAction";
import DistributorApplicationForm from "@/app/components/DistributorApplicationForm";
import DistributorSections from "@/app/components/DistributorSections";
import Partners from "@/app/components/Partners";

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

function ScaleIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useInView(0.1);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.96)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function Page() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#f8f8f8] flex flex-col items-center justify-center text-center px-6 py-16 sm:py-28">
        <FadeUp delay={0}>
          <p className="text-[#FF9500] font-bold text-xs uppercase tracking-widest">
            Distribution Network
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h1 className="mt-3 text-3xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight max-w-4xl">
            Become a Powerstove Distributor
          </h1>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p className="mt-4 sm:mt-6 text-gray-500 text-sm sm:text-base lg:text-lg max-w-xl leading-relaxed">
            Join our growing network of distributors across Africa and bring clean, affordable energy to communities in your region.
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto justify-center">
            <a
              href="#apply"
              className="px-6 py-3 rounded-lg text-sm font-semibold text-white transition hover:opacity-90 text-center"
              style={{ backgroundColor: "#FF9500" }}
            >
              Apply Now →
            </a>
            <a
              href="#find"
              className="px-6 py-3 rounded-lg text-sm font-semibold text-gray-900 border border-gray-300 hover:bg-gray-100 transition text-center"
            >
              Find a Distributor
            </a>
          </div>
        </FadeUp>
      </section>

      {/* Hero Image */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <ScaleIn delay={0.05}>
          <div className="rounded-2xl overflow-hidden w-full h-64 sm:h-120">
            <img
              src="/distributor.webp"
              alt="Recycling symbol on blue bin"
              className="w-full h-full object-cover"
            />
          </div>
        </ScaleIn>
      </section>

      <AwardsTicker />

      <DistributorSections />

      <DistributorApplicationForm />

      <CallToAction />
    </>
  );
}