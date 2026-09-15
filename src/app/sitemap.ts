import type { MetadataRoute } from "next";
import { siteRoutes, siteUrl } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return siteRoutes.map((r) => ({ url: `${siteUrl}${r}`, changeFrequency: "monthly", priority: r === "/" ? 1 : 0.7 }));
}
