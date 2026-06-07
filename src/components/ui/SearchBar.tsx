"use client";

import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  defaultValue?: string;
  size?: "sm" | "lg";
}

export function SearchBar({
  className,
  placeholder = "Search products, ideas, and deals...",
  defaultValue = "",
  size = "lg",
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("relative w-full", className)}>
      <Search
        className={cn(
          "absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400",
          size === "lg" ? "w-5 h-5" : "w-4 h-4"
        )}
      />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full rounded-full border border-neutral-200 dark:border-neutral-700",
          "bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm",
          "text-neutral-900 dark:text-white placeholder:text-neutral-400",
          "focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-400",
          "transition-all duration-200 shadow-sm",
          size === "lg" ? "pl-12 pr-12 py-4 text-base" : "pl-10 pr-10 py-2.5 text-sm"
        )}
      />
      {query && (
        <button
          type="button"
          onClick={() => setQuery("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </form>
  );
}
