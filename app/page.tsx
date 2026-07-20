import Link from "next/link";
import type { Metadata } from "next";
import Container from "@/components/Container";
import HeroSection from "@/components/HeroSection";
import ServiceCard from "@/components/ServiceCard";
import StatCard from "@/components/StatCard";
import NewsletterForm from "@/components/NewsletterForm";
import { pageMetadata } from "@/lib/metadata";
import { getAllBlogPosts } from "@/lib/blog-posts";

export const metadata: Metadata = pageMetadata({
  title: "Fairhaven Property Group | Dunedin Property Investment & Management",
  description:
    "Fairhaven Property Group is a Dunedin-based discretionary property fund manager and deal sourcing partner, targeting ~15% net p.a. for wholesale investors across New Zealand, Australia and Southeast Asia.",
  path: "/",
});

export default function HomePage() {
  const latestPosts = getAllBlogPosts().slice(0, 3);

  return (
    <>
      <HeroSection
        eyebrow="Discretionary Fund Management · Deal Sourcing · Property Management"
        heading="Architects of lasting transformation in New Zealand real estate"
        subheading="Fairhaven Property Group identifies overlooked property opportunities across New Zealand, Australia and Southeast Asia, and turns them into disciplined, income-generating assets for wholesale investors."
        primaryLabel="Explore the Discretionary Fund"
        primaryHref="/discretionary-fund"
        secondaryLabel="Talk to Our Team"
        secondaryHref="/contact-us"
        image="/images/hero-home.webp"
        imageAlt="Modern commercial property developed by Fairhaven Property Group"
      />

      {/* What we do */}
      <section className="py-24 bg-offwhite">
        <Container>
          <div className="max-w-2xl mb-14">
            <span className="text-teal text-xs font-semibold tracking-widest uppercase label-uppercase">
              What We Do
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-navy mt-3">
              Three disciplines. One disciplined approach to real estate.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <ServiceCard
              title="Discretionary Fund Management"
              description="A wholesale-investor property fund targeting ~15% net p.a., built on leveraged acquisitions of high-potential land and commercial property across New Zealand."
              href="/discretionary-fund"
              metric="~15%"
            />
            <ServiceCard
              title="Deal Sourcing"
              description="Off-market dealflow across New Zealand, Australia, Singapore, Malaysia and Southeast Asia — sourced through our network before opportunities go public."
              href="/deal-sourcing"
              metric="5 Markets"
            />
            <ServiceCard
              title="Property Management & Optimisation"
              description="Hands-on asset management that drives rent optimisation, cost reduction and occupancy — so every property under our care reaches its full potential."
              href="/property-management"
              metric="Full-Service"
            />
          </div>
        </Container>
      </section>

      {/* Photo band */}
      <section className="grid grid-cols-1 sm:grid-cols-3">
        {[
          { src: "/images/apartment-block.webp", alt: "Residential apartment block asset" },
          { src: "/images/meeting.webp", alt: "Fairhaven investor relations meeting" },
          { src: "/images/skyscraper.webp", alt: "Commercial office tower" },
        ].map((img) => (
          <div key={img.src} className="relative aspect-[4/3] overflow-hidden group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-navy/10 group-hover:bg-navy/0 transition-colors duration-500" />
          </div>
        ))}
      </section>

      {/* Stats band */}
      <section className="py-20 bg-white border-y border-stone/10">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            <StatCard stat="14–15%" label="Target net IRR p.a.*" tooltip="Discretionary Fund target return" />
            <StatCard stat="50%" label="Target loan-to-value ratio" />
            <StatCard stat="10 yrs" label="Fund lifetime (+3yr option)" />
            <StatCard stat="5" label="Markets: NZ · AU · SG · MY · SEA" />
          </div>
          <p className="text-xs text-stone/70 mt-6 max-w-2xl">
            *Targeted returns are indicative only and available exclusively to Wholesale Investors. See the{" "}
            <Link href="/discretionary-fund" className="underline hover:text-teal">
              Discretionary Fund Management
            </Link>{" "}
            page for full detail and the Important Disclaimer below.
          </p>
        </Container>
      </section>

      {/* Latest insights */}
      {latestPosts.length > 0 && (
        <section className="py-24 bg-offwhite">
          <Container>
            <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
              <div>
                <span className="text-teal text-xs font-semibold tracking-widest uppercase label-uppercase">
                  News &amp; Insights
                </span>
                <h2 className="text-3xl font-bold font-serif text-navy mt-3">
                  Market commentary from the Fairhaven desk
                </h2>
              </div>
              <Link href="/news-insights" className="text-sm text-gold font-medium hover:text-gold/80 transition-colors">
                View all insights →
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {latestPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/news-insights/${post.slug}`}
                  className="group rounded-lg border border-stone/20 bg-white overflow-hidden hover:border-teal/60 transition-colors"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-stone/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-xs text-stone/70 mb-2">
                      {new Date(post.date).toLocaleDateString("en-NZ", { year: "numeric", month: "long", day: "numeric" })}
                    </p>
                    <h3 className="text-navy font-serif font-semibold leading-snug group-hover:text-teal transition-colors">
                      {post.title}
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
            Get market commentary, fund updates and new deal alerts direct from our team. If you&apos;re a tenant or
            have an enquiry about a property we manage,{" "}
            <Link href="/pm-enquiry" className="text-gold underline hover:text-gold/80">
              contact our property management team directly
            </Link>
            .
          </p>
          <NewsletterForm variant="dark" className="max-w-xl mx-auto" />
        </Container>
      </section>

      {/* Important Disclaimer — verbatim from live site */}
      <section className="py-16 bg-offwhite border-t border-stone/10">
        <Container className="max-w-4xl">
          <h2 className="font-serif text-xl font-semibold text-navy mb-4">Important Disclaimer</h2>
          <div className="text-sm text-stone leading-relaxed space-y-4">
            <p>
              Fairhaven Property Group specializes in real estate investment opportunities across New Zealand,
              tailored specifically for wholesale investors as defined by the Financial Markets Authority (FMA). Our
              focus is on delivering strategic and high-value investment solutions, supported by our extensive market
              knowledge and expertise.
            </p>
            <p>
              At Fairhaven, we are committed to transparency and integrity in all our dealings. We invite wholesale
              investors to explore our curated portfolio, designed to offer substantial growth and value. Please
              note, our offerings are not available to retail investors.
            </p>
            <p>
              For more information on what constitutes a wholesale investor, please visit the FMA&apos;s guidelines.
            </p>
            <p>
              Individuals who are tax residents outside of New Zealand are hereby advised to procure legal counsel or
              engage with the appropriate regulatory authority to assess their eligibility for investing with our
              entity, contingent upon their residency status.
            </p>
            <p>
              Fairhaven Property Group makes no representations or warranties, express or implied, regarding the
              accuracy or completeness of the information contained herein. All information is provided &ldquo;as
              is,&rdquo; without warranty of any kind. The contents of this page may be restricted by law in certain
              jurisdictions. It is the responsibility of any person viewing this page to inform themselves of, and to
              observe, any such restrictions.
            </p>
            <p>The information above is subject to the laws and regulations of New Zealand.</p>
          </div>
        </Container>
      </section>
    </>
  );
}
