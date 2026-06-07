"use client";

import { useState } from "react";
import type { Pin } from "@/types";
import { SITE_URL } from "@/lib/constants";
import { trackEvent } from "@/components/providers/AnalyticsProvider";

interface PinterestButtonProps {
  pin: Pin;
  size?: "sm" | "md";
  className?: string;
}

export function PinterestButton({ pin, size = "md", className = "" }: PinterestButtonProps) {
  const [loading, setLoading] = useState(false);
  const image = pin.images[0]?.url || "";
  const description = pin.pinterestDescription || pin.shortDescription;
  const title = pin.pinterestTitle || pin.title;
  const url = `${SITE_URL}/pin/${pin.slug}`;

  const handlePin = async () => {
    setLoading(true);
    try {
      await fetch("/api/clicks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "PINTEREST", pinId: pin.id }),
      });
      trackEvent("pinterest_click", { pin_id: pin.id, pin_title: pin.title });
    } catch {
      // continue to Pinterest
    }

    const pinUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(image)}&description=${encodeURIComponent(description)}`;
    window.open(pinUrl, "_blank", "noopener,noreferrer,width=750,height=550");
    setLoading(false);
  };

  return (
    <button
      onClick={handlePin}
      disabled={loading}
      aria-label="Save to Pinterest"
      className={`inline-flex items-center gap-1.5 font-medium transition-all ${
        size === "sm" ? "px-3 py-1.5 text-xs rounded-full" : "px-4 py-2 text-sm rounded-full"
      } bg-[#E60023] text-white hover:bg-[#c5001e] disabled:opacity-70 ${className}`}
    >
      <svg viewBox="0 0 24 24" className={size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"} fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
      </svg>
      {loading ? "Saving..." : "Save"}
    </button>
  );
}
