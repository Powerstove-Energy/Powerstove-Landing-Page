export default function CallToAction() {
  return (
    <section className="py-16 px-6">
      <div
        className="max-w-5xl mx-auto rounded-2xl px-10 py-10 flex flex-col sm:flex-row items-center justify-between gap-6"
        style={{ background: "#FF9500" }}
      >
        {/* Left: Text */}
        <div className="flex-1">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
            Got you interested?!
          </h2>
          <p className="mt-2 text-white/90 text-sm leading-relaxed max-w-sm">
            Join us to save more lives, improve livelihoods, empower women, and preserve the environment.
          </p>
        </div>

        {/* Right: Buttons */}
        <div className="flex flex-wrap gap-3 shrink-0">
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
        </div>
      </div>
    </section>
  );
}