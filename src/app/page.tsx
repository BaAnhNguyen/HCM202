"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Users, Code2 , QrCode, Gamepad2} from "lucide-react";
import ModelWithChat from "@/components/model3D/ModelWithChat";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import { timelineData } from "@/data/timelineData";

export default function HoChiMinhTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Scroll về đầu trang và ẩn thanh scroll
    window.scrollTo(0, 0);
    document.documentElement.style.scrollbarWidth = "none";
    const style = document.createElement("style");
    style.setAttribute("data-hide-scrollbar", "true");
    style.textContent = `
      html::-webkit-scrollbar { width: 0 !important; display: none !important; }
      html { -ms-overflow-style: none !important; scrollbar-width: none !important; }
      body::-webkit-scrollbar { width: 0 !important; display: none !important; }
    `;
    document.head.appendChild(style);

    // Chặn scroll trong quá trình load
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      // Tạo timeline master cho hero section
      const heroTl = gsap.timeline({
        onComplete: () => {
          // Cho phép scroll lại sau khi animation hoàn thành
          document.body.style.overflow = "auto";
          // Đánh dấu animation đã hoàn thành
          setAnimationComplete(true);
        },
      });

      // 1. Fade in background image
      heroTl
        .fromTo(
          ".hero-bg",
          { opacity: 0, scale: 1.1 },
          {
            opacity: 0.9,
            scale: 1,
            duration: 2.5,
            ease: "power3.out",
          }
        )

        // 2. Hiệu ứng cho hero content container
        .fromTo(
          ".hero-content",
          {
            opacity: 0,
            y: 100,
            scale: 0.8,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 3,
            ease: "power4.out",
          },
          "-=2.0"
        )

        // 3. Hiệu ứng cho title với delay 2 giây
        .fromTo(
          ".hero-title",
          {
            opacity: 0,
            y: 50,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.5,
            ease: "power3.out",
          },
          "-=1"
        )

        // 5. Hiệu ứng floating particles
        .fromTo(
          ".floating-particle",
          {
            opacity: 0,
            scale: 0,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 1.5,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=1.5"
        )

        // 6. Quote với hiệu ứng elegant
        .fromTo(
          ".hero-quote",
          {
            opacity: 0,
            y: 30,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.5,
            ease: "power3.out",
          },
          "-=2"
        );

      // 7. Thêm hiệu ứng floating liên tục cho particles
      gsap.to(".floating-particle", {
        y: "-=8",
        duration: 3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.3,
      });

      itemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.fromTo(
            item,
            {
              opacity: 0,
              y: 80,
              x: window.innerWidth >= 768 ? (index % 2 === 0 ? -50 : 50) : -30,
              scale: 0.8,
              rotationY:
                window.innerWidth >= 768 ? (index % 2 === 0 ? -10 : 10) : -5,
            },
            {
              opacity: 1,
              y: 0,
              x: 0,
              scale: 1,
              rotationY: 0,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 90%",
                end: "bottom 10%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });

      // Timeline line animation với responsive
      gsap.fromTo(
        ".timeline-line-animated",
        { scaleY: 0, opacity: 0.3 },
        {
          scaleY: 1,
          opacity: 1,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".timeline-container",
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
          },
        }
      );

      // Timeline dots floating animation (only if dots exist)
      if (typeof document !== "undefined" && document.querySelectorAll('.timeline-dot').length > 0) {
        gsap.to(".timeline-dot", {
          y: -3,
          scale: 1.1,
          duration: 2,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1,
          stagger: 0.4,
        });
      }
    }, timelineRef);

    return () => {
      ctx.revert();
      // Đảm bảo scroll được khôi phục khi component unmount
      document.body.style.overflow = "auto";
      // Xóa style element đã thêm
      const customStyle = document.querySelector("style[data-hide-scrollbar]");
      if (customStyle) {
        customStyle.remove();
      }
    };
  }, []);

  const getBadgeClass = (importance: string) => {
    switch (importance) {
      case "important":
        return "bg-gradient-to-r from-red-600 to-red-700 text-white border-0 shadow-lg";
      case "secondary":
        return "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white border-0 shadow-lg";
      case "accent":
        return "bg-gradient-to-r from-green-600 to-green-700 text-white border-0 shadow-lg";
      default:
        return "bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0 shadow-lg";
    }
  };

  return (
    <div ref={timelineRef} className="min-h-screen bg-background">
      <section className="hero-section py-32 px-4 text-center relative overflow-hidden min-h-screen flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 bg-black">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-0 hero-bg"
            style={{
              backgroundImage: "url('/image/header_hcm_daidoanket.jpg')",
              backgroundPosition: "center center",
              backgroundSize: "cover",
            }}
          ></div>
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Floating Particles */}
          <div className="absolute inset-0 pointer-events-none">
                {(() => {
                  const seeded = (n: number) => Math.abs(Math.sin(n * 12.9898) * 43758.5453) % 1;
                  return [...Array(15)].map((_, i) => {
                    const left = `${(seeded(i) * 100).toFixed(6)}%`;
                    const top = `${(seeded(i + 17) * 100).toFixed(6)}%`;
                    const delay = `${(seeded(i + 31) * 2).toFixed(6)}s`;
                    return (
                      <div
                        key={i}
                        className="floating-particle absolute w-2 h-2 bg-red-500/30 rounded-full"
                        style={{
                          left,
                          top,
                          animationDelay: delay,
                        }}
                      ></div>
                    );
                  });
                })()}
          </div>
        </div>

        <div className="max-w-6xl mx-auto relative z-20 px-4 sm:px-6">
          <div className="hero-content relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/20 px-6 py-10 shadow-[0_25px_80px_rgba(0,0,0,0.35)] backdrop-blur-md md:px-12 md:py-14">
            <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-red-500/20" />

            <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-yellow-300/20 bg-yellow-100/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.35em] text-yellow-100">
                Tư tưởng Hồ Chí Minh
              </div>

              <h1 className="hero-title mt-8 text-balance font-crimson-pro font-black leading-[0.92] tracking-tight text-white">
                <span className="block text-5xl md:text-7xl lg:text-8xl text-red-500 drop-shadow-2xl">
                  TƯ TƯỞNG HỒ CHÍ MINH
                </span>
                <span className="mt-4 block text-sm uppercase tracking-[0.22em] text-yellow-300 md:text-2xl lg:text-3xl">
                  Đại đoàn kết dân tộc và đại đoàn kết quốc tế
                </span>
              </h1>

              <p className="hero-quote mt-8 max-w-2xl text-pretty font-crimson text-xl font-normal leading-relaxed italic text-yellow-100/90 drop-shadow-lg md:text-2xl">
                "Ngọn đuốc soi đường cho sự nghiệp cách mạng"
              </p>

              <div className="mt-10 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center">
                <Link
                  href="/team"
                  aria-label="Xem Thông tin nhóm"
                  className="inline-flex items-center justify-center gap-3 rounded-full border border-red-200 bg-white px-6 py-3 font-semibold text-red-700 shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md"
                >
                  <Users className="h-4 w-4" />
                  <span>Xem Thông tin nhóm</span>
                </Link>

                <Link
                  href="/technologies"
                  aria-label="Xem Công nghệ"
                  className="inline-flex items-center justify-center gap-3 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white shadow-sm backdrop-blur-sm transition-transform hover:-translate-y-0.5 hover:shadow-md"
                >
                  <Code2 className="h-4 w-4" />
                  <span>Xem Công nghệ</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section
        className="timeline-container relative py-16 md:py-24 px-4 bg-center bg-contain"
        style={{ backgroundImage: "url('/image/body.png')" }}
      >
        <div className="absolute inset-0 bg-black/60 md:bg-black/50"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Timeline Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-crimson-pro italic">
              Làm việc để sống hay sống để làm việc?
            </h2>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-yellow-200 mb-4 font-crimson-pro italic">
              Đời sống minh triết là gì?
            </h2>
          </div>

          {/* Desktop Timeline Line */}
          <div
            className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 timeline-line timeline-line-animated origin-top rounded-full bg-gradient-to-b from-red-500 to-yellow-100"
            style={{ height: "98.24%" }}
          ></div>

          {/* Mobile Timeline Line */}
          <div
            className="md:hidden absolute left-8 top-32 w-1 timeline-line timeline-line-animated origin-top rounded-full bg-gradient-to-b from-red-500 to-yellow-100"
            style={{ height: "98.24%" }}
          ></div>

          {/* Timeline Items */}
          <div className="space-y-12 md:space-y-24">
            {timelineData.map((item, index) => (
              <div
                key={index}
                ref={(el) => {
                  itemsRef.current[index] = el;
                }}
                className={`relative flex items-center ${
                  // Desktop: alternating left/right, Mobile: all left-aligned
                  "md:" + (index % 2 === 0 ? "justify-start" : "justify-end")
                  }`}
              >
                {/* Timeline Dot */}
                {/* <div className="absolute md:left-1/2 left-8 transform md:-translate-x-1/2 -translate-x-1/2 w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-full timeline-dot z-10 border-4 border-white shadow-xl"></div> */}

                {/* Year Display */}
                <div
                  className={`absolute md:left-1/2 left-8 transform md:-translate-x-1/2 -translate-x-1/2 ${
                    // Desktop positioning, Mobile: above the dot
                    "md:" +
                    (index % 2 === 0 ? "translate-x-20" : "-translate-x-28") +
                    " -translate-y-12 md:translate-y-0"
                    } text-lg md:text-xl font-bold z-20 font-playfair text-yellow-300 bg-red-800/80 px-3 py-1 rounded-lg backdrop-blur-sm border border-yellow-400/30`}
                >
                  {item.year}
                </div>

                {/* Timeline Card */}
                <Link
                  href={`/timeline/${item.slug}`}
                  className={`block w-full ${
                    // Desktop: max-width and positioning, Mobile: full width with left margin
                    "md:max-w-lg ml-20 md:ml-0 " +
                    (index % 2 === 0 ? "md:mr-auto" : "md:ml-auto")
                    }`}
                >
                  <Card className="timeline-card w-full shadow-2xl hover:shadow-red-500/25 transition-all duration-500 border border-red-200/50 bg-white/95 backdrop-blur-sm hover:scale-105 md:hover:scale-105 hover:scale-[1.02] cursor-pointer group overflow-hidden">
                    <CardContent className="p-6 md:p-8">
                      {/* Category Badge */}
                      {/* <div className="mb-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getBadgeClass(item.importance)}`}>
                          {item.category}
                        </span>
                      </div> */}

                      {/* Title */}
                      <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-800 leading-tight group-hover:text-red-700 transition-colors font-playfair">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 leading-relaxed text-pretty text-base md:text-lg font-inter mb-4">
                        {item.description}
                      </p>

                      {/* Read More Button */}
                      <div className="flex items-center justify-between">
                        <div className="text-red-600 font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2 font-inter text-sm md:text-base">
                          Đọc chi tiết →
                        </div>
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100">
                          <svg
                            className="w-4 h-4 text-red-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            ))}
          </div>

        </div>
      </section>

      <section className="py-24 px-4 text-center bg-gradient-to-br from-red-50 via-yellow-50 to-red-100 relative">
        <div className="absolute inset-0 bg-amber-100"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <blockquote className="text-3xl md:text-4xl font-semibold text-red-700 mb-8 text-balance italic leading-relaxed font-crimson">
            "Đoàn kết, đoàn kết, đại đoàn kết. Thành công, thành công, đại thành công."
          </blockquote>

          <cite className="text-xl text-red-600 font-medium font-inter">
            — Hồ Chí Minh —
          </cite>
        </div>
      </section>

      {/* 3D Model với Chat tích hợp - chỉ hiện sau animation */}
      {animationComplete && <ModelWithChat />}

      {/* Game Section (QR Code) - Thay thế cho thư mục game cũ */}
      <section id="game-section" className="py-24 px-4 bg-white relative">
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-red-700 mb-6 font-crimson-pro italic drop-shadow-sm">
            Trải nghiệm Trò chơi
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl font-inter">
            Quét mã QR bên dưới để tham gia vào trò chơi tương tác tìm hiểu về Tư tưởng Hồ Chí Minh.
          </p>
          
          <div className="bg-white p-6 rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-red-50 transform hover:-translate-y-2 transition-transform duration-300">
            {/* Ảnh QR */}
            <div className="relative group">
              <img 
                src="/image/Game-or.png" 
                alt="QR Code Game" 
                className="w-64 h-64 object-contain rounded-xl"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden w-64 h-64 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-500">
                <QrCode className="w-12 h-12 mb-3 text-gray-400" />
                <span className="font-medium">Chưa có mã QR</span>
                <span className="text-xs mt-1 px-4 text-center">Thêm ảnh vào public/image/qr-game.png</span>
              </div>
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-red-900/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
              </div>
            </div>
          </div>
          
          <a
            href="https://game-black-gamma.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 text-red-700 font-medium bg-red-50 hover:bg-red-100 border border-red-100 py-3 px-8 rounded-full transition-colors duration-300"
          >
            <Gamepad2 className="w-6 h-6" />
            <span className="text-lg">Tham gia ngay!</span>
          </a>
        </div>
      </section>
    </div>
  );
}
