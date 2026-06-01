"use client";

import { useState } from "react";

export default function DistributorApplicationForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    businessName: "",
    businessType: "",
    reach: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log(form);
  };

  return (
    <section className="py-20 px-6" style={{ backgroundColor: "#1A1A1A" }}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: "#FF9500" }}
          >
            Apply Now
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white">
            Start Your Application
          </h2>
          <p className="mt-3 text-gray-400 text-sm leading-relaxed">
            Fill in the form below and our partnership team will get back to you within 3 business days.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl p-8 flex flex-col gap-6">
          {/* Row 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                Full Name <span style={{ color: "#FF9500" }}>*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-orange-400 transition"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                Email Address <span style={{ color: "#FF9500" }}>*</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-orange-400 transition"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                Business Name <span style={{ color: "#FF9500" }}>*</span>
              </label>
              <input
                type="text"
                name="businessName"
                value={form.businessName}
                onChange={handleChange}
                placeholder="Your business name"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-orange-400 transition"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                Business Type <span style={{ color: "#FF9500" }}>*</span>
              </label>
              <select
                name="businessType"
                value={form.businessType}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-400 outline-none focus:border-orange-400 transition bg-white"
              >
                <option value="" disabled>Select type...</option>
                <option value="retailer">Local Retailer</option>
                <option value="ngo">NGO</option>
                <option value="wholesale">Wholesale Distributor</option>
                <option value="online">Online Platform</option>
              </select>
            </div>
          </div>

          {/* Row 3 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
              Tell Us About Your Reach
            </label>
            <textarea
              name="reach"
              value={form.reach}
              onChange={handleChange}
              placeholder="Describe your region, customer base, and why you want to partner with Powerstove..."
              rows={4}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-orange-400 transition resize-none"
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            className="w-full py-3.5 rounded-lg text-sm font-semibold text-white transition hover:opacity-90"
            style={{ backgroundColor: "#FF9500" }}
          >
            Submit Application →
          </button>

          {/* Email note */}
          <p className="text-center text-xs text-gray-400">
            Or email us directly at{" "}
            <a
              href="mailto:sales@powerstove.africa"
              className="font-medium underline"
              style={{ color: "#FF9500" }}
            >
              sales@powerstove.africa
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}