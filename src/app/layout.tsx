import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import ChatPrompt from "@/components/ChatPrompt";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Reveal from "@/components/Reveal";
import { church, isDemo, pastor, siteUrl } from "@/lib/site";
import "./globals.css";

// Dated things (the next service, the calendar feed, events that expire) switch over on their own; re-render hourly.
export const revalidate = 3600;

const display = localFont({
  src: [
    { path: "../fonts/dm-serif-display-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/dm-serif-display-400-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-display",
  display: "swap",
});
const script = localFont({
  src: "../fonts/allura-400.woff2",
  weight: "400",
  variable: "--font-script",
  display: "swap",
});
const body = localFont({
  src: "../fonts/figtree-300-900.woff2",
  weight: "300 900",
  variable: "--font-body",
  display: "swap",
});

const description = `${church.name}, an independent Baptist church in Hernando, Florida. Sunday School 10:00 AM, Morning Service 11:00 AM, lunch together every Sunday. Old-fashioned hymns, the King James Bible, and a church family that will know your name. ${pastor.styled}.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${church.name} · Hernando, FL`,
    template: `%s · ${church.name}`,
  },
  description,
  openGraph: {
    type: "website",
    siteName: church.name,
    url: siteUrl,
    title: `${church.name} · Hernando, FL`,
    description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Bethel Baptist Church, Hernando, Florida, at sunset" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
  robots: isDemo ? { index: false, follow: false } : undefined,
};

export const viewport: Viewport = {
  themeColor: "#2f2824",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Church",
  name: church.name,
  url: siteUrl,
  description,
  foundingDate: String(church.founded),
  address: {
    "@type": "PostalAddress",
    streetAddress: `${church.streetNumber} ${church.street}`,
    addressLocality: church.city,
    addressRegion: church.stateCode,
    postalCode: church.zip,
    addressCountry: "US",
  },
  sameAs: [church.facebook, church.instagram, church.youtube],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${script.variable} ${body.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <ChatPrompt />
        <Reveal />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {/* Demo tracking (CRM → Demo Tracking). Remove at go-live. */}
        <script async src="https://www.elijahdesent.com/demo.js" />
      </body>
    </html>
  );
}
