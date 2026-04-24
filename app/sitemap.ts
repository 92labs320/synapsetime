import { MetadataRoute } from "next";
import citiesData from "@/data/cities.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://synapsetime.net";

  const hubs = [
    "london",
    "new-york",
    "tokyo",
    "paris",
    "dubai",
    "singapore",
    "sydney",
    "toronto",
    "berlin",
    "mumbai",
    "shanghai",
    "hong-kong",
    "seoul",
    "sao-paulo",
    "mexico-city",
    "lagos",
    "cairo",
    "moscow",
    "los-angeles",
    "chicago",
  ];

  const cities = citiesData as { name: string; country: string; timezone: string; slug: string }[];

  // Generate combinations: each hub vs each city in the 500 list
  const combinations: MetadataRoute.Sitemap = [];

  hubs.forEach((hubSlug) => {
    cities.forEach((city) => {
      // Avoid comparing a city with itself
      if (hubSlug !== city.slug) {
        combinations.push({
          url: `${baseUrl}/compare/${hubSlug}-vs-${city.slug}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.6,
        });
      }
    });
  });

  // Add static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  return [...staticPages, ...combinations];
}
