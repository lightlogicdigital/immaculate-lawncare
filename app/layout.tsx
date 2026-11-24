import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Figtree, Libre_Franklin, Yellowtail } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileActionBar } from "@/components/MobileActionBar";
import { SameRouteScroll } from "@/components/SameRouteScroll";
import { cities, services, site } from "@/lib/site";
import "./globals.css";

// Headline face: a Franklin Gothic revival (hardware-store / sign-shop
// American gothic). Variable weight; headlines use 700–800.
const libreFranklin = Libre_Franklin({
  variable: "--font-libre-franklin",
  subsets: ["latin"],
  display: "swap",
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

// Logo fonts. "block" so the wordmark never flashes in a fallback face.
const yellowtail = Yellowtail({
  variable: "--font-yellowtail",
  subsets: ["latin"],
  weight: "400",
  display: "block",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "block",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Immaculate Lawncare | Veteran-Owned Lawn Care in Hampton Roads, VA",
    template: "%s | Immaculate Lawncare",
  },
  description:
    "Veteran and first-responder owned lawn care, mulching and seasonal cleanups in Virginia Beach, Chesapeake, Norfolk and across Hampton Roads. Free quotes within 24 hours.",
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LandscapingService",
  name: site.name,
  description: "Veteran-owned lawn care and landscaping serving Hampton Roads, Virginia.",
  url: site.url,
  telephone: "+1-757-477-4854",
  founder: { "@type": "Person", name: site.owner },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Virginia Beach",
    addressRegion: "VA",
    addressCountry: "US",
  },
  areaServed: cities.map((name) => ({ "@type": "City", name: `${name}, VA` })),
  openingHours: "Mo-Fr 09:00-17:00",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Lawn care services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title, url: `${site.url}/services/${s.slug}` },
    })),
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // Keeps smooth scrolling for in-page section links, but tells Next to jump
      // straight to the top when it opens a new page instead of animating there.
      data-scroll-behavior="smooth"
      className={`${libreFranklin.variable} ${figtree.variable} ${yellowtail.variable} ${barlowCondensed.variable}`}
    >
      <body className="flex min-h-dvh flex-col pb-[84px] lg:pb-0">
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-ink px-5 py-3 font-bold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <MobileActionBar />
        <SameRouteScroll />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
