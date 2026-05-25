/**
 * Chuyển đổi tiếng Việt có dấu thành không dấu và chuẩn hóa để tìm kiếm
 */
export const normalizeVietnamese = (str: string): string => {
  if (!str) return "";
  
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Loại bỏ các dấu
    .replace(/[đĐ]/g, "d") // Chuyển đ thành d
    .replace(/[^a-z0-9\s]/g, "") // Loại bỏ ký tự đặc biệt
    .replace(/\s+/g, " ") // Thu gọn khoảng trắng
    .trim();
};

/**
 * Kiểm tra xem một đoạn văn có chứa từ khóa hay không (không phân biệt dấu)
 */
export const containsKeyword = (text: string, keyword: string): boolean => {
  const normalizedText = normalizeVietnamese(text);
  const normalizedKeyword = normalizeVietnamese(keyword);
  return normalizedText.includes(normalizedKeyword);
};
