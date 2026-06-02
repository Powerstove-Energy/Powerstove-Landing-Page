"use client";

import { useEffect, useRef, useState } from "react";

const team = [
  {
    role: "Founder, CEO",
    name: "Okey Esse",
    bio: "Physics Electronics graduate. Co-founder of 5 companies with 20 years of MSME experience. Visionary behind the Powerstove IoT cookstove.",
    img: "/team/okey.webp",
    linkedin: "https://www.linkedin.com/in/okeyesse",
  },
  {
    role: "Chief Operating Officer",
    name: "Glory Esse",
    bio: "Oversees daily business operations and administration, implementing business strategies and building community distribution networks.",
    img: "/team/glory.webp",
    linkedin: "https://www.linkedin.com/in/glory-esse-36872a183",
  },
  {
    role: "Chief Financial Officer",
    name: "Akume Timothy Tersoo",
    bio: "Finance professional with strong skills in budgeting, grant management, and financial reporting for development-stage companies.",
    img: "/team/akume.webp",
    linkedin: "https://www.linkedin.com/in/timothy-akume-72989792",
  },
  {
    role: "Head of IT",
    name: "Saint Moses Agbukor",
    bio: "Experienced IT leader specialising in IoT systems, cybersecurity, and digital transformation for clean energy platforms.",
    img: "/team/saint.webp",
    linkedin: "#",
  },
  {
    role: "Board Chairman",
    name: "Harry 'Tomi Davies",
    bio: "Collaborator-in-Chief at Techvision. Co-founder of Lagos Angel Network. Author, public speaker and prolific angel investor.",
    img: "/team/harry.webp",
    linkedin: "https://www.linkedin.com/in/tomidee",
  },
  {
    role: "Business Advisor",
    name: "Erick Yong",
    bio: "Accomplished investor, venture builder and ex-CEO of Greentech Capital. Has led investments in 43+ clean energy companies.",
    img: "/team/erick.webp",
    linkedin: "https://www.linkedin.com/in/erick-yong-53a10ba",
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

function TeamCard({ member, index }: { member: (typeof team)[0]; index: number }) {
  const { ref, visible } = useInView(0.1);

  return (
    <div
      ref={ref}
      key={member.name}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(40px) scale(0.97)",
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
      }}
    >
      {/* Photo */}
      <div className="w-full h-64 rounded-2xl overflow-hidden">
        <img
          src={member.img}
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      {/* Info */}
      <div className="mt-4">
        <span
          className="text-[10px] font-bold uppercase tracking-widest"
          style={{ color: "#FF9500" }}
        >
          {member.role}
        </span>
        <h3 className="mt-1 text-lg font-extrabold text-gray-900">{member.name}</h3>
        <p className="mt-1 text-sm text-gray-500 leading-relaxed">{member.bio}</p>
        <a
          href={member.linkedin}
          className="mt-3 inline-flex items-center gap-1 text-gray-400 hover:text-gray-600 transition"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        </a>
      </div>
    </div>
  );
}

function AnimatedHeader() {
  const { ref, visible } = useInView(0.2);
  return (
    <div
      ref={ref}
      className="text-center mb-12"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      <span
        className="text-xs font-bold uppercase tracking-widest"
        style={{ color: "#FF9500" }}
      >
        Behind The Scene
      </span>
      <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900">
        The Powerstove Crew
      </h2>
      <p className="mt-3 text-gray-500 text-sm max-w-xs mx-auto">
        Diverse expertise united by a single mission — clean energy for all.
      </p>
      <div
        className="mt-4 mx-auto w-10 h-1 rounded-full"
        style={{ backgroundColor: "#FF9500" }}
      />
    </div>
  );
}

export default function Team() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <AnimatedHeader />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <TeamCard key={member.name} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}