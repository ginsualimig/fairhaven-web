import { NextResponse } from "next/server";
import { createInsightFile, listInsightSlugs } from "@/lib/github";
import { slugify, yamlQuote } from "@/lib/slugify";

const FALLBACK_IMAGE = "/images/hero-home.webp";

interface PublishBody {
  title?: string;
  author?: string;
  date?: string;
  metaDescription?: string;
  image?: string;
  body?: string;
  slug?: string;
}

export async function POST(request: Request) {
  let payload: PublishBody;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const title = payload.title?.trim();
  const body = payload.body?.trim();

  if (!title || title.length < 3) {
    return NextResponse.json({ error: "Title is required (min 3 characters)." }, { status: 400 });
  }
  if (!body || body.length < 20) {
    return NextResponse.json({ error: "Post body is required (min 20 characters)." }, { status: 400 });
  }

  const author = payload.author?.trim() || "Fairhaven Property Group";
  const date = payload.date?.trim() || new Date().toISOString().slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "Date must be in YYYY-MM-DD format." }, { status: 400 });
  }
  const metaDescription = payload.metaDescription?.trim() || title.slice(0, 155);
  const image = payload.image?.trim() || FALLBACK_IMAGE;

  const baseSlug = slugify(payload.slug?.trim() || title);
  if (!baseSlug) {
    return NextResponse.json({ error: "Could not derive a URL slug from the title." }, { status: 400 });
  }

  let existingSlugs: string[];
  try {
    existingSlugs = await listInsightSlugs();
  } catch (err) {
    return NextResponse.json(
      { error: `Could not reach GitHub to check for duplicate posts: ${(err as Error).message}` },
      { status: 502 }
    );
  }

  let slug = baseSlug;
  let suffix = 2;
  while (existingSlugs.includes(slug)) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  const frontmatter = [
    "---",
    `slug: ${yamlQuote(slug)}`,
    `title: ${yamlQuote(title)}`,
    `metaDescription: ${yamlQuote(metaDescription)}`,
    `author: ${yamlQuote(author)}`,
    `date: ${yamlQuote(date)}`,
    `image: ${yamlQuote(image)}`,
    "---",
    "",
  ].join("\n");

  const fileContent = `${frontmatter}${body}\n`;

  try {
    await createInsightFile(slug, fileContent, `Add blog post: ${title}`);
  } catch (err) {
    return NextResponse.json({ error: `Could not publish to GitHub: ${(err as Error).message}` }, { status: 502 });
  }

  return NextResponse.json({
    ok: true,
    slug,
    url: `/news-insights/${slug}`,
  });
}
