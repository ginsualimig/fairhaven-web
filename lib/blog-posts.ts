import fs from "fs";
import path from "path";
import matter from "gray-matter";

const INSIGHTS_DIR = path.join(process.cwd(), "content", "insights");

export interface BlogPostMeta {
  slug: string;
  title: string;
  metaDescription: string;
  author: string;
  date: string;
  image: string;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

function readSlugs(): string[] {
  if (!fs.existsSync(INSIGHTS_DIR)) return [];
  return fs
    .readdirSync(INSIGHTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllBlogPosts(): BlogPost[] {
  const slugs = readSlugs();
  const posts = slugs.map((slug) => getBlogPost(slug)).filter(Boolean) as BlogPost[];
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBlogPost(slug: string): BlogPost | null {
  const filePath = path.join(INSIGHTS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug: data.slug || slug,
    title: data.title || slug,
    metaDescription: data.metaDescription || "",
    author: data.author || "Fairhaven Property Group",
    date: data.date || "",
    image: data.image || "",
    content,
  };
}

// Lightweight metadata-only list, safe to import in sitemap.ts without pulling markdown bodies.
export const blogPosts: BlogPostMeta[] = getAllBlogPosts().map(
  ({ slug, title, metaDescription, author, date, image }) => ({
    slug,
    title,
    metaDescription,
    author,
    date,
    image,
  })
);
