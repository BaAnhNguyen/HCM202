"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ArrowRight, Users, User } from "lucide-react";

export default function TeamPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background entrance
      gsap.fromTo(
        ".bg-overlay",
        { opacity: 0 },
        { opacity: 1, duration: 2, ease: "power2.inOut" }
      );

      // Title animation
      gsap.fromTo(
        ".team-title",
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 1.5, ease: "strong.out" }
      );

      // Members animation
      gsap.fromTo(
        ".member-card",
        { opacity: 0, x: -50, filter: "blur(10px)" },
        { 
          opacity: 1, 
          x: 0, 
          filter: "blur(0px)", 
          duration: 0.8, 
          stagger: 0.2, 
          ease: "back.out(1.7)" 
        }
      );

      // Button entrance
      gsap.fromTo(
        ".next-button",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, delay: 1.5, ease: "power3.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen bg-[#fdfaf5] flex flex-col items-center justify-center overflow-hidden py-20"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/parchment.png')] opacity-20 pointer-events-none bg-overlay"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-800 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-800 to-transparent"></div>

      <div className="relative z-10 max-w-4xl w-full px-6">
        <header className="text-center mb-16 team-title">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-100/50 border border-red-200 mb-6">
            <Users className="w-4 h-4 text-red-700" />
            <span className="text-xs font-bold uppercase tracking-widest text-red-800">Thông tin nhóm</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-4 font-crimson-pro tracking-tight">
            Nhóm 4
          </h1>
          <div className="text-xl md:text-2xl font-bold text-red-700 font-playfair tracking-[0.2em] uppercase">
            HCM202
          </div>
          <div className="h-1 w-24 bg-red-600 mx-auto mt-8 rounded-full"></div>
        </header>

        <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-16">
          {[
            { name: "Khưu Trọng Quân", role: "Thành viên", img: "/image/Avatar_QuanKhuu.png" },
            { name: "Ngô Phùng Anh Duy", role: "Nhóm trưởng", leader: true, img: "" },
            { name: "Nguyễn Bá Anh Nguyên", role: "Thành viên", img: "/image/AnhNguyen.jpg" },
            { name: "Trần Xuân Phước", role: "Thành viên", img: "" },
          ].map((member, i) => (
            <div 
              key={i}
              className="member-card flex flex-col items-center group min-w-[200px]"
            >
              <div className="relative mb-6">
                {member.leader && (
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-12 h-12 text-yellow-500 crown-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-lg">
                       <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5M19 19C19 19.6 18.6 20 18 20H6C5.4 20 5 19.6 5 19V18H19V19Z" />
                    </svg>
                  </div>
                )}
                <div className={`w-32 h-32 md:w-36 md:h-36 rounded-full border-4 ${member.leader ? 'border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.3)]' : 'border-red-200'} bg-white overflow-hidden flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:border-red-500 shadow-xl`}>
                   {member.img ? (
                     <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                   ) : (
                     <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300">
                        <User className="w-16 h-16" />
                     </div>
                   )}
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-lg md:text-xl font-black text-slate-800 font-crimson-pro leading-tight mb-2 whitespace-nowrap">
                  {member.name}
                </h3>
                {member.leader && (
                  <span className="text-[10px] font-bold uppercase tracking-widest text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded border border-yellow-200">
                    Leader
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center next-button">
          <button 
            onClick={() => router.push("/conclusion")}
            className="group relative inline-flex items-center gap-4 px-12 py-5 bg-slate-900 text-white rounded-full font-bold text-lg hover:bg-red-950 transition-all hover:shadow-2xl hover:scale-105 active:scale-95"
          >
            <span>Tiếp tục đến Lời cảm ơn</span>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400 text-xs font-bold tracking-[0.5em] uppercase pointer-events-none">
        Tư tưởng Hồ Chí Minh
      </div>
    </div>
  );
}
