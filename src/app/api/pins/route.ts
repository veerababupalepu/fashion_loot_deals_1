import { NextRequest, NextResponse } from "next/server";
import { getPins } from "@/lib/data/pins";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const page = parseInt(searchParams.get("page") || "1");
  const category = searchParams.get("category") || undefined;
  const search = searchParams.get("search") || undefined;
  const trending = searchParams.get("trending") === "true";
  const deals = searchParams.get("deals") === "true";
  const sortBy = (searchParams.get("sortBy") as "newest" | "popular" | "saves") || "newest";

  const result = await getPins({ page, categorySlug: category, search, trending, deals, sortBy });
  return NextResponse.json(result);
}
