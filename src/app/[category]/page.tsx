import { notFound } from "next/navigation";
import { CategoryButtons } from "@/components/home/CategoryButtons";
import { MasonryGrid } from "@/components/home/MasonryGrid";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { getPins } from "@/lib/data/pins";
import { getCategoryBySlug, isValidCategorySlug } from "@/lib/categories";
import { generateSEO, generateBreadcrumbJsonLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/constants";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const { CATEGORIES } = await import("@/lib/categories");
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};

  return generateSEO({
    title: `${category.name} — Best Picks & Deals`,
    description: category.description || `Discover the best ${category.name.toLowerCase()} products trending on Pinterest.`,
    path: `/${slug}`,
    keywords: `${category.name}, amazon finds, pinterest, deals`,
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;

  if (!isValidCategorySlug(slug)) notFound();

  const category = getCategoryBySlug(slug)!;
  const { pins, hasMore } = await getPins({ page: 1, categorySlug: slug });

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: category.name, url: `/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: category.name }]} className="mb-6" />
        <h1 className="text-3xl md:text-4xl font-bold mb-3">{category.name}</h1>
        {category.description && (
          <p className="text-neutral-500 dark:text-neutral-400 text-lg mb-6 max-w-2xl">
            {category.description}
          </p>
        )}
      </div>
      <CategoryButtons activeSlug={slug} />
      <section className="py-4">
        <MasonryGrid
          initialPins={pins}
          initialHasMore={hasMore}
          categorySlug={slug}
        />
      </section>
    </>
  );
}
