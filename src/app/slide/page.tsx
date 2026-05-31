"use client";

import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";

export default function SlidesPage() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] flex flex-col">
      {/* Top bar */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors duration-200"
        >
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-white/15 bg-white/5 group-hover:bg-white/10 group-hover:border-white/30 transition-all duration-200">
            <ArrowLeft className="w-3.5 h-3.5" />
          </span>
          <span>Quay về trang chủ</span>
        </Link>

        <a
          href="/slide/thuyettrinh.pdf"
          download
          className="inline-flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors duration-200"
        >
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-all duration-200">
            <Download className="w-3.5 h-3.5" />
          </span>
          <span>Tải PDF</span>
        </a>
      </header>

      {/* PDF viewer */}
      <main className="flex-1 flex flex-col items-center justify-start px-4 py-8 gap-6">
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-yellow-400/70 font-semibold mb-2">
            Tư tưởng Hồ Chí Minh
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-white font-crimson-pro italic">
            Slide thuyết trình
          </h1>
        </div>

        <div className="w-full max-w-5xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/60"
          style={{ aspectRatio: "16/9" }}
        >
          <iframe
            src="/slide/thuyettrinh.pdf"
            className="w-full h-full"
            title="Slide thuyết trình Tư tưởng Hồ Chí Minh"
          />
        </div>
      </main>
    </div>
  );
}