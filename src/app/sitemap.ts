import type { MetadataRoute } from "next";
import { siteRoutes, siteUrl } from "@/content/site";
import { isSoonHref } from "@/lib/features";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return siteRoutes.filter((r) => !isSoonHref(r)).map((r) => ({ url: `${siteUrl}${r}`, changeFrequency: "monthly", priority: r === "/" ? 1 : 0.7 }));
}
