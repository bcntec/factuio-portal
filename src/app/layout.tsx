import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { SiteJsonLd } from "@/components/site-jsonld";
import { site, siteUrl } from "@/content/site";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const spaceGrotesk = Space_Grotesk({ variable: "--font-display", subsets: ["latin"], weight: ["500", "600", "700"] });
const jetBrainsMono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"], weight: ["400", "600", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: site.meta.title, template: "%s · FactuIO" },
  description: site.meta.description,
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "FactuIO",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.meta.title,
    description: site.meta.description,
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable} antialiased`}>
        <SiteJsonLd />
        <SiteNav />
        <div className="min-h-[60vh]">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
