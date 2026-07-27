import { NextResponse } from "next/server";
import { getAllBlogPosts } from "@/lib/blog-posts";

export async function GET() {
  const posts = getAllBlogPosts().map(({ slug, title, author, date, image }) => ({
    slug,
    title,
    author,
    date,
    image,
  }));
  return NextResponse.json({ posts });
}
