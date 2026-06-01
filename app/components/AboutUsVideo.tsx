"use client";

import { useState, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AboutUsVideo() {
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      <div className="relative rounded-2xl overflow-hidden w-full h-64 sm:h-120">
        <video
          ref={videoRef}
          src="/videos/whatsapp-vid.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
        <button
          onClick={toggleMute}
          className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 transition flex items-center justify-center"
        >
          {muted ? (
            <VolumeX size={18} className="text-white" />
          ) : (
            <Volume2 size={18} className="text-white" />
          )}
        </button>
      </div>
    </section>
  );
}