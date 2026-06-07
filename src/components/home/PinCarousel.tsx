"use client";

import type { Pin } from "@/types";
import { PinCard } from "@/components/pins/PinCard";

interface PinCarouselProps {
  pins: Pin[];
}

export function PinCarousel({ pins }: PinCarouselProps) {
  if (pins.length === 0) return null;

  return (
    <div className="overflow-x-auto pb-4 px-4 scrollbar-hide">
      <div className="flex gap-4" style={{ width: "max-content" }}>
        {pins.map((pin, i) => (
          <div key={pin.id} className="w-64 shrink-0">
            <PinCard pin={pin} index={i} />
          </div>
        ))}
      </div>
    </div>
  );
}
