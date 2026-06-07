"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ExternalLink, Minus, Plus, Star } from "lucide-react";
import type { Pin } from "@/types";
import { formatPrice, getDiscountPercent } from "@/lib/utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { ShareButtons } from "./ShareButtons";
import { LikeButton } from "./LikeButton";
import { PinCard } from "./PinCard";
import { trackEvent } from "@/components/providers/AnalyticsProvider";

interface PinDetailProps {
  pin: Pin;
  relatedPins: Pin[];
}

export function PinDetail({ pin, relatedPins }: PinDetailProps) {
  const [activeImage, setActiveImage] = useState(0);
  const discount =
    pin.price && pin.originalPrice
      ? getDiscountPercent(pin.originalPrice, pin.price)
      : null;

  const handleBuyClick = async () => {
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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: pin.category.name, href: `/${pin.category.slug}` },
          { label: pin.title },
        ]}
        className="mb-6"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg mb-4">
            <Image
              src={pin.images[activeImage]?.url || pin.images[0]?.url}
              alt={pin.images[activeImage]?.alt || pin.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            {discount && (
              <span className="absolute top-4 left-4 px-3 py-1.5 bg-rose-600 text-white text-sm font-bold rounded-full">
                {discount}% OFF
              </span>
            )}
          </div>
          {pin.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {pin.images.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImage(i)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-colors ${
                    activeImage === i ? "border-rose-500" : "border-transparent"
                  }`}
                >
                  <Image src={img.url} alt={img.alt || ""} fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div>
            <Link href={`/${pin.category.slug}`} className="text-sm font-medium text-rose-600 uppercase tracking-wide">
              {pin.category.name}
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mt-2 mb-4">
              {pin.seoTitle || pin.title}
            </h1>
            <p className="text-neutral-500 dark:text-neutral-400 text-lg leading-relaxed">
              {pin.shortDescription}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <LikeButton pinId={pin.id} initialLikes={pin.likes} />
            <ShareButtons pin={pin} />
          </div>

          {pin.price && (
            <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-3xl font-bold text-neutral-900 dark:text-white">
                  {formatPrice(pin.price)}
                </span>
                {pin.originalPrice && (
                  <>
                    <span className="text-lg text-neutral-400 line-through">
                      {formatPrice(pin.originalPrice)}
                    </span>
                    {discount && (
                      <span className="text-sm font-medium text-rose-600">Save {discount}%</span>
                    )}
                  </>
                )}
              </div>
              <Button onClick={handleBuyClick} size="lg" className="w-full bg-amber-500 hover:bg-amber-600">
                <ExternalLink className="w-5 h-5" />
                Buy Now on Amazon
              </Button>
              <p className="text-xs text-neutral-400 text-center mt-2">
                As an Amazon Associate, we earn from qualifying purchases.
              </p>
            </div>
          )}

          <div className="prose dark:prose-invert max-w-none">
            <h2 className="text-xl font-bold">Description</h2>
            <p className="text-neutral-600 dark:text-neutral-400 whitespace-pre-line">
              {pin.fullDescription}
            </p>
          </div>

          {pin.features.length > 0 && (
            <div>
              <h3 className="text-lg font-bold mb-3">Features</h3>
              <ul className="space-y-2">
                {pin.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-neutral-600 dark:text-neutral-400">
                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pin.pros.length > 0 && (
              <div className="p-4 rounded-2xl bg-green-50 dark:bg-green-950/30">
                <h3 className="font-bold text-green-700 dark:text-green-400 mb-2 flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Pros
                </h3>
                <ul className="space-y-1">
                  {pin.pros.map((p) => (
                    <li key={p} className="text-sm text-green-800 dark:text-green-300">• {p}</li>
                  ))}
                </ul>
              </div>
            )}
            {pin.cons.length > 0 && (
              <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/30">
                <h3 className="font-bold text-red-700 dark:text-red-400 mb-2 flex items-center gap-2">
                  <Minus className="w-4 h-4" /> Cons
                </h3>
                <ul className="space-y-1">
                  {pin.cons.map((c) => (
                    <li key={c} className="text-sm text-red-800 dark:text-red-300">• {c}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {pin.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {pin.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-sm text-neutral-600 dark:text-neutral-400"
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-1 text-amber-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
            <span className="text-sm text-neutral-500 ml-2">Highly recommended</span>
          </div>
        </motion.div>
      </div>

      {relatedPins.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {relatedPins.map((p, i) => (
              <PinCard key={p.id} pin={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
