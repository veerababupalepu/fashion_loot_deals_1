"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { formatNumber } from "@/lib/utils";

interface LikeButtonProps {
  pinId: string;
  initialLikes: number;
  size?: "sm" | "md";
}

export function LikeButton({ pinId, initialLikes, size = "md" }: LikeButtonProps) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);

  const handleLike = () => {
    const key = `liked-${pinId}`;
    const wasLiked = localStorage.getItem(key);
    if (wasLiked) {
      localStorage.removeItem(key);
      setLiked(false);
      setLikes((l) => l - 1);
    } else {
      localStorage.setItem(key, "true");
      setLiked(true);
      setLikes((l) => l + 1);
    }
  };

  return (
    <button
      onClick={handleLike}
      className={`inline-flex items-center gap-1.5 transition-colors ${
        liked ? "text-rose-600" : "text-neutral-500 hover:text-rose-600"
      } ${size === "sm" ? "text-xs" : "text-sm"}`}
      aria-label="Like"
    >
      <Heart className={`${size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"} ${liked ? "fill-current" : ""}`} />
      {formatNumber(likes)}
    </button>
  );
}
