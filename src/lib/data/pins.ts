import type { Pin } from "@/types";
import { PINS_PER_PAGE } from "@/lib/constants";
import { MOCK_PINS } from "@/lib/mock-data";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";

function mapPrismaPin(pin: Awaited<ReturnType<typeof fetchPinFromDb>>): Pin | null {
  if (!pin) return null;
  return {
    id: pin.id,
    title: pin.title,
    slug: pin.slug,
    seoTitle: pin.seoTitle ?? undefined,
    shortDescription: pin.shortDescription,
    fullDescription: pin.fullDescription,
    pinterestTitle: pin.pinterestTitle ?? undefined,
    pinterestDescription: pin.pinterestDescription ?? undefined,
    metaDescription: pin.metaDescription ?? undefined,
    seoKeywords: pin.seoKeywords ?? undefined,
    hashtags: pin.hashtags ?? undefined,
    affiliateLink: pin.affiliateLink,
    price: pin.price ?? undefined,
    originalPrice: pin.originalPrice ?? undefined,
    features: pin.features,
    pros: pin.pros,
    cons: pin.cons,
    status: pin.status,
    isTrending: pin.isTrending,
    isDeal: pin.isDeal,
    views: pin.views,
    likes: pin.likes,
    saves: pin.saves,
    amazonClicks: pin.amazonClicks,
    pinterestClicks: pin.pinterestClicks,
    category: {
      id: pin.category.id,
      name: pin.category.name,
      slug: pin.category.slug as Pin["category"]["slug"],
      description: pin.category.description ?? undefined,
    },
    images: pin.images.map((img) => ({
      id: img.id,
      url: img.url,
      alt: img.alt ?? undefined,
      sortOrder: img.sortOrder,
    })),
    tags: pin.tags.map((t) => ({ id: t.id, name: t.name, slug: t.slug })),
    createdAt: pin.createdAt.toISOString(),
    updatedAt: pin.updatedAt.toISOString(),
  };
}

async function fetchPinFromDb(slug: string) {
  return prisma.pin.findUnique({
    where: { slug },
    include: {
      category: true,
      images: { orderBy: { sortOrder: "asc" } },
      tags: true,
    },
  });
}

export async function getPins(options: {
  page?: number;
  limit?: number;
  categorySlug?: string;
  search?: string;
  trending?: boolean;
  deals?: boolean;
  sortBy?: "newest" | "popular" | "saves";
} = {}): Promise<{ pins: Pin[]; total: number; hasMore: boolean }> {
  const { page = 1, limit = PINS_PER_PAGE, categorySlug, search, trending, deals, sortBy = "newest" } = options;

  if (!isDatabaseConfigured()) {
    let filtered = MOCK_PINS.filter((p) => p.status === "PUBLISHED");
    if (categorySlug) filtered = filtered.filter((p) => p.category.slug === categorySlug);
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.tags.some((t) => t.name.toLowerCase().includes(q))
      );
    }
    if (trending) filtered = filtered.filter((p) => p.isTrending);
    if (deals) filtered = filtered.filter((p) => p.isDeal);
    if (sortBy === "popular") filtered.sort((a, b) => b.views - a.views);
    else if (sortBy === "saves") filtered.sort((a, b) => b.saves - a.saves);
    else filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const start = (page - 1) * limit;
    const pins = filtered.slice(start, start + limit);
    return { pins, total: filtered.length, hasMore: start + limit < filtered.length };
  }

  const where = {
    status: "PUBLISHED" as const,
    ...(categorySlug && { category: { slug: categorySlug } }),
    ...(trending && { isTrending: true }),
    ...(deals && { isDeal: true }),
    ...(search && {
      OR: [
        { title: { contains: search, mode: "insensitive" as const } },
        { shortDescription: { contains: search, mode: "insensitive" as const } },
      ],
    }),
  };

  const orderBy =
    sortBy === "popular" ? { views: "desc" as const } :
    sortBy === "saves" ? { saves: "desc" as const } :
    { createdAt: "desc" as const };

  const [rawPins, total] = await Promise.all([
    prisma.pin.findMany({
      where,
      include: { category: true, images: { orderBy: { sortOrder: "asc" } }, tags: true },
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.pin.count({ where }),
  ]);

  const pins = rawPins.map((p) => mapPrismaPin(p)!).filter(Boolean);
  return { pins, total, hasMore: page * limit < total };
}

export async function getPinBySlug(slug: string): Promise<Pin | null> {
  if (!isDatabaseConfigured()) {
    return MOCK_PINS.find((p) => p.slug === slug && p.status === "PUBLISHED") ?? null;
  }
  const pin = await fetchPinFromDb(slug);
  return mapPrismaPin(pin);
}

export async function getRelatedPins(pin: Pin, limit = 4): Promise<Pin[]> {
  const { pins } = await getPins({ categorySlug: pin.category.slug, limit: limit + 1 });
  return pins.filter((p) => p.id !== pin.id).slice(0, limit);
}

export async function getTrendingPins(limit = 6): Promise<Pin[]> {
  const { pins } = await getPins({ trending: true, limit, sortBy: "popular" });
  return pins;
}

export async function getMostSavedPins(limit = 6): Promise<Pin[]> {
  const { pins } = await getPins({ limit, sortBy: "saves" });
  return pins;
}

export async function getTodaysDeals(limit = 6): Promise<Pin[]> {
  const { pins } = await getPins({ deals: true, limit, sortBy: "newest" });
  return pins;
}
