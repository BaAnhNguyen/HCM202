import { NextRequest, NextResponse } from "next/server";

const DEFAULT_MODEL = "gemini-1.5-flash";

interface GeminiPart {
  text?: string;
}

interface GeminiCandidate {
  content?: {
    parts?: GeminiPart[];
  };
}

interface GeminiResponse {
  candidates?: GeminiCandidate[];
  error?: {
    message?: string;
  };
}

const buildSystemInstruction = () =>
  [
    "Bạn là trợ lý AI tiếng Việt cho website học tập về tư tưởng Hồ Chí Minh.",
    "Ưu tiên trả lời NGẮN, CHUẨN Ý, không lan man.",
    "Mỗi câu trả lời tối đa 5 dòng ngắn; dùng gạch đầu dòng khi liệt kê.",
    "Khi liệt kê, mỗi ý phải nằm trên một dòng riêng và bắt đầu bằng '- '.",
    "Không bịa thông tin. Nếu không chắc, nói rõ ngắn gọn là chưa đủ dữ kiện.",
    "Không lặp lại nguyên văn đề bài. Trả lời trực tiếp vào nội dung người dùng hỏi.",
  ].join(" ");

const extractReply = (data: GeminiResponse): string => {
  return (
    data?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || "")
      .join("\n")
      .trim() || ""
  );
};

const isLowQualityReply = (question: string, reply: string): boolean => {
  const q = question.trim().toLowerCase();
  const r = reply.trim().toLowerCase();

  if (!r) return true;
  if (r.length < 32) return true;

  const shortQPrefix = q.slice(0, Math.min(36, q.length));
  const looksLikeEcho =
    (shortQPrefix.length > 12 && r.includes(shortQPrefix)) ||
    (r.length < q.length && q.includes(r));

  const endsAbruptly = !/[.!?…]$/.test(r) && !r.includes("\n-");
  return looksLikeEcho || endsAbruptly;
};

const callGemini = async (
  apiKey: string,
  model: string,
  prompt: string,
  maxOutputTokens = 320
) => {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [
            {
              text: buildSystemInstruction(),
            },
          ],
        },
        generationConfig: {
          temperature: 0.2,
          topP: 0.8,
          maxOutputTokens,
        },
        contents: [
          {
            role: "user",
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    }
  );

  const data: GeminiResponse = await response.json();
  return { response, data };
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const chatInput =
      typeof body?.chatInput === "string" ? body.chatInput.trim() : "";

    if (!chatInput) {
      return NextResponse.json(
        { error: "Nội dung câu hỏi đang trống." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const model = process.env.GEMINI_MODEL || DEFAULT_MODEL;

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "Thiếu GEMINI_API_KEY. Hãy thêm key vào file .env.local và khởi động lại server.",
        },
        { status: 500 }
      );
    }

    const firstTry = await callGemini(apiKey, model, chatInput, 320);

    if (!firstTry.response.ok) {
      const message =
        firstTry.data?.error?.message || "Gemini API trả về lỗi không xác định.";
      return NextResponse.json({ error: message }, { status: firstTry.response.status });
    }

    let reply = extractReply(firstTry.data);

    if (isLowQualityReply(chatInput, reply)) {
      const retryPrompt = [
        "Câu trả lời trước chưa đầy đủ hoặc bị cụt.",
        "Hãy trả lời lại trực tiếp, đầy đủ ý chính và ngắn gọn.",
        `Câu hỏi: ${chatInput}`,
      ].join("\n");

      const secondTry = await callGemini(apiKey, model, retryPrompt, 360);
      if (secondTry.response.ok) {
        const refinedReply = extractReply(secondTry.data);
        if (refinedReply) {
          reply = refinedReply;
        }
      }
    }

    if (!reply) {
      reply = "Xin lỗi, tôi chưa tạo được câu trả lời phù hợp.";
    }

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { error: "Lỗi hệ thống khi gọi Gemini." },
      { status: 500 }
    );
  }
}
