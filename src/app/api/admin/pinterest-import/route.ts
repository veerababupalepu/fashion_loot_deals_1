import { NextRequest, NextResponse } from "next/server";
import { fetchPinterestPin } from "@/lib/pinterest-import";

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();
    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "Pinterest URL is required." }, { status: 400 });
    }

    const data = await fetchPinterestPin(url);
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to import Pinterest pin.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
