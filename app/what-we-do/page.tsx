import type { Metadata } from "next";
import Container from "@/components/Container";
import HeroSection from "@/components/HeroSection";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "What We Do | Discretionary Fund Management, Deal Sourcing & Property Optimisation",
  description:
    "Fairhaven Property Group delivers three interconnected services for wholesale investors: discretionary fund management, off-market deal sourcing, and hands-on property optimisation.",
  path: "/what-we-do",
});

const services = [
  {
    title: "Discretionary Fund Management",
    description:
      "A wholesale-investor property fund targeting ~15% net p.a., built on off-market dealflow across New Zealand, Australia, Singapore, Malaysia and Southeast Asia. Structured at 50% LVR, with a 10-year fund life and a 3-year extension option. Minimum investment NZD 1,000,000.",
    href: "/discretionary-fund",
    metric: "~15% p.a.",
  },
  {
    title: "Deal Sourcing",
    description:
      "Off-market dealflow across New Zealand, Australia, Singapore, Malaysia and Southeast Asia. Opportunities are sourced through our network and relationships long before they reach the open market.",
    href: "/discretionary-fund",
    metric: "5 Markets",
  },
  {
    title: "Property Management & Optimisation",
    description:
      "Hands-on asset management covering rent optimisation, cost reduction and occupancy management — for investors who want a disciplined partner without selling their property.",
    href: "/property-management",
    metric: "Full-Service",
  },
];

export default function WhatWeDoPage() {
  return (
    <>
      <HeroSection
        eyebrow="What We Do"
        heading="Three disciplines. One disciplined approach to real estate."
        subheading="From sourcing off-market opportunities to managing capital and optimising assets day to day, Fairhaven Property Group brings a single disciplined philosophy to every stage of the investment lifecycle."
        primaryLabel="Explore the Discretionary Fund"
        primaryHref="/discretionary-fund"
        secondaryLabel="Talk to Our Team"
        secondaryHref="/contact-us"
      />

      <section className="py-24 bg-offwhite">
        <Container>
          <div className="max-w-2xl mb-14">
            <span className="text-teal text-xs font-semibold tracking-widest uppercase label-uppercase">
              Our Services
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-navy mt-3">
              How we create value for wholesale investors
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
                href={service.href}
                metric={service.metric}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Detailed sections */}
      <section className="py-20 bg-offwhite border-t border-stone/10">
        <Container className="max-w-4xl space-y-16">
          <div>
            <span className="text-teal text-xs font-semibold tracking-widest uppercase label-uppercase">
              01 — Discretionary Fund Management
            </span>
            <h3 className="text-2xl md:text-3xl font-bold font-serif text-navy mt-3 mb-4">
              A wholesale-investor property fund targeting ~15% net p.a.
            </h3>
            <p className="text-stone leading-relaxed mb-4">
              Fairhaven&apos;s discretionary fund invests in off-market dealflow across New Zealand, Australia,
              Singapore, Malaysia and Southeast Asia, applying disciplined leverage at up to 50% LVR to acquire
              high-potential land and commercial property. The fund runs for a 10-year term with a 3-year extension
              option, giving capital time to compound through full property cycles.
            </p>
            <p className="text-stone leading-relaxed mb-6">
              Minimum investment is NZD 1,000,000, and the fund is available exclusively to Wholesale Investors as
              defined by the Financial Markets Authority.
            </p>
            <a href="/discretionary-fund" className="text-sm text-gold font-medium hover:text-gold/80 transition-colors">
              Read more about the Discretionary Fund →
            </a>
          </div>

          <div>
            <span className="text-teal text-xs font-semibold tracking-widest uppercase label-uppercase">
              02 — Deal Sourcing
            </span>
            <h3 className="text-2xl md:text-3xl font-bold font-serif text-navy mt-3 mb-4">
              Off-market opportunities, before they go public
            </h3>
            <p className="text-stone leading-relaxed mb-6">
              Our team sources dealflow across New Zealand, Australia, Singapore, Malaysia and Southeast Asia
              through an established network of agents, owners and operators — surfacing opportunities before they
              reach the open market and giving our investors a genuine first-mover advantage.
            </p>
            <a href="/discretionary-fund" className="text-sm text-gold font-medium hover:text-gold/80 transition-colors">
              See how deal sourcing feeds the fund →
            </a>
          </div>

          <div>
            <span className="text-teal text-xs font-semibold tracking-widest uppercase label-uppercase">
              03 — Property Management &amp; Optimisation
            </span>
            <h3 className="text-2xl md:text-3xl font-bold font-serif text-navy mt-3 mb-4">
              Hands-on asset management, without selling your property
            </h3>
            <p className="text-stone leading-relaxed mb-6">
              For investors who want a disciplined partner rather than a buyer, our property management team
              focuses on rent optimisation, cost reduction and occupancy management — helping every asset under our
              care reach its full potential.
            </p>
            <a
              href="/property-management"
              className="text-sm text-gold font-medium hover:text-gold/80 transition-colors"
            >
              Learn more about Property Management →
            </a>
          </div>
        </Container>
      </section>

      <CTASection
        eyebrow="Ready to Talk?"
        heading="Let's discuss how Fairhaven can work for you"
        subheading="Whether you're a wholesale investor exploring the fund, or a property owner considering a management partner, our team is ready to help."
        primaryLabel="Contact Our Team"
        primaryHref="/contact-us"
        secondaryLabel="Explore the Discretionary Fund"
        secondaryHref="/discretionary-fund"
      />
    </>
  );
}
