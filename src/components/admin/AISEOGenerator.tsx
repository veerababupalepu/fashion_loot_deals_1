"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { AISEOResult } from "@/types";

interface AISEOGeneratorProps {
  title: string;
  category?: string;
  onGenerated: (result: AISEOResult) => void;
}

export function AISEOGenerator({ title, category, onGenerated }: AISEOGeneratorProps) {
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!title.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/ai-seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, category }),
      });
      const data = await res.json();
      onGenerated(data);
    } catch {
      // fallback handled server-side
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      onClick={generate}
      disabled={!title.trim() || loading}
      className="w-full"
    >
      <Sparkles className="w-4 h-4" />
      {loading ? "Generating SEO..." : "AI SEO Generator"}
    </Button>
  );
}
