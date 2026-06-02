"use client";

import { useEffect, useRef, useState } from "react";
import AboutStatsBanner from "@/app/components/AboutstatsBanner";
import AboutUsVideo from "@/app/components/AboutUsVideo";
import AwardsTicker from "@/app/components/AwardsTicker";
import Team from "@/app/components/Team";

const mission = [
  {
    title: "Affordability",
    desc: "We design for the base of the pyramid — with Pay-As-You-Cook financing and locally produced pellets to ensure no family is left behind.",
  },
  {
    title: "Innovation",
    desc: "The world's first biomass cookstove with built-in IoT enables real-time carbon credit tracking and data-driven community impact.",
  },
  {
    title: "Women Empowerment",
    desc: "Women are not just customers — they are entrepreneurs, distributors, and leaders within the Powerstove clean-energy value chain.",
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

export default function About() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#f8f8f8] flex flex-col items-center justify-center text-center px-6 py-16 sm:py-28">
        <FadeUp delay={0}>
          <p className="text-[#FF9500] font-bold text-xs sm:text-sm uppercase tracking-widest">
            WHO WE ARE
          </p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h1 className="mt-3 text-3xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight max-w-5xl">
            Empowering Homes And Businesses With Sustainable Energy
          </h1>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p className="mt-4 sm:mt-6 text-gray-500 text-sm sm:text-base lg:text-lg max-w-xl leading-relaxed">
            Powerstove Africa manufactures smart, smokeless clean cookstoves that
            generate electricity and save lives across sub-Saharan Africa.
          </p>
        </FadeUp>
      </section>

      <AboutUsVideo />
      <AwardsTicker />
      <AboutStatsBanner />

      {/* Our Purpose Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <SlideIn direction="left">
          <div className="rounded-2xl overflow-hidden w-full h-72 sm:h-96 relative">
            <img
              src="/mission.png"
              alt="Solar panels representing sustainable energy"
              className="object-cover w-full h-full"
            />
          </div>
        </SlideIn>

        {/* Content */}
        <SlideIn direction="right" delay={0.1}>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#FF9500" }}>
              Our Mission
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
              Our Journey Toward A Greener Future
            </h2>
            <div className="mt-3 w-10 h-1 rounded-full" style={{ backgroundColor: "#FF9500" }} />
            <p className="mt-5 text-gray-500 leading-relaxed">
              Our mission is to develop affordable, sustainable renewable energy
              solutions to cover the energy demand of every community and household
              in developing countries, while freely sharing knowledge in the most
              accessible and convenient ways.
            </p>
            <ul className="mt-8 space-y-6">
              {mission.map((item, i) => (
                <li
                  key={item.title}
                  className="flex items-start gap-4"
                  style={{
                    opacity: 1,
                    transition: `opacity 0.5s ease ${0.3 + i * 0.12}s`,
                  }}
                >
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

      {/* Focus on Design & Function */}
      <section className="bg-[#F8F8F8] py-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <SlideIn direction="left">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#FF9500" }}>
                Our Mission
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                Focus on{" "}
                <span style={{ color: "#FF9500" }}>Design & Function</span>
              </h2>
              <p className="mt-5 text-gray-500 leading-relaxed">
                Our mission is to develop affordable, sustainable renewable energy solutions to cover
                the energy demand of every community and household in developing countries and freely
                share knowledge in the most affordable and convenient ways.
              </p>
              <p className="mt-4 text-gray-500 leading-relaxed">
                Our vision is to empower and inspire people around the globe through the power of
                unparalleled pro-poor renewable technologies, reflecting the creative minds and
                innovative technologies that makes Powerstove the world&apos;s premier clean cookstove
                and bio-pellets company.
              </p>
              <a
                href="/contact-us"
                className="mt-8 inline-block px-6 py-3 rounded-md text-sm font-semibold text-white transition hover:opacity-90"
                style={{ backgroundColor: "#FF9500" }}
              >
                Contact Us
              </a>
            </div>
          </SlideIn>

          {/* Right - Image */}
          <SlideIn direction="right" delay={0.15}>
            <div className="relative rounded-2xl overflow-hidden w-full h-72 sm:h-80">
              <img
                src="/our-mission.webp"
                alt="Powerstove cookstove in kitchen"
                className="w-full h-full object-cover"
              />
            </div>
          </SlideIn>
        </div>
      </section>

      <Team />

      {/* Join Movement */}
      <section className="bg-[#F8F8F8] py-20 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <FadeUp delay={0}>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#FF9500" }}>
              Join The Movement
            </span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
              Ready To Build A Sustainable Future?
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-4 text-gray-500 text-sm sm:text-base leading-relaxed">
              Join us to save more lives, improve livelihoods, empower women, and preserve the environment.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <a
              href="/contact-us"
              className="mt-8 inline-block px-7 py-3 rounded-md text-sm font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: "#FF9500" }}
            >
              Get in Touch →
            </a>
          </FadeUp>
        </div>
      </section>
    </>
  );
}