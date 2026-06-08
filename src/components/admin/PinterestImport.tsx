"use client";

import { useState } from "react";
import Image from "next/image";
import { Link2, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { PinterestImportResult } from "@/types";

interface PinterestImportProps {
  onImport: (data: PinterestImportResult) => void;
}

export function PinterestImport({ onImport }: PinterestImportProps) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<PinterestImportResult | null>(null);

  const handleImport = async () => {
    if (!url.trim()) {
      toast.error("Paste a Pinterest pin URL first.");
      return;
    }

    setLoading(true);
    setPreview(null);
    try {
      const res = await fetch("/api/admin/pinterest-import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to import pin.");
        return;
      }

      setPreview(data);
      onImport(data);
      toast.success("Pinterest pin imported! Review the fields below, then publish.");
    } catch {
      toast.error("Failed to import pin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-950/20 p-6 space-y-4">
      <div>
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <Link2 className="w-5 h-5 text-rose-600" />
          Import from Pinterest
        </h3>
        <p className="text-sm text-neutral-500 mt-1">
          Paste a Pinterest pin URL to pull the image, title, and description into this form.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          label="Pinterest Pin URL"
          placeholder="https://www.pinterest.com/pin/... or https://pin.it/..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleImport())}
        />
        <div className="sm:pt-7">
          <Button type="button" onClick={handleImport} disabled={loading} className="w-full sm:w-auto">
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Importing...
              </>
            ) : (
              "Import Pin"
            )}
          </Button>
        </div>
      </div>

      {preview && (
        <div className="flex gap-4 p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
          <div className="relative w-20 h-28 shrink-0 rounded-lg overflow-hidden">
            <Image src={preview.imageUrl} alt={preview.title} fill className="object-cover" sizes="80px" />
          </div>
          <div className="min-w-0">
            <p className="font-medium line-clamp-2">{preview.title}</p>
            <p className="text-sm text-neutral-500 line-clamp-2 mt-1">{preview.description}</p>
            <a
              href={preview.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-rose-600 hover:underline mt-2 inline-block truncate max-w-full"
            >
              {preview.sourceUrl}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
