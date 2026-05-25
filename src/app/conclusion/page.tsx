"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { Home, RefreshCw } from "lucide-react";

export default function ConclusionPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background entrance
      gsap.fromTo(
        ".bg-overlay",
        { opacity: 0 },
        { opacity: 1, duration: 2, ease: "power2.inOut" }
      );

      // Quote animation
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, scale: 0.9, filter: "blur(10px)" },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 3,
          delay: 0.5,
          ease: "power3.out"
        }
      );

      // Buttons entrance
      gsap.fromTo(
        ".action-buttons",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 2, ease: "power2.out" }
      );

      // Floating particles
      gsap.to(".particle", {
        y: "random(-20, 20)",
        x: "random(-20, 20)",
        duration: "random(2, 4)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-black flex flex-center items-center justify-center overflow-hidden"
    >
      {/* Cinematic Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 bg-overlay"
        style={{ backgroundImage: "url('/image/body.png')" }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-red-950/30 to-black"></div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 bg-yellow-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div ref={quoteRef} className="mb-16">
          <span className="text-red-500 font-bold uppercase tracking-[0.3em] text-sm mb-6 block">
            — LỜI CẢM ƠN —
          </span>

          {/* Gallery ảnh đại diện hành trình */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border border-yellow-400/20 shadow-lg shadow-black/40">
              <img src="/image/hcm-portrait.jpg" alt="Hồ Chí Minh" className="w-full h-full object-cover object-top opacity-80" />
            </div>
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden border-2 border-yellow-400/40 shadow-xl shadow-black/50">
              <img src="/image/hcm-unity-people.jpg" alt="Hồ Chí Minh với nhân dân" className="w-full h-full object-cover opacity-85" />
            </div>
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border border-yellow-400/20 shadow-lg shadow-black/40">
              <img src="/image/hcm-matran.jpg" alt="Mặt trận dân tộc thống nhất" className="w-full h-full object-cover opacity-80" />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-yellow-100 italic leading-tight font-crimson-pro mb-8 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
            "Cảm ơn thầy và các bạn đã lắng nghe"
          </h1>
          <div className="flex items-center justify-center gap-4">
            <div className="h-[2px] w-12 bg-red-600"></div>
            <span className="text-2xl text-yellow-500 font-bold uppercase tracking-widest font-playfair">
              Nhóm 4 - 	HCM202
            </span>
            <div className="h-[2px] w-12 bg-red-600"></div>
          </div>
        </div>

        <div className="action-buttons flex flex-col md:flex-row items-center justify-center gap-6 mt-12">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-full font-bold transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] group"
          >
            <Home className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            <span>Quay lại trang chủ</span>
          </button>

          <button
            onClick={() => router.push("/timeline/dieu-kien-xay-dung-dai-doan-ket")}
            className="flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full font-bold backdrop-blur-md transition-all hover:scale-105 group"
          >
            <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            <span>Xem lại hành trình</span>
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 text-xs font-bold tracking-[0.5em] uppercase pointer-events-none">
        Tư tưởng Hồ Chí Minh
      </div>
    </div>
  );
}
