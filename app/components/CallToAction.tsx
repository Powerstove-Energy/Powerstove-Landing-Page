export default function CallToAction() {
  return (
    <section className="py-16 px-6">
      <div
        className="max-w-5xl mx-auto rounded-2xl px-8 py-16 text-center"
        style={{
          background: "linear-gradient(135deg, #FF9500 0%, #E67E00 100%)",
        }}
      >
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
          Ready to switch to clean energy?
        </h2>
        <p className="mt-4 text-white/80 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
          Join us to save more lives, improve livelihoods, empower women, and preserve the environment.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <a
            href="/buy"
            className="px-6 py-3 rounded-md text-sm font-semibold bg-white text-orange-500 hover:bg-orange-50 transition"
          >
            Buy Product
          </a>
          <a
            href="/distributors"
            className="px-6 py-3 rounded-md text-sm font-semibold text-white border border-white hover:bg-white hover:text-orange-500 transition"
          >
            Our Distributors
          </a>
        </div>
      </div>
    </section>
  );
}