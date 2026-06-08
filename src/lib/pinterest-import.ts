import type { PinterestImportResult } from "@/types";

const PINTEREST_HOSTS = ["pinterest.com", "www.pinterest.com", "pin.it", "pinterest.co.uk", "in.pinterest.com"];

export function isPinterestUrl(input: string): boolean {
  try {
    const { hostname } = new URL(input.trim());
    return PINTEREST_HOSTS.some((host) => hostname === host || hostname.endsWith(`.${host}`));
  } catch {
    return false;
  }
}

async function resolvePinterestUrl(input: string): Promise<string> {
  const trimmed = input.trim();
  const response = await fetch(trimmed, {
    method: "HEAD",
    redirect: "follow",
    headers: { "User-Agent": "PinDealsHub/1.0" },
  });
  return response.url || trimmed;
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'");
}

function stripHtml(text: string): string {
  return decodeHtmlEntities(text.replace(/<[^>]+>/g, "").trim());
}

function upgradePinterestImageUrl(url: string): string {
  return url.replace(/\/\d+x\d*\//, "/736x/");
}

function extractMetaContent(html: string, property: string): string | null {
  const patterns = [
    new RegExp(`<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']+)["']`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${property}["']`, "i"),
    new RegExp(`<meta[^>]+name=["']${property}["'][^>]+content=["']([^"']+)["']`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${property}["']`, "i"),
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return decodeHtmlEntities(match[1]);
  }
  return null;
}

async function fetchOEmbed(pinUrl: string) {
  const endpoint = `https://www.pinterest.com/oembed.json?url=${encodeURIComponent(pinUrl)}`;
  const response = await fetch(endpoint, {
    headers: { "User-Agent": "PinDealsHub/1.0" },
    next: { revalidate: 0 },
  });
  if (!response.ok) return null;

  const data = (await response.json()) as {
    title?: string;
    thumbnail_url?: string;
    author_name?: string;
  };

  if (!data.title && !data.thumbnail_url) return null;
  return data;
}

async function fetchOpenGraph(pinUrl: string) {
  const response = await fetch(pinUrl, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; PinDealsHub/1.0; +https://pindealshub.com)",
      Accept: "text/html",
    },
    next: { revalidate: 0 },
  });
  if (!response.ok) return null;

  const html = await response.text();
  return {
    title: extractMetaContent(html, "og:title") || extractMetaContent(html, "twitter:title"),
    description:
      extractMetaContent(html, "og:description") || extractMetaContent(html, "description"),
    image: extractMetaContent(html, "og:image") || extractMetaContent(html, "twitter:image"),
  };
}

export async function fetchPinterestPin(inputUrl: string): Promise<PinterestImportResult> {
  if (!isPinterestUrl(inputUrl)) {
    throw new Error("Please enter a valid Pinterest pin URL (pinterest.com or pin.it).");
  }

  const resolvedUrl = await resolvePinterestUrl(inputUrl);
  const [oembed, openGraph] = await Promise.all([
    fetchOEmbed(resolvedUrl),
    fetchOpenGraph(resolvedUrl),
  ]);

  const title = stripHtml(oembed?.title || openGraph?.title || "Imported Pinterest Pin");
  const description = stripHtml(openGraph?.description || title);
  const imageUrl = upgradePinterestImageUrl(oembed?.thumbnail_url || openGraph?.image || "");

  if (!imageUrl) {
    throw new Error("Could not find an image for this Pinterest pin. Try a direct pin URL.");
  }

  return {
    title,
    description,
    imageUrl,
    sourceUrl: resolvedUrl,
    pinterestTitle: title,
    pinterestDescription: description,
  };
}
