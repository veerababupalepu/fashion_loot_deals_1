import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NewsletterPopup } from "@/components/layout/NewsletterPopup";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ToasterProvider } from "@/components/providers/ToasterProvider";
import { AnalyticsProvider } from "@/components/providers/AnalyticsProvider";
import { SITE_NAME, SITE_URL, GSC_VERIFICATION } from "@/lib/constants";
import { generateWebsiteJsonLd } from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — Discover Trending Products & Lifestyle Ideas`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Discover trending Amazon finds, fashion picks, home decor ideas, and lifestyle products curated for Pinterest lovers.",
  metadataBase: new URL(SITE_URL),
  verification: GSC_VERIFICATION ? { google: GSC_VERIFICATION } : undefined,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateWebsiteJsonLd()) }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white">
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <NewsletterPopup />
          <ToasterProvider />
          <AnalyticsProvider />
        </ThemeProvider>
      </body>
    </html>
  );
}
