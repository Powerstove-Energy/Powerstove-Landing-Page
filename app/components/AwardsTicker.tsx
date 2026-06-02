"use client";

import { useEffect, useRef } from "react";

const awards = [
  "Winner TEF-GIZ Nigeria 2018",
  "Winner King Hamad Youth Empowerment Award 2019",
  "Winner France-Africa 1000 Challenge 2020",
  "USAID Community Reinvestment Grant 2021",
  "UNDP GSW Award 2021",
  "Winner Cisco Global Problem Solver Challenge",
  "Winner TEF-GIZ Nigeria 2018",
  "Winner King Hamad Youth Empowerment Award 2019",
  "Winner France-Africa 1000 Challenge 2020",
  "USAID Community Reinvestment Grant 2021",
];

export default function AwardsTicker() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let position = 0;
    const speed = 0.5;
    let animId: number;

    const step = () => {
      position -= speed;
      const half = track.scrollWidth / 2;
      if (Math.abs(position) >= half) {
        position = 0;
      }
      track.style.transform = `translateX(${position}px)`;
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, []);

  const doubled = [...awards, ...awards];

  return (
    <div
      className="w-full py-3 overflow-hidden"
      style={{ backgroundColor: "#FF9500" }}
    >
      <div ref={trackRef} className="flex whitespace-nowrap will-change-transform">
        {doubled.map((award, i) => (
          <span
            key={i}
            className="text-white text-sm font-medium mx-6 flex items-center gap-2"
          >
            <span>★</span> {award}
          </span>
        ))}
      </div>
    </div>
  );
}