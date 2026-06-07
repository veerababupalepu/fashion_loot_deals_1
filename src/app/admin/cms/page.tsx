"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const CMS_PAGES = [
  { key: "about", title: "About Page", defaultContent: "PinDealsHub is your destination for curated product picks." },
  { key: "contact", title: "Contact Page", defaultContent: "Reach us at hello@pindealshub.com" },
  { key: "privacy", title: "Privacy Policy", defaultContent: "Your privacy is important to us." },
  { key: "affiliate", title: "Affiliate Disclosure", defaultContent: "We earn from qualifying purchases." },
  { key: "cookies", title: "Cookie Policy", defaultContent: "We use cookies to improve your experience." },
  { key: "terms", title: "Terms & Conditions", defaultContent: "By using this site you agree to our terms." },
];

export default function CMSPage() {
  const [selected, setSelected] = useState(CMS_PAGES[0]);
  const [content, setContent] = useState(CMS_PAGES[0].defaultContent);
  const [saving, setSaving] = useState(false);

  const handleSelect = (page: typeof CMS_PAGES[0]) => {
    setSelected(page);
    setContent(page.defaultContent);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await new Promise((r) => setTimeout(r, 500));
      toast.success(`${selected.title} saved!`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Content Management</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="space-y-2">
          {CMS_PAGES.map((page) => (
            <button
              key={page.key}
              onClick={() => handleSelect(page)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                selected.key === page.key
                  ? "bg-rose-50 dark:bg-rose-950 text-rose-600"
                  : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
              }`}
            >
              {page.title}
            </button>
          ))}
        </div>
        <div className="lg:col-span-3 space-y-4">
          <Input label="Page Title" value={selected.title} readOnly />
          <div>
            <label className="block text-sm font-medium mb-1.5">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={16}
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 font-mono text-sm"
            />
          </div>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}
