"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

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
  const { ref, visible } = useInView(0.1);
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

type Post = {
  id: number;
  image: string;
  category: string;
  title: string;
  desc: string;
  tab: string;
  date: string;
  content: { heading: string; body: string; bullets?: string[] }[];
};

const posts: Post[] = [
  {
    id: 1,
    image: "/1.webp",
    category: "INNOVATION",
    title: "How IoT is Revolutionizing Cooking in Nigeria",
    desc: "Our latest software update allows users to monitor their carbon savings in real-time...",
    tab: "Innovation",
    date: "May 10, 2026",
    content: [
      {
        heading: "A New Era of Connected Cooking",
        body: "Across Nigeria, millions of households still rely on traditional charcoal and firewood stoves — exposing families to toxic smoke and draining household budgets. Powerstove's IoT-enabled cookstoves are changing this reality, one household at a time.",
      },
      {
        heading: "Real-Time Data for Smarter Decisions",
        body: "Our embedded 2G/3G IoT chip transmits live usage data to a cloud dashboard, giving users and distributors visibility into fuel consumption, cooking frequency, and carbon savings — all in real-time.\n\nThis data is used to calculate verified carbon credits, which Powerstove aggregates and sells on international carbon markets, reinvesting the proceeds into community programmes.",
      },
      {
        heading: "Key Benefits of Smart Cookstoves",
        body: "",
        bullets: [
          "Monitor real-time fuel usage and savings from any smartphone",
          "Auto-track carbon credits generated per cooking session",
          "Remote diagnostics for faster after-sales support",
          "Usage-based Pay-As-You-Cook payment automation",
          "Firmware updates delivered over-the-air",
        ],
      },
      {
        heading: "The Road Ahead",
        body: "With over 53,000 households now connected, Powerstove is expanding its IoT network across 12 Nigerian states. Our 2026 target is to reach 100,000 connected homes — and with each connection, our carbon credit portfolio and community impact grows.",
      },
    ],
  },
  {
    id: 2,
    image: "/2.webp",
    category: "CLIMATE ACTION",
    title: "The Path to Net Zero: Our Carbon Strategy",
    desc: "Discover how PowerStove is partnering with global agencies to offset millions of...",
    tab: "Climate Action",
    date: "May 6, 2026",
    content: [
      {
        heading: "Why Cookstoves Are a Climate Solution",
        body: "Traditional biomass cooking is one of the largest sources of black carbon emissions in sub-Saharan Africa. Switching households to clean cookstoves is among the most cost-effective interventions for climate mitigation — and one of the fastest.",
      },
      {
        heading: "Our Carbon Framework",
        body: "Every Powerstove cookstove deployed is monitored through our IoT system, generating verifiable data on fuel displacement and emissions reduction. This data forms the basis of our carbon credit generation under internationally recognised Gold Standard and Verra methodologies.",
        bullets: [
          "280,625 tonnes of CO₂e mitigated annually",
          "Carbon credits sold to global corporations and offset programmes",
          "Revenue reinvested into community distribution and women's training",
          "Audited annually by independent third-party verifiers",
        ],
      },
      {
        heading: "Partnerships Driving Scale",
        body: "We work alongside USAID, AFD, UNDP, and GreenTec Capital Partners to scale clean cooking adoption. These partnerships fund new deployments, technology upgrades, and community-level monitoring — accelerating our path to net-zero impact.",
      },
    ],
  },
  {
    id: 3,
    image: "/3.webp",
    category: "OUR COMMUNITY",
    title: "Empowering Women Entrepreneurs",
    desc: "Stories from our distribution partners who are building successful businesses while...",
    tab: "Our Community",
    date: "Apr 28, 2026",
    content: [
      {
        heading: "Women at the Heart of Powerstove's Mission",
        body: "In Nigeria, women bear the greatest burden of household cooking — spending hours daily gathering wood, managing smoke, and stretching limited budgets on fuel. Powerstove's Pay-As-You-Cook model was designed with these women in mind.",
      },
      {
        heading: "From Customer to Entrepreneur",
        body: "Across our distribution network, women who begin as cookstove customers are graduating into micro-entrepreneurs — selling GoodLife biomass pellets, onboarding new households, and earning commissions that supplement or replace traditional income sources.",
        bullets: [
          "Over 1,200 women trained as pellet entrepreneurs",
          "Average monthly income increase of ₦25,000 per distributor",
          "Women-led distribution groups in 8 Nigerian states",
          "Training covers sales, financial literacy, and product knowledge",
        ],
      },
      {
        heading: "A Self-Sustaining Value Chain",
        body: "The beauty of the model is its circularity: women sell pellets, earn income, reinvest in their businesses, and recruit new customers — all while reducing the carbon footprint of their communities.",
      },
    ],
  },
  {
    id: 4,
    image: "/4.webp",
    category: "SUSTAINABILITY",
    title: "The Science Behind Bio-Pellets",
    desc: "Understanding why our agricultural waste-to-energy model is the most efficient fuel...",
    tab: "Sustainability",
    date: "Apr 20, 2026",
    content: [
      {
        heading: "Turning Waste Into Clean Energy",
        body: "Nigeria generates millions of tonnes of agricultural waste annually — from rice husks and corn cobs to sawdust and groundnut shells. GoodLife Pellet Systems convert this waste into dense, high-energy biomass pellets that burn cleaner and longer than charcoal.",
      },
      {
        heading: "Why Pellets Outperform Charcoal",
        body: "",
        bullets: [
          "70% more energy-efficient than traditional charcoal",
          "Consistent, controlled heat output for precise cooking",
          "Virtually smokeless — dramatically reducing indoor air pollution",
          "Carbon-neutral: emissions absorbed by replacement crop growth",
          "Locally produced, reducing import dependency",
        ],
      },
      {
        heading: "A Circular Economy in Action",
        body: "By sourcing raw materials from local farmers, producing pellets in community hubs, and distributing through women entrepreneurs, GoodLife creates a closed-loop value chain that supports Nigerian jobs, reduces deforestation, and keeps households healthy.",
      },
    ],
  },
  {
    id: 5,
    image: "/5.webp",
    category: "INNOVATION",
    title: "2024 Impact Report Preview",
    desc: "A sneak peek at our annual metrics: 1M+ lives touched and 500,000 tonnes of...",
    tab: "Innovation",
    date: "Apr 15, 2026",
    content: [
      {
        heading: "Our 2024 Impact in Numbers",
        body: "As we prepare to launch the full 2024 Impact Report, here is a preview of the headline metrics that define a year of extraordinary growth across clean cooking, electricity access, and carbon markets.",
        bullets: [
          "53,625 households with active Powerstove cookstoves",
          "280,625 tonnes CO₂e avoided — exceeding 2023 target by 34%",
          "1,200+ women trained as clean energy entrepreneurs",
          "₦380M in fuel savings returned to households",
          "40+ global awards and grants received",
        ],
      },
      {
        heading: "Looking Ahead to 2025",
        body: "Our 2025 roadmap targets 100,000 connected households, expansion into Ghana and Cameroon, and launch of the Powerstove Carbon Marketplace — a direct platform for corporations to purchase and retire verified cookstove carbon credits.",
      },
    ],
  },
  {
    id: 6,
    image: "/6.webp",
    category: "OUR COMMUNITY",
    title: "Clean Cooking for Schools",
    desc: "How we're expanding our institutional stove program to provide smoke-free...",
    tab: "Our Community",
    date: "Apr 8, 2026",
    content: [
      {
        heading: "The School Kitchen Problem",
        body: "In many Nigerian public schools, lunch is still cooked over open firewood fires in cramped kitchen spaces. Cooks are exposed to dangerous smoke levels daily, and fuel costs consume a disproportionate share of school feeding budgets.",
      },
      {
        heading: "The Powerstove School Programme",
        body: "Working with state governments and NGO partners, we have deployed commercial-grade Powerstove units to over 200 schools across 6 states.",
        bullets: [
          "200+ schools equipped with clean commercial cookstoves",
          "Average 65% reduction in monthly fuel costs per school",
          "Zero-smoke kitchens improving cook health and safety",
          "IoT monitoring enabling carbon credit generation per school",
          "Expansion target: 1,000 schools by end of 2026",
        ],
      },
      {
        heading: "Impact Beyond the Kitchen",
        body: "Beyond the practical benefits, the school programme serves as a visible demonstration of clean cooking technology in communities — sparking household adoption and building trust in Powerstove across Nigeria.",
      },
    ],
  },
];

const tabs = ["All", "Sustainability", "Innovation", "Our Community", "Climate Action"];

export default function BlogGrid() {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const filtered = posts.filter((p) => {
    const matchesTab = activeTab === "All" || p.tab === activeTab;
    const matchesSearch =
      search === "" ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <>
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-10">

        {/* Tabs + Search */}
        <FadeUp delay={0}>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${
                    activeTab === tab
                      ? "text-white border-transparent"
                      : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                  }`}
                  style={activeTab === tab ? { backgroundColor: "#FF9500", borderColor: "#FF9500" } : {}}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 border border-gray-200 rounded-full px-4 py-2 w-full sm:w-56 bg-white">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search Insights"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="text-sm text-gray-600 outline-none w-full bg-transparent placeholder-gray-400"
              />
            </div>
          </div>
        </FadeUp>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((post, i) => (
            <FadeUp key={post.id} delay={i * 0.08}>
              <div className="flex flex-col group h-full">
                <div className="relative w-full h-52 rounded-xl overflow-hidden bg-gray-100">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="mt-4 flex flex-col flex-1">
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#FF9500" }}>
                    {post.category}
                  </span>
                  <h3 className="mt-1.5 text-lg font-extrabold text-gray-900 leading-snug">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed flex-1">{post.desc}</p>
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold transition hover:gap-2 w-fit"
                    style={{ color: "#FF9500" }}
                  >
                    Read More →
                  </button>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Load More */}
        <FadeUp delay={0.1}>
          <div className="mt-14 flex justify-center">
            <button
              className="px-8 py-3 rounded-lg text-sm font-semibold border transition hover:text-white"
              style={{ borderColor: "#FF9500", color: "#FF9500" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#FF9500";
                (e.currentTarget as HTMLButtonElement).style.color = "white";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                (e.currentTarget as HTMLButtonElement).style.color = "#FF9500";
              }}
            >
              Load More Stories
            </button>
          </div>
        </FadeUp>
      </section>

      {/* Modal — no animation, instant overlay */}
      {selectedPost && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="relative bg-white w-full max-w-3xl my-8 mx-4 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-72">
              <Image src={selectedPost.image} alt={selectedPost.title} fill className="object-cover" />
            </div>

            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md text-gray-700 hover:text-black transition"
            >
              ✕
            </button>

            <div className="px-8 py-8">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#FF9500" }}>
                <span>{selectedPost.category}</span>
                <span className="text-gray-400 font-normal normal-case tracking-normal">·</span>
                <span className="text-gray-400 font-normal normal-case tracking-normal flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {selectedPost.date}
                </span>
              </div>

              <h2 className="text-2xl font-extrabold text-gray-900 leading-snug mb-3">
                {selectedPost.title}
              </h2>
              <div className="w-10 h-1 rounded-full mb-6" style={{ backgroundColor: "#FF9500" }} />

              <div className="relative w-full h-64 rounded-2xl overflow-hidden mb-8">
                <Image src={selectedPost.image} alt={selectedPost.title} fill className="object-cover" />
              </div>

              {selectedPost.content.map((section, i) => (
                <div key={i} className="mb-6">
                  <h3 className="text-base font-bold text-gray-900 mb-2">{section.heading}</h3>
                  {section.body && (
                    <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{section.body}</p>
                  )}
                  {section.bullets && (
                    <ul className="mt-2 space-y-1.5">
                      {section.bullets.map((b, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#FF9500" }} />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}