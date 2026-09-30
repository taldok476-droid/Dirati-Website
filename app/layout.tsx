import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/lib/site";
import "./globals.css";

/*
 * Noto Sans Hebrew, variable in weight and width, self-hosted and split by
 * script so Hebrew pages download only ~17KB of Hebrew glyphs.
 */
const hebrew = localFont({
  src: "./fonts/noto-hebrew.woff2",
  variable: "--font-he",
  weight: "100 900",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "62.5% 100%" }],
  adjustFontFallback: "Arial",
});

const latin = localFont({
  src: "./fonts/noto-latin.woff2",
  variable: "--font-latin",
  weight: "100 900",
  display: "swap",
  preload: false,
  declarations: [{ prop: "font-stretch", value: "62.5% 100%" }],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  keywords: [...site.keywords],
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="he" dir="rtl" className={`${hebrew.variable} ${latin.variable}`}>
      <body>{children}</body>
    </html>
  );
}
