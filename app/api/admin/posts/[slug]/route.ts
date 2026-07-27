import { NextResponse } from "next/server";
import matter from "gray-matter";
import { getInsightFile, updateInsightFile } from "@/lib/github";
import { yamlQuote } from "@/lib/slugify";

interface PostBody {
  sha?: string;
  title?: string;
  author?: string;
  date?: string;
  metaDescription?: string;
  image?: string;
  body?: string;
}

function validSlug(slug: string) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

export async function GET(_request: Request, { params }: { params: { slug: string } }) {
  if (!validSlug(params.slug)) return NextResponse.json({ error: "Invalid article slug." }, { status: 400 });

  try {
    const file = await getInsightFile(params.slug);
    const parsed = matter(file.content);
    return NextResponse.json({
      sha: file.sha,
      slug: params.slug,
      title: parsed.data.title || params.slug,
      author: parsed.data.author || "Fairhaven Property Group",
      date: parsed.data.date || "",
      metaDescription: parsed.data.metaDescription || "",
      image: parsed.data.image || "",
      body: parsed.content.trim(),
    });
  } catch (err) {
    return NextResponse.json({ error: `Could not load article: ${(err as Error).message}` }, { status: 502 });
  }
}

export async function PUT(request: Request, { params }: { params: { slug: string } }) {
  if (!validSlug(params.slug)) return NextResponse.json({ error: "Invalid article slug." }, { status: 400 });

  const payload: PostBody = await request.json().catch(() => ({}));
  const title = payload.title?.trim();
  const body = payload.body?.trim();
  const sha = payload.sha?.trim();

  if (!sha) return NextResponse.json({ error: "Article version is missing. Reload the article and try again." }, { status: 400 });
  if (!title || title.length < 3) return NextResponse.json({ error: "Title is required (min 3 characters)." }, { status: 400 });
  if (!body || body.length < 20) return NextResponse.json({ error: "Post body is required (min 20 characters)." }, { status: 400 });

  const author = payload.author?.trim() || "Fairhaven Property Group";
  const date = payload.date?.trim() || new Date().toISOString().slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "Date must be in YYYY-MM-DD format." }, { status: 400 });
  }
  const metaDescription = payload.metaDescription?.trim() || title.slice(0, 155);
  const image = payload.image?.trim() || "/images/hero-home.webp";
  const frontmatter = [
    "---",
    `slug: ${yamlQuote(params.slug)}`,
    `title: ${yamlQuote(title)}`,
    `metaDescription: ${yamlQuote(metaDescription)}`,
    `author: ${yamlQuote(author)}`,
    `date: ${yamlQuote(date)}`,
    `image: ${yamlQuote(image)}`,
    "---",
    "",
  ].join("\n");

  try {
    await updateInsightFile(params.slug, `${frontmatter}${body}\n`, sha, `Update blog post: ${title}`);
    return NextResponse.json({ ok: true, slug: params.slug, url: `/news-insights/${params.slug}` });
  } catch (err) {
    return NextResponse.json({ error: `Could not save to GitHub: ${(err as Error).message}` }, { status: 502 });
  }
}
