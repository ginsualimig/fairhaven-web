import Link from "next/link";
import type { Metadata } from "next";
import Container from "@/components/Container";
import NewsletterForm from "@/components/NewsletterForm";
import { pageMetadata } from "@/lib/metadata";
import { getAllBlogPosts } from "@/lib/blog-posts";

export const metadata: Metadata = pageMetadata({
  title: "News & Insights | Stay Informed on the New Zealand Property Market",
  description:
    "Market commentary, fund updates and macro analysis from the Fairhaven Property Group desk — covering New Zealand property, global capital flows and investment strategy.",
  path: "/news-insights",
});

export default function NewsInsightsPage() {
  const posts = getAllBlogPosts();

  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-teal/10 pointer-events-none" />
        <Container className="relative py-20 md:py-28">
          <span className="inline-block text-teal text-xs font-semibold tracking-widest uppercase mb-5 label-uppercase">
            News &amp; Insights
          </span>
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-offwhite leading-tight mb-6 max-w-3xl">
            Stay informed on the New Zealand property market
          </h1>
          <p className="text-offwhite/65 text-lg leading-relaxed max-w-2xl">
            Market commentary, fund updates and macro analysis from the Fairhaven desk — covering New Zealand
            property, global capital flows and investment strategy.
          </p>
        </Container>
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      </section>

      {/* Article grid */}
      <section className="py-24 bg-offwhite">
        <Container>
          {posts.length === 0 ? (
            <p className="text-stone text-center py-12">No articles published yet. Check back soon.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/news-insights/${post.slug}`}
                  className="group flex flex-col rounded-lg border border-stone/20 bg-white overflow-hidden hover:border-teal/60 hover:shadow-lg transition-all duration-300"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-stone/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-col flex-1 p-6">
                    <p className="text-xs text-stone/70 mb-3 flex items-center gap-2">
                      <span>
                        {new Date(post.date).toLocaleDateString("en-NZ", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{post.author}</span>
                    </p>
                    <h2 className="text-navy font-serif font-semibold text-lg leading-snug group-hover:text-teal transition-colors mb-3">
                      {post.title}
                    </h2>
                    <p className="text-sm text-stone leading-relaxed line-clamp-3 mt-auto">
                      {post.metaDescription}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>

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
