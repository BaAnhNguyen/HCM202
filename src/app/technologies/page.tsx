"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ArrowRight, MessageSquare, BookOpen, Image as ImageIcon, Code2 } from "lucide-react";

export default function TechnologiesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        ".tech-title",
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power4.out" }
      );

      // Cards animation
      gsap.fromTo(
        ".tech-card",
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.2)",
          delay: 0.5
        }
      );

      // Button animation
      gsap.fromTo(
        ".next-button",
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 2 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const techs = [
    {
      num: "01",
      title: "ChatGPT",
      img: "/image/chatgpt.png",
      points: [
        "Hỗ trợ giải thích khái niệm",
        "Gợi ý cấu trúc bài",
        "Phân tích nội dung triết học",
        "Tóm tắt & hệ thống hóa kiến thức"
      ]
    },
    {
      num: "02",
      title: "NotebookLM",
      img: "/image/notebook.png",
      points: [
        "Tổng hợp tài liệu",
        "Hỗ trợ nghiên cứu nguồn",
        "Tổ chức thông tin",
        "Liên kết nội dung"
      ]
    },
    {
      num: "03",
      title: "Gemini",
      img: "/image/gemini.png",
      points: [
        "Tạo ảnh minh họa.",
        "Xử lý và tối ưu hóa hình ảnh."
      ]
    },
    {
      num: "04",
      title: "Cursor",
      img: "/image/cursor.png",
      points: [
        "Thiết kế UI/UX và hoạt ảnh.",
        "Xây dựng trải nghiệm tương tác.",
        "Tối ưu hóa hiệu năng ứng dụng Web."
      ]
    }
  ];

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-[#111827] flex flex-col items-center justify-center overflow-hidden py-12 md:py-20"
    >
      {/* Background Shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/10 rounded-full blur-[120px] -ml-48 -mb-48"></div>

      <div className="relative z-10 max-w-7xl w-full px-6">
        <header className="text-center mb-16 tech-title">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight uppercase">
            CÔNG NGHỆ ĐÃ SỬ DỤNG
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Dự án thảo luận được hỗ trợ và xây dựng bởi các công cụ AI hiện đại nhất.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {techs.map((tech, i) => (
            <div
              key={i}
              className="tech-card bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-8 rounded-[2.5rem] hover:border-blue-500 transition-all duration-300 group flex flex-col items-center text-center"
            >
              <div className="mb-8 w-24 h-24 bg-slate-900/50 rounded-3xl border border-slate-700 p-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <img
                  src={tech.img}
                  alt={tech.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <h3 className="text-2xl font-bold text-white mb-6 tracking-wide underline decoration-blue-500/50 decoration-2 underline-offset-8">
                {tech.title}
              </h3>

              <ul className="space-y-4">
                {tech.points.map((point, j) => (
                  <li key={j} className="flex gap-3 text-slate-300 text-sm leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center next-button">
          <button
            onClick={() => router.push("/team")}
            className="inline-flex items-center gap-4 px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20"
          >
            <span>Tiếp tục đến Thông tin nhóm</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 text-[10px] font-bold tracking-[0.8em] uppercase pointer-events-none">
        Presentation Technology Stack
      </div>
    </div>
  );
}
