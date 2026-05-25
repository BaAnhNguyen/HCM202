import { useState } from "react";
import { useRouter } from "next/navigation";
import { Send, Search, ArrowRight, X } from "lucide-react";
import { timelineData, TimelineItem } from "@/data/timelineData";
import { normalizeVietnamese, containsKeyword } from "@/utils/text";

interface SimpleChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SimpleChat({ isOpen, onClose }: SimpleChatProps) {
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState<TimelineItem[]>([]);
  const router = useRouter();

  const performSearch = (query: string) => {
    const q = query.trim();
    if (q.length < 2) {
      setSearchResults([]);
      return;
    }

    const results = timelineData.filter(item => 
      containsKeyword(item.title, q) || 
      containsKeyword(item.description, q) ||
      containsKeyword(item.year, q) || 
      containsKeyword(item.slug, q)
    );
    setSearchResults(results);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    performSearch(inputValue);
  };

  const handleNavigate = (slug: string) => {
    router.push(`/timeline/${slug}`);
    onClose();
    setSearchResults([]);
    setInputValue("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-60 right-6 w-80 bg-white/30 backdrop-blur-md border border-red-200/30 rounded-[2rem] shadow-2xl z-20 p-6 transition-all animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-red-600 text-sm tracking-tight">Tìm kiếm nhanh</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      <div className="space-y-4">
        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="max-h-48 overflow-y-auto space-y-2 mb-2 pr-1 custom-scrollbar">
            <div className="flex items-center justify-between sticky top-0 bg-white/5 backdrop-blur-md pb-1 z-10">
              <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Gợi ý nội dung</span>
              <button onClick={() => setSearchResults([])} className="text-gray-400 hover:text-red-500">
                <X size={10} />
              </button>
            </div>
            {searchResults.map((result, idx) => (
              <button
                key={idx}
                onClick={() => handleNavigate(result.slug)}
                className="w-full text-left p-2 rounded-lg bg-white/80 hover:bg-red-50 border border-red-100 transition-all group flex items-start gap-2 shadow-sm"
              >
                <Search size={12} className="mt-1 text-red-400 group-hover:text-red-600 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-bold text-gray-800 truncate">{result.year}: {result.title}</p>
                </div>
                <ArrowRight size={10} className="mt-1 text-gray-300 group-hover:text-red-600 transform group-hover:translate-x-0.5 transition-all" />
              </button>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              performSearch(e.target.value);
            }}
            placeholder="Tìm mục cần đến..."
            className="w-full pl-4 pr-10 py-2.5 bg-white/90 border border-red-200 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm shadow-md transition-all"
            autoFocus
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="absolute right-1 top-1 bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white p-2 rounded-full transition-all flex items-center justify-center w-8 h-8 shadow-lg active:scale-90"
          >
            <Send size={12} />
          </button>
        </form>
      </div>
      
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(220, 38, 38, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(220, 38, 38, 0.4);
        }
      `}</style>
    </div>
  );
}
