"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Post = {
  id: number;
  image: string;
  category: string;
  title: string;
  desc: string;
  tab: string;
};

const posts: Post[] = [
  {
    id: 1,
    image: "/1.png",
    category: "INNOVATION",
    title: "How IoT is Revolutionizing Cooking in Nigeria",
    desc: "Our latest software update allows users to monitor their carbon savings in real-time...",
    tab: "Innovation",
  },
  {
    id: 2,
    image: "/2.png",
    category: "CLIMATE ACTION",
    title: "The Path to Net Zero: Our Carbon Strategy",
    desc: "Discover how PowerStove is partnering with global agencies to offset millions of...",
    tab: "Climate Action",
  },
  {
    id: 3,
    image: "/3.png",
    category: "OUR COMMUNITY",
    title: "Empowering Women Entrepreneurs",
    desc: "Stories from our distribution partners who are building successful businesses while...",
    tab: "Our Community",
  },
  {
    id: 4,
    image: "/4.png",
    category: "SUSTAINABILITY",
    title: "The Science Behind Bio-Pellets",
    desc: "Understanding why our agricultural waste-to-energy model is the most efficient fuel...",
    tab: "Sustainability",
  },
  {
    id: 5,
    image: "/5.png",
    category: "INNOVATION",
    title: "2024 Impact Report Preview",
    desc: "A sneak peek at our annual metrics: 1M+ lives touched and 500,000 tonnes of...",
    tab: "Innovation",
  },
  {
    id: 6,
    image: "/6.png",
    category: "OUR COMMUNITY",
    title: "Clean Cooking for Schools",
    desc: "How we're expanding our institutional stove program to provide smoke-free...",
    tab: "Our Community",
  },
];

const tabs = ["All", "Sustainability", "Innovation", "Our Community", "Climate Action"];

export default function BlogGrid() {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = posts.filter((p) => {
    const matchesTab = activeTab === "All" || p.tab === activeTab;
    const matchesSearch =
      search === "" ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
      {/* Tabs + Search */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
        {/* Tabs */}
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

        {/* Search */}
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

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((post) => (
          <div key={post.id} className="flex flex-col group">
            {/* Image */}
            <div className="relative w-full h-52 rounded-xl overflow-hidden bg-gray-100">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Content */}
            <div className="mt-4 flex flex-col flex-1">
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "#FF9500" }}
              >
                {post.category}
              </span>
              <h3 className="mt-1.5 text-lg font-extrabold text-gray-900 leading-snug">
                {post.title}
              </h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed flex-1">
                {post.desc}
              </p>
              <Link
                href={`/blog/${post.id}`}
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold transition hover:gap-2"
                style={{ color: "#FF9500" }}
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
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
    </section>
  );
}