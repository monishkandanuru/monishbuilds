import { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://monishbuilds.vercel.app", lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: "https://monishbuilds.vercel.app/work", lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: "https://monishbuilds.vercel.app/services", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://monishbuilds.vercel.app/why-me", lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://monishbuilds.vercel.app/contact", lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  ];
}
