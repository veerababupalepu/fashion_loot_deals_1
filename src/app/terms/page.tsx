import { StaticPage } from "@/components/pages/StaticPage";
import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Terms & Conditions",
  description: "PinDealsHub terms and conditions of use.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <StaticPage title="Terms & Conditions">
      <p><em>Last updated: January 2024</em></p>
      <h2>Acceptance of Terms</h2>
      <p>By accessing PinDealsHub, you agree to these terms. If you disagree, please do not use our site.</p>
      <h2>Use of Content</h2>
      <p>All content on PinDealsHub is for informational purposes. Product prices, availability, and descriptions are subject to change on Amazon.</p>
      <h2>Affiliate Links</h2>
      <p>Our site contains affiliate links. See our <a href="/affiliate-disclosure" className="text-rose-600">Affiliate Disclosure</a>.</p>
      <h2>User Accounts</h2>
      <p>You are responsible for maintaining the security of your account credentials.</p>
      <h2>Limitation of Liability</h2>
      <p>PinDealsHub is not liable for any damages arising from use of our site or third-party products purchased through affiliate links.</p>
      <h2>Changes</h2>
      <p>We may update these terms at any time. Continued use constitutes acceptance of updated terms.</p>
    </StaticPage>
  );
}
