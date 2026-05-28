"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Calendar, BookOpen, Quote, Info } from "lucide-react";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { gsap } from "gsap";
import ModelWithChat from "@/components/model3D/ModelWithChat";

// Type definitions for rich content
interface RichContentItem {
  type: "paragraph" | "image" | "quote";
  content?: ReactNode;
  src?: string;
  alt?: string;
  caption?: string;
  author?: string;
  layout?: "normal" | "wide";
}

interface TimelineEvent {
  year: string;
  title: string;
  slug: string;
  description: string;
  richContent: RichContentItem[];
  images: string[];
}

const timelineData: TimelineEvent[] = [
  {
    year: "Mục 1",
    title: "Điều kiện xây dựng khối đại đoàn kết toàn dân tộc",
    slug: "dieu-kien-xay-dung-dai-doan-ket",
    description:
      "Hồ Chí Minh chỉ rõ bốn điều kiện cốt lõi để quy tụ và đoàn kết mọi giai cấp, tầng lớp vào khối đại đoàn kết toàn dân tộc.",
    richContent: [
      {
        type: "paragraph",
        content: (
          <>
            Để xây dựng khối đại đoàn kết toàn dân tộc, quy tụ và đoàn kết được mọi giai cấp,
            tầng lớp, Hồ Chí Minh chỉ rõ cần đảm bảo bốn điều kiện sau đây. Đây là những
            nền tảng không thể thiếu để biến đại đoàn kết từ mục tiêu thành sức mạnh thực sự.
          </>
        ),
      },
      {
        type: "paragraph",
        content: (
          <>
            <strong>Thứ nhất, phải lấy lợi ích chung làm điểm quy tụ, đồng thời tôn trọng các lợi ích khác biệt chính đáng.</strong>
            {" "}Phải chú trọng xử lý các mối quan hệ lợi ích đa dạng, phong phú trong xã hội.
            Chỉ có xử lý tốt quan hệ lợi ích, tìm ra điểm tương đồng và lợi ích chung thì mới đoàn kết được lực lượng.
            Mục đích chung của Mặt trận phải phù hợp với từng giai đoạn cách mạng, nhằm tập hợp tối mức cao nhất
            lực lượng dân tộc. Đoàn kết phải xuất phát từ mục tiêu vì nước, vì dân, trên cơ sở yêu nước, thương dân,
            chống áp bức, bóc lột, nghèo nàn, lạc hậu.
          </>
        ),
      },
      {
        type: "quote",
        content:
          "Lợi ích căn bản của nhân dân lao động là 'mẫu số chung' để quy tụ các tầng lớp, giai cấp, đảng phái, dân tộc và tôn giáo vào trong Mặt trận.",
        author: "Hồ Chí Minh",
      },
      {
        type: "paragraph",
        content: (
          <>
            <strong>Thứ hai, phải kế thừa truyền thống yêu nước, nhân nghĩa, đoàn kết của dân tộc.</strong>
            {" "}Truyền thống này được hình thành, củng cố và phát triển trong suốt quá trình dựng nước và giữ nước
            hàng ngàn năm, trở thành giá trị bền vững, thấm sâu vào tư tưởng, tình cảm của mỗi con người Việt Nam.
            Đây là cội nguồn sức mạnh vô địch để dân tộc chiến đấu và chiến thắng thiên tai, địch họa, làm cho đất
            nước trường tồn, bản sắc dân tộc được giữ vững.
          </>
        ),
      },
      {
        type: "paragraph",
        content: (
          <>
            <strong>Thứ ba, phải có lòng khoan dung, độ lượng với con người.</strong>
            {" "}Trong mỗi cá nhân cũng như mỗi cộng đồng đều có những ưu điểm, khuyết điểm, mặt tốt, mặt xấu.
            Vì lợi ích cách mạng, cần có lòng khoan dung độ lượng, trân trọng phần thiện dù nhỏ nhất ở mỗi người
            để quy tụ mọi lực lượng.
          </>
        ),
      },
      {
        type: "quote",
        content:
          "Năm ngón tay cũng có ngón vắn ngón dài. Nhưng vắn dài đều họp nhau lại nơi bàn tay... Ta phải lấy tình thân ái mà cảm hóa họ. Có như thế mới thành đại đoàn kết.",
        author: "Hồ Chí Minh",
      },
      {
        type: "image",
        src: "/image/Muc1-2.jpg",
        alt: "Điều kiện xây dựng khối đại đoàn kết toàn dân tộc",
        caption: "Bốn điều kiện cốt lõi — nền tảng để biến đại đoàn kết từ mục tiêu thành sức mạnh thực sự",
      },
      {
        type: "paragraph",
        content: (
          <>
            <strong>Thứ tư, phải có niềm tin vào nhân dân.</strong>
            {" "}Với Hồ Chí Minh, yêu dân, tin dân, dựa vào dân, sống, phấn đấu vì hạnh phúc của nhân dân là nguyên tắc tối cao.
            Nguyên tắc này là sự tiếp nối truyền thống "Nước lấy dân làm gốc", đồng thời là sự quán triệt sâu sắc
            nguyên lý mácxít "Cách mạng là sự nghiệp của quần chúng". Dân là chỗ dựa vững chắc và là nguồn sức mạnh
            vô địch của khối đại đoàn kết.
          </>
        ),
      },
      {
        type: "paragraph",
        content: (
          <>
            <strong>
              Tóm lại, bốn điều kiện này là nền tảng không thể tách rời: lợi ích chung làm điểm quy tụ,
              truyền thống yêu nước làm cội nguồn, lòng khoan dung làm chất kết dính, và niềm tin vào nhân dân
              làm động lực để xây dựng khối đại đoàn kết bền vững.
            </strong>
          </>
        ),
      },
    ],
    images: [
      "/image/Muc1.jpg",
      "/image/Muc1-2.jpg"
    ],
  },
  {
    year: "Mục 2",
    title: "Mặt trận dân tộc thống nhất",
    slug: "mat-tran-dan-toc-thong-nhat",
    description:
      "Hình thức tổ chức của khối đại đoàn kết toàn dân tộc — nơi quy tụ mọi tổ chức và cá nhân yêu nước Việt Nam.",
    richContent: [
      {
        type: "paragraph",
        content: (
          <>
            Khối đại đoàn kết toàn dân tộc chỉ trở thành lực lượng to lớn khi được tập hợp, tổ chức lại
            thành một khối vững chắc là <strong>Mặt trận dân tộc thống nhất</strong>. Đây là nơi quy tụ mọi tổ chức
            và cá nhân yêu nước, tập hợp mọi người dân Việt Nam ở trong nước và kiều bào ở nước ngoài.
          </>
        ),
      },
      {
        type: "paragraph",
        content: (
          <>
            Tùy theo yêu cầu của từng giai đoạn lịch sử, Mặt trận có những tên gọi khác nhau như
            Hội Phản đế đồng minh, Mặt trận Việt Minh, Mặt trận Liên Việt, Mặt trận Tổ quốc Việt Nam,
            nhưng thực chất chỉ là một tổ chức chính trị - xã hội nhằm phấn đấu vì mục tiêu
            <strong> độc lập, tự do, hạnh phúc</strong> của nhân dân.
          </>
        ),
      },
      {
        type: "image",
        src: "/image/Muc2-2.jpg"
      },
      {
        type: "paragraph",
        content: (
          <>
            <strong>Nguyên tắc thứ nhất:</strong> Mặt trận phải được xây dựng trên nền tảng liên minh
            công nhân – nông dân – trí thức và đặt dưới sự lãnh đạo của Đảng. Liên minh công – nông – trí
            là nguyên tắc cốt lõi trong chiến lược đại đoàn kết của Hồ Chí Minh, tạo cơ sở để mở rộng Mặt trận.
            Đảng Cộng sản Việt Nam vừa là thành viên, vừa là lực lượng lãnh đạo Mặt trận, lãnh đạo bằng cách
            đề ra đường lối, phương pháp cách mạng phù hợp.
          </>
        ),
      },
      {
        type: "paragraph",
        content: (
          <>
            <strong>Nguyên tắc thứ hai:</strong> Mặt trận phải hoạt động theo nguyên tắc{" "}
            <strong>hiệp thương dân chủ</strong>. Mặt trận là tổ chức rộng lớn của nhiều giai cấp,
            tầng lớp, đảng phái có những lợi ích khác nhau. Do đó, mọi vấn đề phải được đưa ra bàn bạc
            công khai, hiệp thương để đi đến nhất trí, loại trừ mọi sự áp đặt hoặc dân chủ hình thức.
          </>
        ),
      },
      {
        type: "paragraph",
        content: (
          <>
            <strong>Nguyên tắc thứ ba:</strong> Phải đoàn kết lâu dài, chặt chẽ, đoàn kết thật sự,
            chân thành, thân ái giúp đỡ nhau cùng tiến bộ. Hồ Chí Minh nhấn mạnh phương châm{" "}
            <strong>"cầu đồng tồn dị"</strong> — lấy cái chung, bỏ qua cái khác biệt nhỏ. Đoàn kết
            thật sự nghĩa là vừa đoàn kết, vừa đấu tranh, học những cái tốt của nhau và phê bình
            những cái sai trên lập trường thân ái.
          </>
        ),
      },
      {
        type: "quote",
        content:
          "Đoàn kết thật sự nghĩa là mục đích phải nhất trí và lập trường cũng phải nhất trí. Đoàn kết thật sự không phải là bình đẳng về ngôn ngữ mà là bình đẳng trên thực tế.",
        author: "Hồ Chí Minh",
      },
      {
        type: "paragraph",
        content: (
          <>
            <strong>
              Tóm lại, Mặt trận dân tộc thống nhất là hình thức tổ chức tập hợp sức mạnh toàn dân tộc,
              hoạt động trên nền tảng liên minh công – nông – trí, theo nguyên tắc hiệp thương dân chủ,
              đoàn kết thật sự và lâu dài dưới sự lãnh đạo của Đảng.
            </strong>
          </>
        ),
      },
    ],
    images: [
      "/image/Muc2-1.jpg",
      "/image/Muc2-2.jpg"
    ],
  },
  {
    year: "Mục 3",
    title: "Phương thức xây dựng khối đại đoàn kết dân tộc",
    slug: "phuong-thuc-xay-dung-dai-doan-ket",
    description:
      "Ba phương thức cụ thể để hiện thực hóa khối đại đoàn kết toàn dân tộc trong thực tiễn cách mạng.",
    richContent: [
      {
        type: "paragraph",
        content: (
          <>
            Để biến mục tiêu đại đoàn kết thành hiện thực, Hồ Chí Minh chỉ ra ba phương thức
            xây dựng cụ thể, mang tính hệ thống và gắn kết chặt chẽ với nhau từ vận động quần chúng
            đến tổ chức và quy tụ trong Mặt trận.
          </>
        ),
      },
      {
        type: "paragraph",
        content: (
          <>
            <strong>Một là, làm tốt công tác vận động quần chúng (dân vận).</strong>
            {" "}Đoàn kết, đại đoàn kết là mục tiêu, nhiệm vụ hàng đầu của Đảng. Để thực hiện mục tiêu đó,
            phải làm tốt công tác dân vận để thu hút quần chúng, tạo động lực phát triển kinh tế - xã hội.
            Cán bộ, đảng viên phải biết giáo dục, tuyên truyền, hướng dẫn và vận động nhân dân thực hiện
            mọi chủ trương, đường lối. Phương pháp tiếp cận phải phù hợp với tâm tư, nguyện vọng, trình độ
            dân trí và bản sắc của từng địa phương, đối tượng.
          </>
        ),
      },
      {
        type: "image",
        src: "/image/Muc3-2.jpg",
        alt: "Công tác dân vận, vận động quần chúng",
        caption: "Dân vận — sợi dây kết nối Đảng với nhân dân, nền tảng xây dựng khối đại đoàn kết",
      },
      {
        type: "paragraph",
        content: (
          <>
            <strong>Hai là, thành lập đoàn thể, tổ chức quần chúng phù hợp với từng đối tượng.</strong>
            {" "}Để tập hợp nhân dân hiệu quả, cần phải tổ chức các đoàn thể như Công đoàn, Hội Nông dân,
            Đoàn Thanh niên, Hội Phụ nữ phù hợp với từng giai cấp, lứa tuổi, giới tính, tôn giáo.
            Các tổ chức này có nhiệm vụ giáo dục, động viên và phát huy tính tích cực của các tầng lớp
            nhân dân, góp phần thực hiện nhiệm vụ cách mạng trong từng giai đoạn.
          </>
        ),
      },
      {
        type: "paragraph",
        content: (
          <>
            <strong>Ba là, các đoàn thể, tổ chức quần chúng được tập hợp và đoàn kết trong Mặt trận dân tộc thống nhất.</strong>
            {" "}Mặt trận dân tộc thống nhất là sợi dây gắn kết Đảng với nhân dân. Bản chất của các đoàn thể là
            tổ chức của dân, do đó vai trò của Mặt trận là vận động quần chúng tham gia vào các tổ chức này.
          </>
        ),
      },
      {
        type: "quote",
        content:
          "Phải đoàn kết tốt các đảng phái, các nhân sĩ, các dân tộc anh em và các tôn giáo để cùng nhau xây dựng Tổ quốc, tạo đời sống hòa thuận, ấm no.",
        author: "Hồ Chí Minh",
      },
      {
        type: "image",
        src: "/image/Muc3-1.jpg",
        alt: "Khối đoàn kết toàn dân tộc vững mạnh",
        caption: "Dân vận — Hồ Chí Minh luôn gần gũi nhân dân, xây dựng khối đại đoàn kết từ trái tim người lãnh tụ",
      },
      {
        type: "paragraph",
        content: (
          <>
            <strong>
              Tóm lại, ba phương thức này tạo thành một hệ thống hoàn chỉnh: dân vận thu hút quần chúng,
              đoàn thể tổ chức từng tầng lớp cụ thể, và Mặt trận quy tụ tất cả thành sức mạnh thống nhất.
              Đây chính là con đường hiện thực hóa tư tưởng đại đoàn kết của Hồ Chí Minh.
            </strong>
          </>
        ),
      },
    ],
    images: [
      "/image/Muc3-3.jpg",
      "/image/Muc3-2.jpg",
      "/image/Muc3-1.jpg",
    ],
  },
];

export default function TimelineDetail() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const event = timelineData.find((item) => item.slug === slug);
  const currentIndex = timelineData.findIndex((item) => item.slug === slug);

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!event) return;

    window.scrollTo(0, 0);
    const tl = gsap.timeline();

    tl.fromTo(
      contentRef.current?.children || [],
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" },
    );
  }, [event]);

  if (!event) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Không tìm thấy nội dung
          </h1>
          <button
            onClick={() => router.push("/")}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Quay về trang chủ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Navigation */}
      <div className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-slate-700 hover:text-red-600 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold uppercase tracking-wider text-sm">
              Quay về
            </span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Tư tưởng Hồ Chí Minh
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        <article ref={contentRef}>
          {/* Article Identity */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              <BookOpen className="w-3.5 h-3.5" />
              {event.year}
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-tight font-serif italic">
              {event.title}
            </h1>

            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed italic">
              "{event.description}"
            </p>
          </div>

          {/* Featured Image Overlay Card (Simple but Premium) */}
          <div className="relative rounded-3xl overflow-hidden mb-16 shadow-2xl aspect-[16/9] group">
            <img
              src={event.images[0]}
              alt={event.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
          </div>

          {/* Dynamic Content Sections */}
          <div className="space-y-10">
            {event.richContent.map((item, index) => {
              if (item.type === "paragraph") {
                return (
                  <p
                    key={index}
                    className="text-xl text-slate-800 leading-relaxed font-serif"
                    style={{ textAlign: "justify" }}
                  >
                    {item.content}
                  </p>
                );
              }

              if (item.type === "quote") {
                return (
                  <div
                    key={index}
                    className="py-8 px-10 bg-white border-l-8 border-red-600 rounded-2xl shadow-sm my-12 relative"
                  >
                    <Quote className="absolute -top-4 -right-4 w-12 h-12 text-red-50/50 -rotate-12" />
                    <p className="text-2xl md:text-3xl font-black text-slate-900 italic mb-4 leading-snug">
                      "{item.content}"
                    </p>
                    {item.author && (
                      <div className="flex items-center gap-3">
                        <div className="h-[2px] w-8 bg-red-600"></div>
                        <span className="text-sm font-bold uppercase tracking-widest text-red-600">
                          {item.author}
                        </span>
                      </div>
                    )}
                  </div>
                );
              }

              if (item.type === "image") {
                return (
                  <div key={index} className="my-10 rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full object-contain"
                    />
                    {item.caption && (
                      <p className="text-center text-sm text-slate-500 italic mt-3 px-4 pb-3">
                        {item.caption}
                      </p>
                    )}
                  </div>
                );
              }

              return null;
            })}
          </div>

          {/* Next/Prev Navigation */}
          <div className="mt-24 pt-12 border-t border-slate-200 flex flex-col md:flex-row gap-6">
            {currentIndex > 0 ? (
              <button
                onClick={() =>
                  router.push(
                    `/timeline/${timelineData[currentIndex - 1].slug}`,
                  )
                }
                className="flex-1 p-8 rounded-3xl bg-white border border-slate-200 hover:border-red-200 hover:shadow-xl transition-all group"
              >
                <div className="flex items-center gap-2 text-slate-400 mb-3">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span className="text-xs font-bold uppercase tracking-widest">
                    Nội dung trước
                  </span>
                </div>
                <h4 className="text-lg font-bold text-slate-800">
                  {timelineData[currentIndex - 1].title}
                </h4>
              </button>
            ) : (
              <div className="flex-1"></div>
            )}

            {currentIndex < timelineData.length - 1 ? (
              <button
                onClick={() =>
                  router.push(
                    `/timeline/${timelineData[currentIndex + 1].slug}`,
                  )
                }
                className="flex-1 p-8 rounded-3xl bg-slate-900 text-white hover:bg-red-950 hover:shadow-2xl transition-all group text-right"
              >
                <div className="flex items-center justify-end gap-2 text-slate-400 mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest">
                    Tiếp theo
                  </span>
                  <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                </div>
                <h4 className="text-lg font-bold">
                  {timelineData[currentIndex + 1].title}
                </h4>
              </button>
            ) : (
              <button
                onClick={() => router.push("/technologies")}
                className="flex-1 p-8 rounded-3xl bg-slate-900 text-white hover:bg-red-950 hover:shadow-2xl transition-all group text-right"
              >
                <div className="flex items-center justify-end gap-2 text-slate-400 mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest">
                    Tiếp theo
                  </span>
                  <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                </div>
                <h4 className="text-lg font-bold">
                  CÔNG NGHỆ SỬ DỤNG
                </h4>
              </button>
            )}
          </div>
        </article>
      </div>

      <ModelWithChat />
    </div>
  );
}
