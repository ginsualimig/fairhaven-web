"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { marked } from "marked";
import { slugify } from "@/lib/slugify";

const FALLBACK_IMAGE = "/images/hero-home.webp";

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export default function AdminPublishPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [slug, setSlug] = useState("");
  const [author, setAuthor] = useState("Fairhaven Property Group");
  const [date, setDate] = useState(todayISO());
  const [metaDescription, setMetaDescription] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ slug: string; url: string } | null>(null);

  const effectiveSlug = slugTouched ? slug : slugify(title);
  const previewHtml = useMemo(() => (body ? marked.parse(body, { async: false }) : ""), [body]);

  async function handlePublish(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    setResult(null);
    try {
      const res = await fetch("/api/admin/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug: effectiveSlug,
          author,
          date,
          metaDescription,
          image,
          body,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong publishing this post.");
        setSubmitting(false);
        return;
      }
      setResult({ slug: data.slug, url: data.url });
      setTitle("");
      setSlug("");
      setSlugTouched(false);
      setMetaDescription("");
      setImage("");
      setBody("");
    } catch {
      setError("Could not reach the server. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-offwhite">
      <header className="bg-navy border-b border-gold/20">
        <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between">
          <div>
            <span className="text-gold font-serif font-bold text-xl">Fairhaven</span>
            <span className="text-offwhite/60 text-sm ml-3">Blog Admin</span>
          </div>
          <button onClick={handleLogout} className="text-sm text-offwhite/70 hover:text-gold transition-colors">
            Sign out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-2xl font-bold font-serif text-navy mb-1">New blog post</h1>
        <p className="text-stone text-sm mb-8">
          Fill this in and hit Publish. It goes live at fairhaven-web.vercel.app within 1&ndash;2 minutes.
        </p>

        {result && (
          <div className="mb-8 rounded-lg border border-teal/30 bg-teal/5 p-5">
            <p className="text-navy font-semibold mb-1">Published! 🎉</p>
            <p className="text-sm text-stone">
              Your post will appear at{" "}
              <span className="font-mono text-navy">{result.url}</span> within a minute or two, once the site
              finishes rebuilding.
            </p>
          </div>
        )}

        {error && (
          <div className="mb-8 rounded-lg border border-red-300 bg-red-50 p-5">
            <p className="text-red-700 text-sm font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handlePublish} className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5" htmlFor="title">
                Title
              </label>
              <input
                id="title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Why Wellington Yields Are Compressing Again"
                className="w-full rounded-md border border-stone/30 px-4 py-2.5 text-navy focus:outline-none focus:ring-2 focus:ring-teal/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-navy mb-1.5" htmlFor="slug">
                URL slug{" "}
                <span className="text-stone/60 font-normal">(auto-generated from title — edit if you want)</span>
              </label>
              <input
                id="slug"
                value={effectiveSlug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setSlug(slugify(e.target.value));
                }}
                className="w-full rounded-md border border-stone/30 px-4 py-2.5 text-navy font-mono text-sm focus:outline-none focus:ring-2 focus:ring-teal/50"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5" htmlFor="author">
                  Author
                </label>
                <input
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full rounded-md border border-stone/30 px-4 py-2.5 text-navy focus:outline-none focus:ring-2 focus:ring-teal/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5" htmlFor="date">
                  Date
                </label>
                <input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-md border border-stone/30 px-4 py-2.5 text-navy focus:outline-none focus:ring-2 focus:ring-teal/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-navy mb-1.5" htmlFor="metaDescription">
                Short summary{" "}
                <span className="text-stone/60 font-normal">(for search engines &amp; article cards — optional)</span>
              </label>
              <input
                id="metaDescription"
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Leave blank to auto-generate from the title"
                className="w-full rounded-md border border-stone/30 px-4 py-2.5 text-navy focus:outline-none focus:ring-2 focus:ring-teal/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-navy mb-1.5" htmlFor="image">
                Cover image URL{" "}
                <span className="text-stone/60 font-normal">(optional — a default image is used if left blank)</span>
              </label>
              <input
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://…"
                className="w-full rounded-md border border-stone/30 px-4 py-2.5 text-navy focus:outline-none focus:ring-2 focus:ring-teal/50"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image || FALLBACK_IMAGE}
                alt="Cover preview"
                className="mt-3 w-full aspect-[16/9] object-cover rounded-md border border-stone/20"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-navy" htmlFor="body">
                  Post body
                </label>
                <button
                  type="button"
                  onClick={() => setShowPreview((v) => !v)}
                  className="lg:hidden text-xs font-semibold text-teal hover:text-teal/80"
                >
                  {showPreview ? "Hide preview" : "Show preview"}
                </button>
              </div>
              <textarea
                id="body"
                required
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={18}
                placeholder={"Write your post here. Leave a blank line between paragraphs.\n\nBasic markdown works: **bold**, *italic*, and lines starting with \"## \" become headings."}
                className="w-full rounded-md border border-stone/30 px-4 py-3 text-navy leading-relaxed focus:outline-none focus:ring-2 focus:ring-teal/50 font-mono text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto rounded-sm bg-teal px-8 py-3.5 text-sm font-semibold text-white hover:bg-teal/90 transition-colors disabled:opacity-50"
            >
              {submitting ? "Publishing…" : "Publish"}
            </button>
          </div>

          <div className={`${showPreview ? "block" : "hidden"} lg:block`}>
            <p className="text-xs uppercase tracking-widest text-stone/60 font-semibold mb-3">Live preview</p>
            <div className="rounded-lg border border-stone/20 bg-white overflow-hidden sticky top-6">
              <div className="aspect-[16/9] bg-stone/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image || FALLBACK_IMAGE} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <p className="text-xs text-stone/70 mb-2">
                  {author || "Fairhaven Property Group"} ·{" "}
                  {new Date(date || todayISO()).toLocaleDateString("en-NZ", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <h2 className="text-navy font-serif font-bold text-xl mb-4">{title || "Post title preview"}</h2>
                <div
                  className="prose prose-stone prose-sm max-w-none prose-headings:font-serif prose-headings:text-navy prose-a:text-teal"
                  dangerouslySetInnerHTML={{ __html: previewHtml || "<p class='text-stone/50'>Start typing to see a preview…</p>" }}
                />
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
