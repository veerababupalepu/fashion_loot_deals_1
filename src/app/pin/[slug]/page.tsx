import { notFound } from "next/navigation";
import { PinDetail } from "@/components/pins/PinDetail";
import { getPinBySlug, getRelatedPins } from "@/lib/data/pins";
import { generateSEO, generatePinJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo";

interface PinPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PinPageProps) {
  const { slug } = await params;
  const pin = await getPinBySlug(slug);
  if (!pin) return {};

  return generateSEO({
    title: pin.seoTitle || pin.title,
    description: pin.metaDescription || pin.shortDescription,
    path: `/pin/${slug}`,
    image: pin.images[0]?.url,
    type: "article",
    keywords: pin.seoKeywords,
  });
}

export default async function PinPage({ params }: PinPageProps) {
  const { slug } = await params;
  const pin = await getPinBySlug(slug);
  if (!pin) notFound();

  const relatedPins = await getRelatedPins(pin);

  const pinJsonLd = generatePinJsonLd(pin);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: pin.category.name, url: `/${pin.category.slug}` },
    { name: pin.title, url: `/pin/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pinJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PinDetail pin={pin} relatedPins={relatedPins} />
    </>
  );
}
