import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CAREERS_DIR = path.join(process.cwd(), "content", "careers");

export interface CareerRole {
  slug: string;
  title: string;
  location: string;
  applyEmail: string;
  content: string;
}

function readSlugs(): string[] {
  if (!fs.existsSync(CAREERS_DIR)) return [];
  return fs
    .readdirSync(CAREERS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getCareerRole(slug: string): CareerRole | null {
  const filePath = path.join(CAREERS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug: data.slug || slug,
    title: data.title || slug,
    location: data.location || "",
    applyEmail: data.applyEmail || "careers@fairhavenproperty.co.nz",
    content,
  };
}

export function getAllCareerRoles(): CareerRole[] {
  return readSlugs()
    .map((slug) => getCareerRole(slug))
    .filter(Boolean) as CareerRole[];
}

export const careerRoles = getAllCareerRoles();
