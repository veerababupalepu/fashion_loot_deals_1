"use client";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function AdminSettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Settings</h1>
      <div className="max-w-lg space-y-4">
        <Input label="Site Name" defaultValue="PinDealsHub" />
        <Input label="Site URL" defaultValue="https://pindealshub.com" />
        <Input label="Amazon Associate Tag" defaultValue="pindealshub-20" />
        <Input label="Google Analytics ID" placeholder="G-XXXXXXXXXX" />
        <Input label="Google Search Console Verification" placeholder="verification-code" />
        <Input label="Pinterest ID" placeholder="your-pinterest-id" />
        <Button>Save Settings</Button>
      </div>
    </div>
  );
}
