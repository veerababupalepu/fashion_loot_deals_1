"use client";

import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Masonry from "react-masonry-css";
import type { Pin } from "@/types";
import { PinCard } from "@/components/pins/PinCard";
import { MasonryGridSkeleton } from "@/components/ui/Skeleton";

interface MasonryGridProps {
  initialPins: Pin[];
  initialHasMore: boolean;
  categorySlug?: string;
  search?: string;
  apiEndpoint?: string;
}

const breakpointColumns = {
  default: 4,
  1280: 4,
  1024: 3,
  640: 2,
};

export function MasonryGrid({
  initialPins,
  initialHasMore,
  categorySlug,
  search,
  apiEndpoint = "/api/pins",
}: MasonryGridProps) {
  const [pins, setPins] = useState(initialPins);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView({ threshold: 0, rootMargin: "200px" });

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const nextPage = page + 1;
    const params = new URLSearchParams({ page: String(nextPage) });
    if (categorySlug) params.set("category", categorySlug);
    if (search) params.set("search", search);

    try {
      const res = await fetch(`${apiEndpoint}?${params}`);
      const data = await res.json();
      setPins((prev) => [...prev, ...data.pins]);
      setHasMore(data.hasMore);
      setPage(nextPage);
    } catch {
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page, categorySlug, search, apiEndpoint]);

  useEffect(() => {
    if (inView) loadMore();
  }, [inView, loadMore]);

  if (pins.length === 0) {
    return (
      <div className="text-center py-16 text-neutral-500">
        <p className="text-lg">No products found.</p>
        <p className="text-sm mt-2">Try a different search or category.</p>
      </div>
    );
  }

  return (
    <div className="px-4 max-w-7xl mx-auto">
      <Masonry
        breakpointCols={breakpointColumns}
        className="flex -ml-4 w-auto"
        columnClassName="pl-4 bg-clip-padding"
      >
        {pins.map((pin, i) => (
          <PinCard key={pin.id} pin={pin} index={i} />
        ))}
      </Masonry>

      <div ref={ref} className="py-8">
        {loading && <MasonryGridSkeleton count={4} />}
        {!hasMore && pins.length > 0 && (
          <p className="text-center text-sm text-neutral-400">You&apos;ve seen it all!</p>
        )}
      </div>
    </div>
  );
}
