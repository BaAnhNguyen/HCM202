import { NextResponse } from "next/server";

export function GET(_req: Request, { params }: { params: { rest: string[] } }) {
  const path = params.rest?.join("/") || "";

  // Redirect known missing path to actual PDF in public/slide
  if (path === "presentation.pdf") {
    return NextResponse.redirect('/slide/thuyettrinh.pdf');
  }

  // For any other slides/* requests, return 404
  return new NextResponse('Not found', { status: 404 });
}
