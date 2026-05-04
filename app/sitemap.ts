import type { MetadataRoute } from "next";

const BASE_URL = "https://kkn-pangkalan.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["id", "en"];
  const pages = [
    "",
    "/village-profile",
    "/programs",
    "/team",
    "/logbook",
    "/gallery",
    "/contact",
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      entries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: page === "" ? 1.0 : 0.8,
      });
    }
  }

  return entries;
}
