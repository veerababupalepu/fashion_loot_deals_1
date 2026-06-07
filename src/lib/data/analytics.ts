import type { AnalyticsData } from "@/types";
import { MOCK_PINS } from "@/lib/mock-data";
import { CATEGORIES } from "@/lib/categories";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";

export async function getAnalytics(): Promise<AnalyticsData> {
  if (!isDatabaseConfigured()) {
    const totalClicks = MOCK_PINS.reduce(
      (sum, p) => sum + p.amazonClicks + p.pinterestClicks,
      0
    );
    const amazonClicks = MOCK_PINS.reduce((sum, p) => sum + p.amazonClicks, 0);
    const pinterestClicks = MOCK_PINS.reduce((sum, p) => sum + p.pinterestClicks, 0);

    const categoryCounts = CATEGORIES.map((cat) => ({
      name: cat.name,
      count: MOCK_PINS.filter((p) => p.category.slug === cat.slug).length,
    }))
      .filter((c) => c.count > 0)
      .sort((a, b) => b.count - a.count);

    return {
      totalPins: MOCK_PINS.length,
      totalClicks,
      pinterestClicks,
      amazonClicks,
      topCategories: categoryCounts,
    };
  }

  const [totalPins, clicks, categoryGroups] = await Promise.all([
    prisma.pin.count(),
    prisma.click.groupBy({ by: ["type"], _count: true }),
    prisma.pin.groupBy({ by: ["categoryId"], _count: true }),
  ]);

  const categories = await prisma.category.findMany();
  const categoryMap = Object.fromEntries(categories.map((c) => [c.id, c.name]));

  const clickMap = Object.fromEntries(clicks.map((c) => [c.type, c._count]));
  const amazonClicks = clickMap["AMAZON"] ?? 0;
  const pinterestClicks = clickMap["PINTEREST"] ?? 0;

  return {
    totalPins,
    totalClicks: amazonClicks + pinterestClicks,
    pinterestClicks,
    amazonClicks,
    topCategories: categoryGroups
      .map((g) => ({ name: categoryMap[g.categoryId] || "Unknown", count: g._count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5),
  };
}

export async function trackClick(type: "AMAZON" | "PINTEREST" | "SHARE" | "VIEW", pinId?: string, source?: string) {
  if (!isDatabaseConfigured()) return;

  await prisma.click.create({
    data: { type, pinId, source },
  });

  if (pinId) {
    const field =
      type === "AMAZON" ? "amazonClicks" :
      type === "PINTEREST" ? "pinterestClicks" :
      type === "VIEW" ? "views" : null;

    if (field) {
      await prisma.pin.update({
        where: { id: pinId },
        data: { [field]: { increment: 1 } },
      });
    }
  }
}
