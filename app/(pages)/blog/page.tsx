// src/app/(pages)/blog/page.tsx
import Link from "next/link";
import Image from "next/image";
import BlogGrid from "@/app/components/BlogGrid";

export default function BlogPage() {
  return (
    <main>
      <section className="w-full px-6 py-16 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10">
        
        {/* Left Content */}
        <div className="flex-1">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#FF9500" }}>
            Featured Story
          </span>
          <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
            Insights for a <br /> Greener Future
          </h1>
          <p className="mt-5 text-gray-500 text-base leading-relaxed max-w-md">
            Exploring how IoT-enabled clean energy technology is transforming
            households across Sub-Saharan Africa and mitigating climate change.
          </p>
          <Link
            href="/blog/featured"
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white transition hover:opacity-90"
            style={{ backgroundColor: "#FF9500" }}
          >
            Read Story →
          </Link>
        </div>

        {/* Right Image - browser mockup */}
        <div className="flex-1 w-full">
          <div
            className="rounded-2xl overflow-hidden shadow-xl"
            style={{ backgroundColor: "#FF9500" }}
          >
            <Image
              src="/blog-hero.png"
              alt="Powerstove clean energy home"
              width={800}
              height={500}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>

      </div>
    </section>
      {/* rest of blog content */}

      <BlogGrid />

      <section className="py-16 px-6">
  <div
    className="max-w-5xl mx-auto rounded-2xl px-10 py-12 flex flex-col lg:flex-row items-center justify-between gap-8"
    style={{ background: "linear-gradient(135deg, #FF9500 0%, #E67E00 100%)" }}
  >
    {/* Left */}
    <div className="max-w-sm">
      <h2 className="text-3xl font-extrabold text-white leading-tight">
        Stay Updated on Clean Energy
      </h2>
      <p className="mt-3 text-white/80 text-sm leading-relaxed">
        Join 50,000+ subscribers and get the latest news on climate action,
        technology, and community impact delivered to your inbox.
      </p>
    </div>

    {/* Right */}
    <div className="flex flex-col gap-2 w-full lg:w-auto">
      <div className="flex gap-2">
        <input
          type="email"
          placeholder="Enter your email address"
          className="px-4 py-3 rounded-lg text-sm text-gray-700 outline-none w-full lg:w-72 bg-white"
        />
        <button className="px-6 py-3 rounded-lg text-sm font-semibold text-white bg-gray-900 hover:bg-gray-800 transition whitespace-nowrap">
          Subscribe
        </button>
      </div>
      <p className="text-xs text-white/60">
        By subscribing, you agree to our Privacy Policy. No spam, ever.
      </p>
    </div>
  </div>
</section>
    </main>
  );
}