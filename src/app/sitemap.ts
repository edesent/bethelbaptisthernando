import type { MetadataRoute } from "next";
import { nav, siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", ...nav.map((n) => n.href), "/about/beliefs", "/about/rebuild"].map((p) => ({
    url: `${siteUrl}${p}`,
    changeFrequency: "weekly",
    priority: p === "" ? 1 : 0.7,
  }));
}
