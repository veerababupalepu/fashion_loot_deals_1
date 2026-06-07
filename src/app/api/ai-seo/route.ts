import { NextRequest, NextResponse } from "next/server";
import { generateAISEO } from "@/lib/ai-seo";

export async function POST(request: NextRequest) {
  const { title, category } = await request.json();
  if (!title) {
    return NextResponse.json({ error: "Title required" }, { status: 400 });
  }

  const result = generateAISEO(title, category);
  return NextResponse.json(result);
}
