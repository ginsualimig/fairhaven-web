import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Container from "@/components/Container";
import MarkdownContent from "@/components/MarkdownContent";
import NewsletterForm from "@/components/NewsletterForm";
import { ButtonLink } from "@/components/Button";
import { pageMetadata } from "@/lib/metadata";

const CAREERS_DIR = path.join(process.cwd(), "content", "careers");

const roleMeta: Record<string, { type: string; description: string }> = {
  "executive-assistant": {
    type: "Full-time",
    description:
      "Provide comprehensive support to the Managing Partner and Investor Relations Managers, ensuring smooth operations and effective communication within the organization.",
  },
  "financial-analyst": {
    type: "Full-time",
    description:
      "Launch your career in real estate investment by conducting financial analysis, investment valuation, and supporting data-driven decision-making.",
  },
  "investor-relations-associate": {
    type: "Full-time",
    description:
      "Support our Investor Relations Manager in building and maintaining strong relationships with our investors, in this entry-level role.",
  },
  "investor-relations-manager": {
    type: "Full-time",
    description:
      "Build and maintain strong relationships with investors across South East Asia and Oceania, while contributing to branding, marketing, and strategic growth.",
  },
  "property-manager": {
    type: "Part-time",
    description:
      "Manage our Dunedin property portfolio — from listings and tenancy applications to inspections, financial reporting, and repairs coordination.",
  },
};

interface CareerFrontmatter {
  title: string;
  location: string;
  applyEmail: string;
  slug?: string;
}

function getCareerFile(slug: string) {
  const filePath = path.join(CAREERS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { data: data as CareerFrontmatter, content };
}

export async function generateStaticParams() {
  const files = fs.existsSync(CAREERS_DIR) ? fs.readdirSync(CAREERS_DIR).filter((f) => f.endsWith(".md")) : [];
  return files.map((f) => ({ slug: f.replace(/\.md$/, "") }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const file = getCareerFile(params.slug);
  if (!file) {
    return pageMetadata({
      title: "Careers",
      description: "Explore career opportunities at Fairhaven Property Group.",
      path: `/careers/${params.slug}`,
    });
  }
  const meta = roleMeta[params.slug];
  return pageMetadata({
    title: file.data.title,
    description: meta?.description || `${file.data.title} role at Fairhaven Property Group — ${file.data.location}.`,
    path: `/careers/${params.slug}`,
  });
}

export default function CareerPage({ params }: { params: { slug: string } }) {
  const file = getCareerFile(params.slug);
  if (!file) notFound();

  const { data, content } = file;
  const meta = roleMeta[params.slug] || { type: "Full-time", description: "" };
  const applyEmail = data.applyEmail || "careers@fairhavenproperty.co.nz";
  const mailtoHref = `mailto:${applyEmail}?subject=${encodeURIComponent(
    `Application: ${data.title}`
  )}`;

  return (
    <>
      {/* Breadcrumb */}
        <section className="bg-navy pt-8 pb-2">
          <Container>
            <nav aria-label="Breadcrumb" className="text-sm text-offwhite/60">
              <ol className="flex items-center gap-2 flex-wrap">
                <li>
                  <Link href="/" className="hover:text-gold transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/careers" className="hover:text-gold transition-colors">
                    Careers
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-offwhite/90" aria-current="page">
                  {data.title}
                </li>
              </ol>
            </nav>
          </Container>
        </section>

        {/* Job hero */}
        <section className="relative bg-navy overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-teal/10 pointer-events-none" />
          <Container className="relative py-16 md:py-20">
            <span className="inline-block text-teal text-xs font-semibold tracking-widest uppercase mb-5 label-uppercase">
              {meta.type} · Now Hiring
            </span>
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-offwhite leading-tight mb-6 max-w-3xl">
              {data.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-offwhite/70 text-sm mb-8">
              <span className="flex items-center gap-2">
                <span className="text-gold">Location:</span> {data.location}
              </span>
              <span className="flex items-center gap-2">
                <span className="text-gold">Type:</span> {meta.type}
              </span>
            </div>
            <ButtonLink href={mailtoHref} variant="primary">
              Apply Now
            </ButtonLink>
          </Container>
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        </section>

        {/* Full content */}
        <section className="py-24 bg-offwhite">
          <Container className="max-w-4xl">
            <MarkdownContent content={content} />
          </Container>
        </section>

        {/* Apply section */}
        <section className="py-16 bg-white border-t border-stone/10">
          <Container className="max-w-3xl text-center">
            <span className="text-teal text-xs font-semibold tracking-widest uppercase label-uppercase">
              Ready to Apply?
            </span>
            <h2 className="text-3xl font-bold font-serif text-navy mt-3 mb-4">
              Apply for {data.title}
            </h2>
            <p className="text-stone mb-8 leading-relaxed">
              To apply for this position, please submit your application, including a comprehensive CV and
              a tailored cover letter, to{" "}
              <a href={`mailto:${applyEmail}`} className="text-teal underline hover:text-teal/80">
                {applyEmail}
              </a>
              . Please note that only shortlisted candidates will be contacted for further consideration.
              We thank you for your understanding and patience throughout the selection process.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <ButtonLink href={mailtoHref} variant="primary">
                Email Your Application
              </ButtonLink>
              <ButtonLink href="/careers" variant="dark">
                View All Roles
              </ButtonLink>
            </div>
          </Container>
        </section>

        {/* Newsletter */}
        <section className="py-20 bg-navy">
          <Container className="max-w-3xl text-center">
            <span className="text-teal text-xs font-semibold tracking-widest uppercase label-uppercase">
              Be In The Know
            </span>
            <h2 className="text-3xl font-bold font-serif text-offwhite mt-3 mb-4">
              Stay updated on opportunities at Fairhaven
            </h2>
            <p className="text-offwhite/70 mb-8 leading-relaxed">
              Get market commentary, fund updates, and new role alerts direct from our team.
            </p>
            <NewsletterForm variant="dark" className="max-w-xl mx-auto" />
          </Container>
        </section>
    </>
  );
}

