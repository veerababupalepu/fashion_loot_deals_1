"use client";

import { Link2 } from "lucide-react";
import { FacebookIcon, TwitterIcon } from "@/components/ui/SocialIcons";
import toast from "react-hot-toast";
import type { Pin } from "@/types";
import { SITE_URL } from "@/lib/constants";
import { PinterestButton } from "./PinterestButton";

interface ShareButtonsProps {
  pin: Pin;
  showPinterest?: boolean;
}

export function ShareButtons({ pin, showPinterest = true }: ShareButtonsProps) {
  const url = `${SITE_URL}/pin/${pin.slug}`;
  const text = pin.title;

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    toast.success("Link copied!");
    fetch("/api/clicks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "SHARE", pinId: pin.id, source: "copy" }),
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {showPinterest && <PinterestButton pin={pin} />}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-sky-100 dark:hover:bg-sky-950 text-neutral-600 hover:text-sky-600 transition-colors"
        aria-label="Share on Twitter"
      >
        <TwitterIcon className="w-4 h-4" />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-blue-100 dark:hover:bg-blue-950 text-neutral-600 hover:text-blue-600 transition-colors"
        aria-label="Share on Facebook"
      >
        <FacebookIcon className="w-4 h-4" />
      </a>
      <button
        onClick={copyLink}
        className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-600 transition-colors"
        aria-label="Copy link"
      >
        <Link2 className="w-4 h-4" />
      </button>
    </div>
  );
}
