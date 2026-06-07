import type { AISEOResult } from "@/types";

export function generateAISEO(title: string, category?: string): AISEOResult {
  const cleanTitle = title.trim();
  const categoryTag = category ? category.toLowerCase().replace(/\s+/g, "") : "lifestyle";

  const pinterestTitle = `${cleanTitle} ✨ | Must-Have ${category || "Find"}`;
  const pinterestDescription = `Discover ${cleanTitle.toLowerCase()} — the ${category || "product"} everyone's saving on Pinterest! Tap to shop. #${categoryTag} #amazonfinds #pinterestfinds`;
  const seoKeywords = [
    cleanTitle.toLowerCase(),
    category?.toLowerCase() || "lifestyle",
    "amazon finds",
    "best deals",
    "pinterest inspired",
    `${category?.toLowerCase() || "product"} review`,
  ].join(", ");

  const metaDescription = `Shop ${cleanTitle} — curated ${category || "lifestyle"} pick with honest review, pros & cons, and best price. Save to Pinterest & buy on Amazon.`;

  const hashtags = [
    `#${categoryTag}`,
    "#amazonfinds",
    "#pinterestfinds",
    "#musthave",
    "#trending",
    `#${cleanTitle.split(" ").slice(0, 2).join("").toLowerCase()}`,
  ].join(" ");

  return {
    pinterestTitle: pinterestTitle.slice(0, 100),
    pinterestDescription: pinterestDescription.slice(0, 500),
    seoKeywords,
    metaDescription: metaDescription.slice(0, 160),
    hashtags,
  };
}
