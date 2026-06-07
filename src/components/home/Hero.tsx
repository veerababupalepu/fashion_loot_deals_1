"use client";

import { motion } from "framer-motion";
import { SearchBar } from "@/components/ui/SearchBar";

export function Hero() {
  return (
    <section className="relative py-16 md:py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 via-white to-amber-50/30 dark:from-rose-950/20 dark:via-neutral-950 dark:to-amber-950/10" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-rose-200/30 dark:bg-rose-900/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-200/30 dark:bg-amber-900/10 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur text-sm font-medium text-rose-600 mb-6 shadow-sm">
            ✨ Curated for Pinterest Lovers
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white leading-tight mb-6">
            Discover Trending Products &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-amber-500">
              Lifestyle Ideas
            </span>
          </h1>
          <p className="text-lg text-neutral-500 dark:text-neutral-400 mb-8 max-w-2xl mx-auto">
            Shop the best Amazon finds, fashion picks, and home decor ideas trending on Pinterest right now.
          </p>
          <SearchBar className="max-w-xl mx-auto" />
        </motion.div>
      </div>
    </section>
  );
}
