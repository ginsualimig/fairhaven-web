import type { Metadata } from "next";
import Container from "@/components/Container";
import HeroSection from "@/components/HeroSection";
import CTASection from "@/components/CTASection";
import NewsletterForm from "@/components/NewsletterForm";
import Reveal from "@/components/Reveal";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Property Management & Optimisation | Hands-On Asset Management",
  description:
    "Fairhaven Property Group provides hands-on management and optimisation for investment property — rent optimisation, cost reduction and occupancy management for owners who want a disciplined partner.",
  path: "/property-management",
});

export default function PropertyManagementPage() {
  return (
    <>
      <HeroSection
        eyebrow="What We Do — Property Management"
        heading="Hands-on management and optimisation for your investment property"
        subheading="For investors who want a disciplined partner rather than a buyer — we focus on rent optimisation, cost reduction and occupancy management so your property reaches its full potential."
        primaryLabel="Get in Touch to Learn More"
        primaryHref="/contact-us"
        image="/images/apartment-block.webp"
        imageAlt="Residential apartment block under Fairhaven management"
      />

      <section className="py-24 bg-offwhite">
        <Reveal>
          <Container className="max-w-3xl text-center">
            <span className="text-teal text-xs font-semibold tracking-widest uppercase label-uppercase">
              Coming Soon
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-navy mt-3 mb-6">
              More details to follow
            </h2>
            <p className="text-stone leading-relaxed text-lg">
              We&apos;re putting the finishing touches on this page. In the meantime, Fairhaven&apos;s property
              management team offers full-service, hands-on asset management for investment property owners —
              covering rent optimisation, cost reduction and occupancy management, without requiring you to sell.
              Get in touch with our team to learn more.
            </p>
          </Container>
        </Reveal>
      </section>

      <CTASection
        eyebrow="Own an Investment Property?"
        heading="Get in touch to learn more"
        subheading="Speak with our property management team about how we can help optimise your asset's performance."
        primaryLabel="Get in Touch to Learn More"
        primaryHref="/contact-us"
      />

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
