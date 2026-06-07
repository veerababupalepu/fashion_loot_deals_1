"use client";

import { useState } from "react";
import { Mail, Send } from "lucide-react";
import toast from "react-hot-toast";
import { StaticPage } from "@/components/pages/StaticPage";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
    setLoading(false);
  };

  return (
    <StaticPage title="Contact Us">
      <p className="mb-6">
        Have a question, partnership inquiry, or product suggestion? We&apos;d love to hear from you.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4 not-prose">
        <Input
          label="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <Input
          label="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <div>
          <label className="block text-sm font-medium mb-1.5">Message</label>
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            rows={5}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
          />
        </div>
        <Button type="submit" disabled={loading}>
          <Send className="w-4 h-4" />
          {loading ? "Sending..." : "Send Message"}
        </Button>
      </form>
      <div className="mt-8 flex items-center gap-2 text-neutral-500 not-prose">
        <Mail className="w-4 h-4" />
        <span>hello@pindealshub.com</span>
      </div>
    </StaticPage>
  );
}
