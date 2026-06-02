"use client";

import { useEffect, useRef, useState } from "react";
import { ShoppingCart, Handshake, Building2, Globe } from "lucide-react";

const partnerTypes = [
  {
    icon: ShoppingCart,
    title: "Local Retailers",
    desc: "Small to medium-sized shops focused on household goods, close to communities.",
  },
  {
    icon: Handshake,
    title: "NGOs",
    desc: "Organizations that promote sustainable energy solutions and community development.",
  },
  {
    icon: Building2,
    title: "Wholesale Distributors",
    desc: "Larger companies managing bulk distribution across multiple regions.",
  },
  {
    icon: Globe,
    title: "Online Platforms",
    desc: "E-commerce sites selling Powerstove products directly to consumers nationwide.",
  },
];

const steps = [
  {
    number: "01",
    title: "Application Submission",
    desc: "Submit a formal application via our website or contact our sales team at sales@powerstove.africa, expressing your interest in becoming a distributor.",
  },
  {
    number: "02",
    title: "Review & Evaluation",
    desc: "We review your market reach, experience, and alignment with our mission — including a background check and evaluation of your existing business.",
  },
  {
    number: "03",
    title: "Product Training",
    desc: "Approved distributors undergo comprehensive product training covering features, benefits, and effective sales techniques.",
  },
  {
    number: "04",
    title: "Distribution Agreement",
    desc: "Sign a formal agreement outlining terms, conditions, pricing, and mutual expectations to formalise the partnership.",
  },
  {
    number: "05",
    title: "Inventory & Logistics Setup",
    desc: "Work with our logistics team to establish initial inventory orders and set up a reliable supply chain for ongoing fulfilment.",
  },
  {
    number: "06",
    title: "Marketing Support",
    desc: "Receive branded marketing materials and ongoing support to help you promote Powerstove products effectively in your region.",
  },
  {
    number: "07",
    title: "Ongoing Communication",
    desc: "Regular check-ins, sales target reviews, and access to further training and product update sessions to keep you ahead.",
  },
];

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

// ─────────────────────────────────────────────────────────────────────────────

export default function DistributorSections() {
  return (
    <>
      {/* Who Are Our Distributors */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">

          {/* heading */}
          <div className="text-center mb-12">
            <FadeUp delay={0}>
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#FF9500" }}>
                Partner Types
              </span>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900">
                Who Are Our Distributors?
              </h2>
            </FadeUp>
            <FadeUp delay={0.15}>
              <div className="mt-3 mx-auto w-10 h-1 rounded-full" style={{ backgroundColor: "#FF9500" }} />
            </FadeUp>
          </div>

          {/* cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {partnerTypes.map((type, i) => {
              const Icon = type.icon;
              return (
                <FadeUp key={type.title} delay={0.1 + i * 0.1}>
                  <div
                    className="rounded-2xl p-6 flex flex-col items-center text-center gap-3 h-full"
                    style={{ backgroundColor: "#F8F8F8" }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: "#FFF3E0" }}
                    >
                      <Icon size={22} style={{ color: "#FF9500" }} />
                    </div>
                    <h3 className="text-sm font-bold text-gray-900">{type.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{type.desc}</p>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* How to Become a Distributor */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">

          {/* heading */}
          <div className="text-center mb-12">
            <FadeUp delay={0}>
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#FF9500" }}>
                Our Process
              </span>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900">
                How to Become a Distributor
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="mt-3 text-gray-500 text-sm sm:text-base max-w-md mx-auto">
                Follow these seven steps to join our authorised distribution network and start making an impact in your community.
              </p>
            </FadeUp>
            <FadeUp delay={0.25}>
              <div className="mt-4 mx-auto w-10 h-1 rounded-full" style={{ backgroundColor: "#FF9500" }} />
            </FadeUp>
          </div>

          {/* steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {steps.map((step, i) => (
              <FadeUp key={step.number} delay={0.1 + i * 0.08}>
                <div
                  className="rounded-2xl p-6 flex flex-col gap-2 h-full"
                  style={{ backgroundColor: "#F8F8F8" }}
                >
                  <span className="text-3xl font-extrabold" style={{ color: "#FF950030" }}>
                    {step.number}
                  </span>
                  <h3 className="text-sm font-bold text-gray-900">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}