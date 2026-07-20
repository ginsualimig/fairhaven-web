import Link from "next/link";
import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Container from "@/components/Container";
import HeroSection from "@/components/HeroSection";
import NewsletterForm from "@/components/NewsletterForm";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Careers | Join Our Team Now",
  description:
    "Explore exciting career opportunities at Fairhaven Property Group. Join a dynamic team in real estate investment to drive growth and foster positive change.",
  path: "/careers",
});

const CAREERS_DIR = path.join(process.cwd(), "content", "careers");

const roleMeta: Record<string, { type: string; summary: string }> = {
  "executive-assistant": {
    type: "Full-time",
    summary:
      "Provide comprehensive support to the Managing Partner and Investor Relations Managers — from investor onboarding to schedule management and administrative support.",
  },
  "financial-analyst": {
    type: "Full-time",
    summary:
      "Launch your career in real estate investment by conducting financial analysis, investment valuation, and supporting data-driven decision-making.",
  },
  "investor-relations-associate": {
    type: "Full-time",
    summary:
      "Support our Investor Relations Manager in building strong investor relationships, CRM management, and investor communications in this entry-level role.",
  },
  "investor-relations-manager": {
    type: "Full-time",
    summary:
      "Build and maintain strong relationships with investors across South East Asia and Oceania, while contributing to branding, marketing, and strategic growth.",
  },
  "property-manager": {
    type: "Part-time",
    summary:
      "Manage our Dunedin property portfolio — from listings and tenancy applications to inspections, financial reporting, and repairs coordination.",
  },
};

function getRoles() {
  const files = fs.existsSync(CAREERS_DIR) ? fs.readdirSync(CAREERS_DIR).filter((f) => f.endsWith(".md")) : [];
  return files
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const { data } = matter(fs.readFileSync(path.join(CAREERS_DIR, file), "utf-8"));
      const meta = roleMeta[slug] || { type: "Full-time", summary: "" };
      return {
        slug,
        title: data.title || slug,
        location: data.location || "",
        type: meta.type,
        summary: meta.summary,
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}

export default function CareersPage() {
  const roles = getRoles();

  return (
    <>
      <HeroSection
        eyebrow="Careers"
        heading="Join our team"
        subheading="Are you passionate about real estate and investment management?"
      />

      {/* Overview */}
      <section className="py-24 bg-offwhite">
        <Container className="max-w-4xl">
          <p className="text-stone text-lg leading-relaxed">
            Fairhaven Property Group offers exciting career opportunities for professionals looking to
            contribute to the growth and success of our dynamic company. As a member of our team, you will
            play a crucial role in shaping the future of real estate investment while working in a
            collaborative and innovative environment. Join us and be part of a team that is committed to
            unlocking the potential of communities, driving positive change, and fostering professional
            growth. Explore our current job openings and submit your application below.
          </p>
        </Container>
      </section>

      {/* Open roles */}
      <section className="py-20 bg-white border-t border-stone/10">
        <Container>
          <div className="max-w-2xl mb-14">
            <span className="text-teal text-xs font-semibold tracking-widest uppercase label-uppercase">
              Open Roles
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-navy mt-3">
              Current opportunities at Fairhaven
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {roles.map((role) => (
              <Link
                key={role.slug}
                href={`/careers/${role.slug}`}
                className="group flex flex-col rounded-lg border border-stone/20 bg-offwhite p-8 hover:border-teal/60 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <span className="text-xs font-semibold tracking-widest uppercase label-uppercase text-teal">
                    {role.type}
                  </span>
                  <span className="text-stone/40">•</span>
                  <span className="text-xs text-stone">{role.location}</span>
                </div>
                <h3 className="text-2xl font-bold font-serif text-navy mb-3 group-hover:text-teal transition-colors">
                  {role.title}
                </h3>
                <p className="text-stone leading-relaxed mb-6 flex-1">{role.summary}</p>
                <span className="text-sm font-semibold text-gold group-hover:text-gold/80 transition-colors">
                  Apply Now →
                </span>
              </Link>
            ))}
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
