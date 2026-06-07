import { NextRequest, NextResponse } from "next/server";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";
import { CATEGORIES } from "@/lib/categories";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  if (!isDatabaseConfigured()) {
    return NextResponse.json({ success: true });
  }

  const category = await prisma.category.upsert({
    where: { slug: body.categorySlug },
    update: {},
    create: {
      name: CATEGORIES.find((c) => c.slug === body.categorySlug)?.name || body.categorySlug,
      slug: body.categorySlug,
    },
  });

  await prisma.pinImage.deleteMany({ where: { pinId: id } });

  const tagConnections = [];
  for (const tagName of body.tags || []) {
    const tag = await prisma.tag.upsert({
      where: { slug: tagName.toLowerCase().replace(/\s+/g, "-") },
      update: {},
      create: { name: tagName, slug: tagName.toLowerCase().replace(/\s+/g, "-") },
    });
    tagConnections.push({ id: tag.id });
  }

  await prisma.pin.update({
    where: { id },
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
      tags: { set: tagConnections },
      images: {
        create: (body.images || []).map((url: string, i: number) => ({
          url,
          sortOrder: i,
        })),
      },
    },
  });

  return NextResponse.json({ success: true });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!isDatabaseConfigured()) {
    return NextResponse.json({ success: true });
  }

  await prisma.pin.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
