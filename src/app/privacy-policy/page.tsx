import { StaticPage } from "@/components/pages/StaticPage";
import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Privacy Policy",
  description: "PinDealsHub privacy policy — how we collect, use, and protect your personal information.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <StaticPage title="Privacy Policy">
      <p><em>Last updated: January 2024</em></p>
      <h2>Information We Collect</h2>
      <p>We collect information you provide directly, such as email addresses for newsletter subscriptions and account registration. We also collect usage data through cookies and analytics tools.</p>
      <h2>How We Use Your Information</h2>
      <ul>
        <li>To send newsletters and promotional content (with your consent)</li>
        <li>To improve our website and user experience</li>
        <li>To analyze traffic and affiliate click performance</li>
        <li>To respond to contact form inquiries</li>
      </ul>
      <h2>Cookies</h2>
      <p>We use cookies for analytics, preferences, and affiliate tracking. See our <a href="/cookie-policy" className="text-rose-600">Cookie Policy</a> for details.</p>
      <h2>Third-Party Services</h2>
      <p>We use Google Analytics, Supabase, and Amazon Associates. These services have their own privacy policies.</p>
      <h2>Your Rights</h2>
      <p>You may request access, correction, or deletion of your personal data by contacting us at hello@pindealshub.com.</p>
      <h2>Contact</h2>
      <p>Questions about this policy? Email hello@pindealshub.com.</p>
    </StaticPage>
  );
}
