import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { blogPosts } from "@/lib/blog-posts";
import { careerRoles } from "@/lib/careers";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about-us",
    "/careers",
    "/charity-initiatives",
    "/contact-us",
    "/discretionary-fund",
    "/deal-sourcing",
    "/property-management",
    "/what-we-do",
    "/news-insights",
    "/pm-enquiry",
    "/privacy-policy",
  ].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const careerRoutes = careerRoles.map((role) => ({
    url: `${siteConfig.url}/careers/${role.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${siteConfig.url}/news-insights/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...careerRoutes, ...blogRoutes];
}
