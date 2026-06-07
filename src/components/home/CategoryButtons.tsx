"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CATEGORIES } from "@/lib/categories";
import { cn } from "@/lib/utils";

interface CategoryButtonsProps {
  activeSlug?: string;
}

export function CategoryButtons({ activeSlug }: CategoryButtonsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 px-4 py-6">
      <Link
        href="/"
        className={cn(
          "px-4 py-2 rounded-full text-sm font-medium transition-all",
          !activeSlug
            ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
            : "bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 hover:border-rose-300"
        )}
      >
        All
      </Link>
      {CATEGORIES.map((cat, i) => (
        <motion.div
          key={cat.slug}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.03 }}
        >
          <Link
            href={`/${cat.slug}`}
            className={cn(
              "inline-block px-4 py-2 rounded-full text-sm font-medium transition-all",
              activeSlug === cat.slug
                ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                : "bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 hover:border-rose-300 hover:text-rose-600"
            )}
          >
            {cat.name}
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
