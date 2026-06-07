"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Eye, ExternalLink, Bookmark } from "lucide-react";
import type { Pin } from "@/types";
import { formatNumber, formatPrice, getDiscountPercent } from "@/lib/utils";
import { PinterestButton } from "./PinterestButton";
import { LikeButton } from "./LikeButton";
import { trackEvent } from "@/components/providers/AnalyticsProvider";

interface PinCardProps {
  pin: Pin;
  index?: number;
}

export function PinCard({ pin, index = 0 }: PinCardProps) {
  const image = pin.images[0];
  const discount =
    pin.price && pin.originalPrice
      ? getDiscountPercent(pin.originalPrice, pin.price)
      : null;

  const handleAmazonClick = async () => {
    try {
      await fetch("/api/clicks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "AMAZON", pinId: pin.id }),
      });
      trackEvent("amazon_click", { pin_id: pin.id, pin_title: pin.title });
    } catch {
      // continue
    }
    window.open(pin.affiliateLink, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group break-inside-avoid mb-4"
    >
      <div className="rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <Link href={`/pin/${pin.slug}`} className="block relative">
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src={image?.url || "/placeholder.jpg"}
              alt={image?.alt || pin.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            {discount && (
              <span className="absolute top-3 left-3 px-2 py-1 bg-rose-600 text-white text-xs font-bold rounded-full">
                -{discount}%
              </span>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <PinterestButton pin={pin} size="sm" />
            </div>
          </div>
        </Link>

        <div className="p-4">
          <Link href={`/${pin.category.slug}`}>
            <span className="text-xs font-medium text-rose-600 uppercase tracking-wide">
              {pin.category.name}
            </span>
          </Link>
          <Link href={`/pin/${pin.slug}`}>
            <h3 className="font-semibold text-neutral-900 dark:text-white mt-1 mb-2 line-clamp-2 hover:text-rose-600 transition-colors">
              {pin.seoTitle || pin.title}
            </h3>
          </Link>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2 mb-3">
            {pin.shortDescription}
          </p>

          {pin.price && (
            <div className="flex items-center gap-2 mb-3">
              <span className="font-bold text-neutral-900 dark:text-white">
                {formatPrice(pin.price)}
              </span>
              {pin.originalPrice && (
                <span className="text-sm text-neutral-400 line-through">
                  {formatPrice(pin.originalPrice)}
                </span>
              )}
            </div>
          )}

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <LikeButton pinId={pin.id} initialLikes={pin.likes} size="sm" />
              <span className="flex items-center gap-1 text-xs text-neutral-400">
                <Eye className="w-3.5 h-3.5" />
                {formatNumber(pin.views)}
              </span>
              <span className="flex items-center gap-1 text-xs text-neutral-400">
                <Bookmark className="w-3.5 h-3.5" />
                {formatNumber(pin.saves)}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleAmazonClick}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-full bg-amber-500 text-white hover:bg-amber-600 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Buy on Amazon
            </button>
            <Link
              href={`/pin/${pin.slug}`}
              className="inline-flex items-center justify-center gap-1 px-3 py-2 text-xs font-medium rounded-full border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
            >
              Read More
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
