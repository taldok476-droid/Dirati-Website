import { SiteNav } from "@/components/nav/SiteNav";
import { ScreensProvider } from "@/components/screens/ScreensProvider";
import { FaultReport } from "@/components/sections/FaultReport";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Landlords } from "@/components/sections/Landlords";
import { Story } from "@/components/sections/Story";
import { Tenants } from "@/components/sections/Tenants";
import { MotionProvider } from "@/components/ui/motion";
import { faq } from "@/lib/faq";
import { resolveScreens } from "@/lib/resolve-screens";
import { site } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: site.name,
      url: site.url,
      inLanguage: "he-IL",
    },
    {
      "@type": "MobileApplication",
      name: site.name,
      description: site.description,
      applicationCategory: "LifestyleApplication",
      inLanguage: "he-IL",
    },
    {
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function Home() {
  const screens = resolveScreens();
  return (
    <ScreensProvider screens={screens}>
      <MotionProvider>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-3 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          דילוג לתוכן
        </a>
        <SiteNav />
        <main id="main">
          <Hero />
          <Story />
          <Landlords />
          <Tenants />
          <FaultReport />
          <Faq />
          <FinalCta />
        </main>
        <Footer />
      </MotionProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </ScreensProvider>
  );
}
