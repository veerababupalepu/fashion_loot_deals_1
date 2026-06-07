import { MasonryGrid } from "@/components/home/MasonryGrid";
import { SearchBar } from "@/components/ui/SearchBar";
import { getPins } from "@/lib/data/pins";
import { generateSEO } from "@/lib/seo";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export const metadata = generateSEO({
  title: "Search Products",
  description: "Search trending products, deals, and lifestyle ideas on PinDealsHub.",
  path: "/search",
});

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const { pins, hasMore } = await getPins({ page: 1, search: q });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {q ? `Results for "${q}"` : "Search Products"}
      </h1>
      <SearchBar defaultValue={q} className="max-w-xl mb-8" />
      <MasonryGrid
        initialPins={pins}
        initialHasMore={hasMore}
        search={q}
      />
    </div>
  );
}
