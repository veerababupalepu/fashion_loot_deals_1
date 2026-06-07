import { StaticPage } from "@/components/pages/StaticPage";
import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Cookie Policy",
  description: "Learn how PinDealsHub uses cookies and how you can manage your preferences.",
  path: "/cookie-policy",
});

export default function CookiePolicyPage() {
  return (
    <StaticPage title="Cookie Policy">
      <h2>What Are Cookies?</h2>
      <p>Cookies are small text files stored on your device when you visit our website. They help us provide a better experience.</p>
      <h2>Types of Cookies We Use</h2>
      <ul>
        <li><strong>Essential Cookies:</strong> Required for basic site functionality</li>
        <li><strong>Analytics Cookies:</strong> Google Analytics to understand traffic patterns</li>
        <li><strong>Preference Cookies:</strong> Remember your theme (light/dark) preference</li>
        <li><strong>Affiliate Cookies:</strong> Track affiliate link clicks for commission attribution</li>
      </ul>
      <h2>Managing Cookies</h2>
      <p>You can control cookies through your browser settings. Disabling cookies may affect site functionality.</p>
      <h2>Third-Party Cookies</h2>
      <p>Amazon, Google, and Pinterest may set their own cookies when you interact with their services through our site.</p>
    </StaticPage>
  );
}
