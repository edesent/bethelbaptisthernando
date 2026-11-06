import type { MetadataRoute } from "next";
import { nav, siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", ...nav.filter((n) => !n.href.startsWith("http")).map((n) => n.href), "/about/beliefs", "/about/rebuild", "/counseling"].map((p) => ({
    url: `${siteUrl}${p}`,
    changeFrequency: "weekly",
    priority: p === "" ? 1 : 0.7,
  }));
}
