"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, Trophy, BarChart3, RotateCcw, PartyPopper } from "lucide-react";
import { gsap } from "gsap";
import Link from "next/link";

interface Question {
  id: number;
  text: string;
  options: {
    key: "A" | "B" | "C" | "D";
    text: string;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "Bạn tỉnh dậy lúc 5h sáng, không có báo thức",
    options: [
      { key: "A", text: "Ngủ tiếp, vì chưa có lý do để dậy" },
      { key: "B", text: "Nghĩ xem hôm nay mình muốn làm gì cho vui" },
      { key: "C", text: "Check nhẹ công việc xem có gì cần xử lý" },
      { key: "D", text: "Bật dậy ngay vì nghĩ tới việc cần làm" },
    ],
  },
  {
    id: 2,
    text: "Bạn được tặng 10 tỷ, điều đầu tiên bạn nghĩ là:",
    options: [
      { key: "A", text: "Đi du lịch / nghỉ ngơi dài hạn" },
      { key: "B", text: "Mua thứ mình thích + tận hưởng" },
      { key: "C", text: "Đầu tư hoặc học thêm để phát triển" },
      { key: "D", text: "Dùng làm bàn đạp để làm việc lớn hơn" },
    ],
  },
  {
    id: 3,
    text: "Nếu cuộc đời là một game",
    options: [
      { key: "A", text: "Bạn chơi để chill, khám phá map" },
      { key: "B", text: "Vừa chơi vừa hoàn thành nhiệm vụ" },
      { key: "C", text: "Tập trung lên level nhanh" },
      { key: "D", text: "Try hard để đứng top server" },
    ],
  },
  {
    id: 4,
    text: "Bạn thấy ai đó làm việc 18 tiếng/ngày",
    options: [
      { key: "A", text: "Thấy hơi đáng sợ" },
      { key: "B", text: "Nể nhưng không muốn như vậy" },
      { key: "C", text: "Bình thường nếu có mục tiêu" },
      { key: "D", text: "Ngưỡng mộ, muốn giống họ" },
    ],
  },
  {
    id: 5,
    text: "Một ngày \"hoàn hảo\" là:",
    options: [
      { key: "A", text: "Không phải làm gì" },
      { key: "B", text: "Làm chút việc, còn lại chill" },
      { key: "C", text: "Làm việc hiệu quả, có tiến bộ" },
      { key: "D", text: "Làm việc hết công suất" },
    ],
  },
  {
    id: 6,
    text: "Bạn muốn chọn siêu năng lực nào:",
    options: [
      { key: "A", text: "Dừng thời gian trong 24h, (không được chạm vào người khác)" },
      { key: "B", text: "Phân thân làm đôi" },
      { key: "C", text: "Tăng tốc độ gấp đôi" },
      { key: "D", text: "Làm việc thì không mệt mỏi (chỉ tính làm việc)" },
    ],
  },
  {
    id: 7,
    text: "Nếu deadline biến mất khỏi thế giới:",
    options: [
      { key: "A", text: "Quá tuyệt." },
      { key: "B", text: "Vẫn làm." },
      { key: "C", text: "Hơi mất động lực" },
      { key: "D", text: "Thế thì còn gì là cuộc sống?" },
    ],
  },
  {
    id: 8,
    text: "Bạn nhận được 1 tuần không phải làm gì:",
    options: [
      { key: "A", text: "Tuyệt vời, đây mới là cuộc sống" },
      { key: "B", text: "Nghỉ vài ngày rồi tìm gì đó nhẹ nhàng làm" },
      { key: "C", text: "Sẽ lên plan học thêm hoặc làm project" },
      { key: "D", text: "Không chịu được, phải làm gì đó" },
    ],
  },
];

const results = [
  {
    min: 8,
    max: 22,
    title: "“ĐI LÀM ĐỂ SỐNG”",
    description: "Bạn đặt trải nghiệm lên hàng đầu, coi công việc như phương tiện để tận hưởng cuộc sống, khám phá bản thân và thế giới.",
    color: "from-blue-500 to-cyan-400",
    philosophy: "Work to Live",
  },
  {
    min: 23,
    max: 32,
    title: "“SỐNG ĐỂ ĐI LÀM”",
    description: "Công việc dần trở thành trung tâm, không chỉ là thu nhập mà còn là cách bạn định nghĩa bản thân và khẳng định vị trí trong xã hội.",
    color: "from-red-600 to-rose-500",
    philosophy: "Live to Work",
  },
];

export default function PhilosophyQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<("A" | "B" | "C" | "D")[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [counts, setCounts] = useState({ A: 0, B: 0, C: 0, D: 0 });
  
  const questionRef = useRef<HTMLDivElement>(null);
  const columnRefs = {
    A: useRef<HTMLDivElement>(null),
    B: useRef<HTMLDivElement>(null),
    C: useRef<HTMLDivElement>(null),
    D: useRef<HTMLDivElement>(null),
  };

  const handleSelect = (option: "A" | "B" | "C" | "D") => {
    const newAnswers = [...answers, option];
    const newCounts = { ...counts, [option]: counts[option] + 1 };
    
    // Animate Column
    gsap.to(columnRefs[option].current, {
      height: `${(newCounts[option] / 8) * 100}%`,
      duration: 0.5,
      ease: "back.out(1.7)",
    });

    if (currentStep < questions.length - 1) {
      gsap.to(questionRef.current, {
        opacity: 0,
        x: -20,
        duration: 0.3,
        onComplete: () => {
          setAnswers(newAnswers);
          setCounts(newCounts);
          setCurrentStep(currentStep + 1);
          gsap.fromTo(questionRef.current, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.3 });
        },
      });
    } else {
      setAnswers(newAnswers);
      setCounts(newCounts);
      setTimeout(() => setShowResult(true), 500);
    }
  };

  const totalScore = answers.reduce((acc, curr) => {
    const points = { A: 1, B: 2, C: 3, D: 4 };
    return acc + points[curr];
  }, 0);

  const finalResult = results.find(r => totalScore >= r.min && totalScore <= r.max) || results[0];

  if (showResult) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-white overflow-hidden relative">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r ${finalResult.color} opacity-20 blur-[120px] rounded-full`}></div>
        </div>

        <div className="max-w-2xl w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-10 shadow-2xl animate-in zoom-in duration-700">
          <div className="text-center space-y-6">
            <div className={`inline-flex p-4 rounded-full bg-gradient-to-tr ${finalResult.color} shadow-lg mb-4`}>
              <Trophy size={48} className="text-white" />
            </div>
            
            <h1 className="text-sm font-bold uppercase tracking-[0.3em] text-white/50">Kết quả của bạn</h1>
            <h2 className={`text-4xl md:text-5xl font-black bg-gradient-to-r ${finalResult.color} bg-clip-text text-transparent italic`}>
              {finalResult.title}
            </h2>
            
            <p className="text-xl text-white/80 leading-relaxed italic">
              "{finalResult.description}"
            </p>


            <div className="pt-10 flex flex-col gap-4">
              <Link href="/" className="group flex items-center justify-center gap-3 bg-white text-slate-950 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all active:scale-95">
                <RotateCcw size={18} />
                Về trang chủ
              </Link>
              <button 
                onClick={() => { window.location.reload(); }} 
                className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white py-4 rounded-2xl font-bold hover:bg-white/10 transition-all active:scale-95"
              >
                Làm lại trắc nghiệm
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row text-white font-sans">
      {/* Sidebar - Points Tracker */}
      <div className="md:w-32 bg-white/5 border-r border-white/10 flex flex-col items-center justify-end p-6 gap-6">
        <div className="flex-1 flex flex-col justify-end gap-4 w-full h-[60vh]">
          {/* Columns */}
          <div className="flex-1 flex items-end justify-between gap-2">
            {(["A", "B", "C", "D"] as const).map(key => (
              <div key={key} className="flex-1 flex flex-col items-center gap-3 h-full justify-end">
                <div 
                  ref={columnRefs[key]}
                  className={`w-full rounded-t-lg bg-gradient-to-t ${
                    key === "A" ? "from-blue-600 to-cyan-400" :
                    key === "B" ? "from-green-600 to-emerald-400" :
                    key === "C" ? "from-orange-600 to-amber-400" :
                    "from-red-600 to-rose-400"
                  }`}
                  style={{ height: "0%" }}
                ></div>
                <span className="text-xs font-black text-white/30">{key}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="pt-6 border-t border-white/10 text-center w-full">
          <BarChart3 size={20} className="mx-auto text-white/20 mb-2" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Khuynh hướng</span>
        </div>
      </div>

      {/* Main Quiz Area */}
      <div className="flex-1 relative flex flex-col overflow-hidden">
        {/* Navigation */}
        <div className="p-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-bold uppercase tracking-widest">Thoát</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-white/30 uppercase tracking-widest">Tiến độ</span>
            <div className="w-48 h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-red-600 transition-all duration-500" 
                style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
            <span className="text-xs font-bold text-white/50">{currentStep + 1}/{questions.length}</span>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-8">
          <div ref={questionRef} className="max-w-3xl w-full space-y-12">
            <div className="space-y-4">
              <span className="text-red-500 font-bold tracking-widest text-sm uppercase">Câu hỏi {currentStep + 1}</span>
              <h2 className="text-3xl md:text-5xl font-black leading-tight">
                {questions[currentStep].text}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {questions[currentStep].options.map((option) => (
                <button
                  key={option.key}
                  onClick={() => handleSelect(option.key)}
                  className="group relative flex items-center text-left p-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-3xl transition-all hover:scale-[1.02] active:scale-95 overflow-hidden"
                >
                  <div className={`absolute top-0 left-0 w-1 h-full opacity-0 group-hover:opacity-100 transition-opacity ${
                    option.key === "A" ? "bg-blue-500" :
                    option.key === "B" ? "bg-green-500" :
                    option.key === "C" ? "bg-orange-500" :
                    "bg-red-500"
                  }`}></div>
                  <div className="mr-6 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center font-black text-white/40 group-hover:bg-white/10 group-hover:text-white transition-all">
                    {option.key}
                  </div>
                  <span className="text-lg font-medium text-white/80 group-hover:text-white">
                    {option.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute bottom-10 right-10 flex items-center gap-3 text-white/10 pointer-events-none select-none">
          <CheckCircle2 size={120} />
        </div>
      </div>
    </div>
  );
}
