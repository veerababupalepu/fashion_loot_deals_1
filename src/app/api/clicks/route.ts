import { NextRequest, NextResponse } from "next/server";
import { trackClick } from "@/lib/data/analytics";

export async function POST(request: NextRequest) {
  try {
    const { type, pinId, source } = await request.json();
    if (!["AMAZON", "PINTEREST", "SHARE", "VIEW"].includes(type)) {
      return NextResponse.json({ error: "Invalid click type" }, { status: 400 });
    }
    await trackClick(type, pinId, source);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: true });
  }
}
