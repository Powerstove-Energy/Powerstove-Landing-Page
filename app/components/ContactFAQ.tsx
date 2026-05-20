"use client";
import { useState } from "react";

const faqs = [
  {
    q: "How much can I save with Powerstove?",
    a: "Most users save 60–75% on cooking fuel costs. For example, charcoal users spending ₦400 daily can reduce this to ₦100 by using our GoodLife Biomass Pellets. Over a year, this translates to savings of over ₦100,000 — and up to $300 annually when you factor in the cost of traditional fuels like kerosene and firewood.",
  },
  {
    q: "How does the electricity generation work?",
    a: "Powerstove converts excess heat from its burn chamber into electricity using a built-in thermoelectric system. With a strong fire, it produces up to 50 watts of continuous power — enough to charge phones, power LED bulbs, radios, and small appliances. Surplus electricity is stored in a built-in 4,000mAh lithium-ion battery via USB and DC ports, so you can use it even after cooking is done.",
  },
  {
    q: "What fuel does Powerstove use?",
    a: "Powerstove runs exclusively on our GoodLife Biomass Pellets, made from agricultural waste, sawdust, and non-recyclable wood by-products. They are 80% cheaper than charcoal, firewood, and kerosene, burn 70% less biomass than traditional stoves, and produce virtually no smoke — reducing toxic pollutants by up to 95% compared to open-fire cooking.",
  },
  {
    q: "Is financing available for purchase?",
    a: "Yes. We offer a Pay-As-You-Cook financing plan that lets you pay just 40% of the product price upfront, with the balance spread over up to six months. The stove typically pays for itself in under three months through fuel savings alone, making it one of the most affordable clean energy investments for Nigerian households.",
  },
  {
    q: "How long does the stove last?",
    a: "Powerstove is built with a stainless steel burn chamber designed for long-term durability. The chamber reaches 1,000°C in under three minutes and is engineered to withstand heavy daily use. With proper care and regular cleaning, a Powerstove unit is built to serve your household for many years.",
  },
  {
    q: "Where can I buy replacement pellets?",
    a: "GoodLife Biomass Pellets are available through our authorized distributors across Nigeria, on third-party e-commerce platforms, and directly from our Abuja factory. You can also contact us via phone or email to locate the nearest distributor to you or arrange a bulk delivery.",
  },
];

export default function ContactFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-[#f8f8f8] px-6 py-20">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-[#FF9500] text-xs font-bold tracking-widest uppercase mb-2">
            FAQ&apos;s
          </p>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-3">
            Get Clarity Before You Go Clean
          </h2>
          <p className="text-gray-400 text-sm">
            Clarity on all we offer, pathway to partnership.
          </p>
          <div className="w-8 h-0.5 bg-[#FF9500] mx-auto mt-4" />
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-[#FF9500]/20 overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span className="text-sm font-semibold text-gray-900">
                  {faq.q}
                </span>
                <span className="text-[#FF9500] text-lg font-light ml-4 shrink-0">
                  {open === i ? "−" : "+"}
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-sm text-gray-500 leading-relaxed border-t border-[#FF9500]/10 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}