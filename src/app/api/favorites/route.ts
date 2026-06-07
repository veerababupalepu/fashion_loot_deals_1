import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const pinIds = request.nextUrl.searchParams.get("ids")?.split(",").filter(Boolean) || [];
  if (pinIds.length === 0) return NextResponse.json({ pins: [] });

  const { getPins } = await import("@/lib/data/pins");
  const { pins: allPins } = await getPins({ limit: 100 });
  const pins = allPins.filter((p) => pinIds.includes(p.id));
  return NextResponse.json({ pins });
}
