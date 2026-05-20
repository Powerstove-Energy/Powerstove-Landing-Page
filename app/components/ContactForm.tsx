"use client";
import { useState } from "react";

const subjects = [
  "Product Enquiry",
  "Partnership",
  "Support",
  "Press & Media",
  "Other",
];

export default function ContactForm() {
  const [subject, setSubject] = useState("");

  return (
    <section className="bg-[#f8f8f8] px-6 py-20">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8">

        {/* Left card */}
        <div className="bg-[#FF9500] rounded-2xl p-8 text-white w-full lg:w-72 shrink-0 flex flex-col gap-6">
          <h2 className="text-2xl font-extrabold">Get In Touch</h2>

          <div className="flex flex-col gap-5 text-sm leading-relaxed">
            <div className="flex gap-2">
              <span className="mt-0.5">📍</span>
              <p>
                <span className="font-bold">HQ Office:</span> Suite 52, Nandu
                Plaza, Ndola Crescent, Wuse Zone 5, Abuja, Nigeria.
              </p>
            </div>
            <div className="flex gap-2">
              <span className="mt-0.5">📍</span>
              <p>
                <span className="font-bold">Factory:</span> Plot MF15,
                Kuchiyako New Layout, Kuje, Abuja, Nigeria.
              </p>
            </div>
            <div className="flex gap-2">
              <span className="mt-0.5">📞</span>
              <div>
                <p>+234-703-492-2494</p>
                <p>+234-805-648-3839</p>
              </div>
            </div>
            <div className="flex gap-2">
              <span className="mt-0.5">✉️</span>
              <p>contact@powerstove.africa</p>
            </div>
          </div>
        </div>

        {/* Right form */}
        <div className="flex-1 bg-white rounded-2xl p-8 flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-gray-900">Send us a message</h2>

          <div>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border-b border-gray-200 py-2 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-[#FF9500] transition-colors bg-transparent"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <input
              type="email"
              placeholder="Email Address"
              className="flex-1 border-b border-gray-200 py-2 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-[#FF9500] transition-colors bg-transparent"
            />
            <input
              type="tel"
              placeholder="Phone Number (optional)"
              className="flex-1 border-b border-gray-200 py-2 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-[#FF9500] transition-colors bg-transparent"
            />
          </div>

          <div className="relative">
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border-b border-gray-200 py-2 text-sm text-gray-400 outline-none focus:border-[#FF9500] transition-colors bg-transparent appearance-none cursor-pointer"
            >
              <option value="" disabled>Message Subject</option>
              {subjects.map((s) => (
                <option key={s} value={s} className="text-gray-700">{s}</option>
              ))}
            </select>
            <span className="absolute right-2 top-2.5 text-gray-400 pointer-events-none text-xs">▾</span>
          </div>

          <textarea
            placeholder="Your Message"
            rows={5}
            className="w-full border-b border-gray-200 py-2 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-[#FF9500] transition-colors bg-transparent resize-none"
          />

          <button className="w-full bg-[#FF9500] hover:bg-[#e68600] transition-colors text-white font-semibold text-sm py-4 rounded-lg">
            Submit Message →
          </button>
        </div>
      </div>
    </section>
  );
}