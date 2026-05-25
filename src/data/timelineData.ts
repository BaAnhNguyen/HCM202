export interface TimelineItem {
  year: string;
  title: string;
  slug: string;
  description: string;
}

export const timelineData: TimelineItem[] = [
  {
    year: "Mục 1",
    title: "Điều kiện xây dựng khối đại đoàn kết toàn dân tộc",
    slug: "dieu-kien-xay-dung-dai-doan-ket",
    description: "Hồ Chí Minh chỉ rõ bốn điều kiện cốt lõi để quy tụ và đoàn kết mọi giai cấp, tầng lớp vào khối đại đoàn kết toàn dân tộc.",
  },
  {
    year: "Mục 2",
    title: "Mặt trận dân tộc thống nhất",
    slug: "mat-tran-dan-toc-thong-nhat",
    description: "Hình thức tổ chức của khối đại đoàn kết toàn dân tộc — nơi quy tụ mọi tổ chức và cá nhân yêu nước Việt Nam.",
  },
  {
    year: "Mục 3",
    title: "Phương thức xây dựng khối đại đoàn kết dân tộc",
    slug: "phuong-thuc-xay-dung-dai-doan-ket",
    description: "Ba phương thức cụ thể để hiện thực hóa khối đại đoàn kết toàn dân tộc trong thực tiễn cách mạng.",
  },
];
