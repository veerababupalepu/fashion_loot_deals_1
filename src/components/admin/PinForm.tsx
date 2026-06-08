"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { CATEGORIES } from "@/lib/categories";
import { slugify } from "@/lib/utils";
import type { AISEOResult, Pin, PinterestImportResult } from "@/types";
import { ImageUpload } from "./ImageUpload";
import { AISEOGenerator } from "./AISEOGenerator";
import { PinterestImport } from "./PinterestImport";

interface PinFormProps {
  pin?: Pin;
}

export function PinForm({ pin }: PinFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>(pin?.images.map((i) => i.url) || []);
  const [form, setForm] = useState({
    title: pin?.title || "",
    slug: pin?.slug || "",
    seoTitle: pin?.seoTitle || "",
    shortDescription: pin?.shortDescription || "",
    fullDescription: pin?.fullDescription || "",
    pinterestTitle: pin?.pinterestTitle || "",
    pinterestDescription: pin?.pinterestDescription || "",
    metaDescription: pin?.metaDescription || "",
    seoKeywords: pin?.seoKeywords || "",
    hashtags: pin?.hashtags || "",
    affiliateLink: pin?.affiliateLink || "",
    price: pin?.price?.toString() || "",
    originalPrice: pin?.originalPrice?.toString() || "",
    categorySlug: pin?.category.slug || "amazon-finds",
    features: pin?.features.join("\n") || "",
    pros: pin?.pros.join("\n") || "",
    cons: pin?.cons.join("\n") || "",
    tags: pin?.tags.map((t) => t.name).join(", ") || "",
    status: pin?.status || "DRAFT",
    isTrending: pin?.isTrending || false,
    isDeal: pin?.isDeal || false,
  });

  const update = (field: string, value: string | boolean) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "title" && !pin) {
        next.slug = slugify(value as string);
      }
      return next;
    });
  };

  const handleAISEO = (result: AISEOResult) => {
    setForm((prev) => ({
      ...prev,
      pinterestTitle: result.pinterestTitle,
      pinterestDescription: result.pinterestDescription,
      seoKeywords: result.seoKeywords,
      metaDescription: result.metaDescription,
      hashtags: result.hashtags,
    }));
    toast.success("SEO content generated!");
  };

  const handlePinterestImport = (data: PinterestImportResult) => {
    setImages([data.imageUrl]);
    setForm((prev) => ({
      ...prev,
      title: data.title,
      slug: pin ? prev.slug : slugify(data.title),
      shortDescription: data.description.slice(0, 300),
      fullDescription: data.description,
      pinterestTitle: data.pinterestTitle,
      pinterestDescription: data.pinterestDescription,
      metaDescription: data.description.slice(0, 160),
      affiliateLink: prev.affiliateLink,
    }));
  };

  const handleSubmit = async (status: "DRAFT" | "PUBLISHED") => {
    setLoading(true);
    try {
      const body = {
        ...form,
        status,
        images,
        features: form.features.split("\n").filter(Boolean),
        pros: form.pros.split("\n").filter(Boolean),
        cons: form.cons.split("\n").filter(Boolean),
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        price: form.price ? parseFloat(form.price) : null,
        originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : null,
      };

      const res = await fetch(pin ? `/api/admin/pins/${pin.id}` : "/api/admin/pins", {
        method: pin ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        toast.success(status === "PUBLISHED" ? "Pin published!" : "Draft saved!");
        router.push("/admin");
        router.refresh();
      } else {
        toast.error("Failed to save pin.");
      }
    } catch {
      toast.error("Failed to save pin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {!pin && <PinterestImport onImport={handlePinterestImport} />}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Basic Info</h3>
          <Input label="Title" value={form.title} onChange={(e) => update("title", e.target.value)} required />
          <Input label="URL Slug" value={form.slug} onChange={(e) => update("slug", e.target.value)} />
          <Input label="SEO Title" value={form.seoTitle} onChange={(e) => update("seoTitle", e.target.value)} />
          <div>
            <label className="block text-sm font-medium mb-1.5">Short Description</label>
            <textarea
              value={form.shortDescription}
              onChange={(e) => update("shortDescription", e.target.value)}
              rows={2}
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Full Description</label>
            <textarea
              value={form.fullDescription}
              onChange={(e) => update("fullDescription", e.target.value)}
              rows={6}
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Category</label>
            <select
              value={form.categorySlug}
              onChange={(e) => update("categorySlug", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900"
            >
              {CATEGORIES.map((c) => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </div>
          <Input label="Affiliate Link" value={form.affiliateLink} onChange={(e) => update("affiliateLink", e.target.value)} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Price" type="number" step="0.01" value={form.price} onChange={(e) => update("price", e.target.value)} />
            <Input label="Original Price" type="number" step="0.01" value={form.originalPrice} onChange={(e) => update("originalPrice", e.target.value)} />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-lg">SEO & Pinterest</h3>
          <AISEOGenerator
            title={form.title}
            category={CATEGORIES.find((c) => c.slug === form.categorySlug)?.name}
            onGenerated={handleAISEO}
          />
          <Input label="Pinterest Title" value={form.pinterestTitle} onChange={(e) => update("pinterestTitle", e.target.value)} />
          <div>
            <label className="block text-sm font-medium mb-1.5">Pinterest Description</label>
            <textarea
              value={form.pinterestDescription}
              onChange={(e) => update("pinterestDescription", e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
            />
          </div>
          <Input label="Meta Description" value={form.metaDescription} onChange={(e) => update("metaDescription", e.target.value)} />
          <Input label="SEO Keywords" value={form.seoKeywords} onChange={(e) => update("seoKeywords", e.target.value)} />
          <Input label="Hashtags" value={form.hashtags} onChange={(e) => update("hashtags", e.target.value)} />
          <Input label="Tags (comma separated)" value={form.tags} onChange={(e) => update("tags", e.target.value)} />
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-4">Images</h3>
        <ImageUpload images={images} onChange={setImages} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Features (one per line)</label>
          <textarea value={form.features} onChange={(e) => update("features", e.target.value)} rows={4}
            className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Pros (one per line)</label>
          <textarea value={form.pros} onChange={(e) => update("pros", e.target.value)} rows={4}
            className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Cons (one per line)</label>
          <textarea value={form.cons} onChange={(e) => update("cons", e.target.value)} rows={4}
            className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900" />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={form.isTrending} onChange={(e) => update("isTrending", e.target.checked)} className="rounded" />
          <span className="text-sm">Trending</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={form.isDeal} onChange={(e) => update("isDeal", e.target.checked)} className="rounded" />
          <span className="text-sm">Today&apos;s Deal</span>
        </label>
      </div>

      <div className="flex gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
        <Button onClick={() => handleSubmit("PUBLISHED")} disabled={loading}>
          {loading ? "Saving..." : "Publish"}
        </Button>
        <Button variant="outline" onClick={() => handleSubmit("DRAFT")} disabled={loading}>
          Save Draft
        </Button>
        <Button variant="ghost" onClick={() => router.back()}>Cancel</Button>
      </div>
    </div>
  );
}
