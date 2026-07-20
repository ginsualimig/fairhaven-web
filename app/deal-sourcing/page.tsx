import type { Metadata } from "next";
import Container from "@/components/Container";
import HeroSection from "@/components/HeroSection";
import CTASection from "@/components/CTASection";
import NewsletterForm from "@/components/NewsletterForm";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Deal Sourcing | Off-Market Property Dealflow Across NZ, AU, SG, MY & SEA",
  description:
    "Fairhaven Property Group sources off-market property dealflow across New Zealand, Australia, Singapore, Malaysia and Southeast Asia through an established network — before opportunities go public.",
  path: "/deal-sourcing",
});

export default function DealSourcingPage() {
  return (
    <>
      <HeroSection
        eyebrow="What We Do — Deal Sourcing"
        heading="Off-market dealflow across New Zealand, Australia, Singapore, Malaysia and Southeast Asia"
        subheading="Our team sources property opportunities through an established network of agents, owners and operators — surfacing deals before they reach the open market."
        primaryLabel="Get in Touch to Learn More"
        primaryHref="/contact-us"
      />

      <section className="py-24 bg-offwhite">
        <Container className="max-w-3xl text-center">
          <span className="text-teal text-xs font-semibold tracking-widest uppercase label-uppercase">
            Coming Soon
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-navy mt-3 mb-6">
            More details to follow
          </h2>
          <p className="text-stone leading-relaxed text-lg">
            We&apos;re putting the finishing touches on this page. In the meantime, Fairhaven&apos;s deal sourcing
            capability spans off-market opportunities across New Zealand, Australia, Singapore, Malaysia and
            Southeast Asia — feeding disciplined, high-potential dealflow into our Discretionary Fund and directly to
            partners we work with. Get in touch with our team to learn more about current opportunities.
          </p>
        </Container>
      </section>

      <CTASection
        eyebrow="Interested in Off-Market Opportunities?"
        heading="Get in touch to learn more"
        subheading="Speak with our team about current and upcoming off-market opportunities across our markets."
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
