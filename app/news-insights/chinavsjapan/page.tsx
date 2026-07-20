import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import NewsletterForm from "@/components/NewsletterForm";
import MarkdownContent from "@/components/MarkdownContent";
import { pageMetadata } from "@/lib/metadata";
import { getBlogPost, getAllBlogPosts } from "@/lib/blog-posts";

const SLUG = "chinavsjapan";

export function generateMetadata(): Metadata {
  const post = getBlogPost(SLUG);
  if (!post) {
    return pageMetadata({
      title: "Article Not Found",
      description: "This article could not be found.",
      path: `/news-insights/${SLUG}`,
    });
  }
  return pageMetadata({
    title: post.title,
    description: post.metaDescription,
    path: `/news-insights/${post.slug}`,
    ogImage: post.image,
  });
}

export default function BlogPostPage() {
  const post = getBlogPost(SLUG);
  if (!post) notFound();

  const formattedDate = new Date(post.date).toLocaleDateString("en-NZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const related = getAllBlogPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-navy/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
        </div>

        <Container className="relative py-24 md:py-36">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-offwhite/60">
              <li>
                <Link href="/" className="hover:text-gold transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/news-insights" className="hover:text-gold transition-colors">
                  News &amp; Insights
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-offwhite/90 truncate max-w-xs" aria-current="page">
                {post.title}
              </li>
            </ol>
          </nav>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-offwhite leading-tight mb-6 max-w-3xl">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-offwhite/70">
            <span className="font-medium text-offwhite/90">{post.author}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>{formattedDate}</time>
          </div>
        </Container>

        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      </section>

      {/* Article body */}
      <section className="py-20 bg-white">
        <Container>
          <article className="max-w-3xl mx-auto">
            <MarkdownContent
              content={post.content}
              className="prose-p:leading-relaxed prose-p:mb-6 prose-headings:mt-10 prose-headings:mb-4"
            />
          </article>

          <div className="max-w-3xl mx-auto mt-16 pt-8 border-t border-stone/20">
            <Link
              href="/news-insights"
              className="inline-flex items-center gap-2 text-sm font-semibold text-teal hover:text-teal/80 transition-colors"
            >
              ← Back to News &amp; Insights
            </Link>
          </div>
        </Container>
      </section>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="py-24 bg-offwhite">
          <Container>
            <div className="max-w-2xl mb-14">
              <span className="text-teal text-xs font-semibold tracking-widest uppercase label-uppercase">
                Keep Reading
              </span>
              <h2 className="text-3xl font-bold font-serif text-navy mt-3">More from the Fairhaven desk</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/news-insights/${p.slug}`}
                  className="group rounded-lg border border-stone/20 bg-white overflow-hidden hover:border-teal/60 transition-colors"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-stone/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-xs text-stone/70 mb-2">
                      {new Date(p.date).toLocaleDateString("en-NZ", { year: "numeric", month: "long", day: "numeric" })}
                    </p>
                    <h3 className="text-navy font-serif font-semibold leading-snug group-hover:text-teal transition-colors">
                      {p.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Newsletter */}
      <section className="py-20 bg-navy">
        <Container className="max-w-3xl text-center">
          <span className="text-teal text-xs font-semibold tracking-widest uppercase label-uppercase">
            Be In The Know
          </span>
          <h2 className="text-3xl font-bold font-serif text-offwhite mt-3 mb-4">
            Stay updated on New Zealand investment opportunities
          </h2>
          <p className="text-offwhite/70 mb-8 leading-relaxed">
            Get market commentary, fund updates and new deal alerts direct from our team.
          </p>
          <NewsletterForm variant="dark" className="max-w-xl mx-auto" />
        </Container>
      </section>
    </>
  );
}
