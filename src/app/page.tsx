import { Hero } from "@/components/home/Hero";
import { CategoryButtons } from "@/components/home/CategoryButtons";
import { MasonryGrid } from "@/components/home/MasonryGrid";
import { SectionHeader } from "@/components/home/SectionHeader";
import { PinCarousel } from "@/components/home/PinCarousel";
import { NewsletterSection } from "@/components/layout/NewsletterSection";
import {
  getPins,
  getTrendingPins,
  getMostSavedPins,
  getTodaysDeals,
} from "@/lib/data/pins";
import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({
  title: "PinDealsHub — Discover Trending Products & Lifestyle Ideas",
  description:
    "Discover trending Amazon finds, fashion picks, home decor ideas, and lifestyle products curated for Pinterest lovers. Shop the best deals today.",
  path: "/",
  keywords: "pinterest finds, amazon deals, fashion, home decor, lifestyle products",
});

export default async function HomePage() {
  const [
    { pins, hasMore },
    trending,
    mostSaved,
    todaysDeals,
  ] = await Promise.all([
    getPins({ page: 1 }),
    getTrendingPins(8),
    getMostSavedPins(8),
    getTodaysDeals(8),
  ]);

  return (
    <>
      <Hero />
      <CategoryButtons />

      <section className="py-8">
        <SectionHeader
          title="Trending Now"
          subtitle="What's hot on Pinterest this week"
          href="/?sort=popular"
        />
        <PinCarousel pins={trending} />
      </section>

      <section className="py-8">
        <SectionHeader
          title="Most Saved"
          subtitle="Pins our community loves most"
        />
        <PinCarousel pins={mostSaved} />
      </section>

      {todaysDeals.length > 0 && (
        <section className="py-8">
          <SectionHeader
            title="Today's Deals"
            subtitle="Limited-time Amazon deals"
          />
          <PinCarousel pins={todaysDeals} />
        </section>
      )}

      <section className="py-8">
        <SectionHeader title="Explore All Pins" subtitle="Fresh picks updated daily" />
        <MasonryGrid initialPins={pins} initialHasMore={hasMore} />
      </section>

      <NewsletterSection />
    </>
  );
}
