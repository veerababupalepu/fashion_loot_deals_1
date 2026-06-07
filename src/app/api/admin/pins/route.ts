import { NextRequest, NextResponse } from "next/server";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";
import { MOCK_PINS } from "@/lib/mock-data";
import { CATEGORIES } from "@/lib/categories";

export async function GET() {
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ pins: MOCK_PINS });
  }
  const pins = await prisma.pin.findMany({
    include: { category: true, images: true, tags: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ pins });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!isDatabaseConfigured()) {
    return NextResponse.json({ success: true, id: `mock-${Date.now()}` });
  }

  const category = await prisma.category.upsert({
    where: { slug: body.categorySlug },
    update: {},
    create: {
      name: CATEGORIES.find((c) => c.slug === body.categorySlug)?.name || body.categorySlug,
      slug: body.categorySlug,
    },
  });

  const tagConnections = [];
  for (const tagName of body.tags || []) {
    const tag = await prisma.tag.upsert({
      where: { slug: tagName.toLowerCase().replace(/\s+/g, "-") },
      update: {},
      create: { name: tagName, slug: tagName.toLowerCase().replace(/\s+/g, "-") },
    });
    tagConnections.push({ id: tag.id });
  }

  const pin = await prisma.pin.create({
    data: {
      title: body.title,
      slug: body.slug,
      seoTitle: body.seoTitle,
      shortDescription: body.shortDescription,
      fullDescription: body.fullDescription,
      pinterestTitle: body.pinterestTitle,
      pinterestDescription: body.pinterestDescription,
      metaDescription: body.metaDescription,
      seoKeywords: body.seoKeywords,
      hashtags: body.hashtags,
      affiliateLink: body.affiliateLink,
      price: body.price,
      originalPrice: body.originalPrice,
      features: body.features,
      pros: body.pros,
      cons: body.cons,
      status: body.status,
      isTrending: body.isTrending,
      isDeal: body.isDeal,
      categoryId: category.id,
      tags: { connect: tagConnections },
      images: {
        create: (body.images || []).map((url: string, i: number) => ({
          url,
          sortOrder: i,
        })),
      },
    },
  });

  return NextResponse.json({ success: true, id: pin.id });
}
