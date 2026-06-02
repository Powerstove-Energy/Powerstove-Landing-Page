"use client";

import { useEffect, useRef, useState } from "react";
import AwardsTicker from "@/app/components/AwardsTicker";
import CallToAction from "@/app/components/CallToAction";
import ContactFAQ from "@/app/components/ContactFAQ";
import ContactForm from "@/app/components/ContactForm";
import ContactMap from "@/app/components/ContactMap";
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

function AnimatedImage() {
  const { ref, visible } = useInView(0.1);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(40px) scale(0.98)",
        transition: "opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s",
      }}
    >
      <div className="rounded-2xl overflow-hidden w-full h-64 sm:h-120">
        <img
          src="/reach-us.webp"
          alt="Reach us"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#f8f8f8] flex flex-col items-center justify-center text-center px-6 py-16 sm:py-28">
        <FadeUp delay={0}>
          <p className="text-[#FF9500] font-bold text-xs sm:text-sm uppercase tracking-widest">
            GET IN TOUCH
          </p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h1 className="mt-3 text-3xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight max-w-4xl">
            Reach Us
          </h1>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p className="mt-4 sm:mt-6 text-gray-500 text-sm sm:text-base lg:text-lg max-w-xl leading-relaxed">
            Drop us your message
          </p>
        </FadeUp>
      </section>

      {/* Hero Image */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <AnimatedImage />
      </section>

      <AwardsTicker />
      <Partners />
      <ContactForm />
      <ContactMap />
      <ContactFAQ />
      <CallToAction />
    </>
  );
}