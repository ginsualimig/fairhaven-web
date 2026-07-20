import Link from "next/link";
import type { Metadata } from "next";
import Container from "@/components/Container";
import { ButtonLink } from "@/components/Button";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "About Us | Explore Our Expertise",
  description:
    "Learn more about Fairhaven Property Group's approach in creating value for investors through strategic real estate investments and community engagement.",
  path: "/about-us",
});

export default function AboutUsPage() {
  return (
    <>
      {/* Hero with dark overlay */}
      <section className="relative bg-navy overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.squarespace-cdn.com/content/v1/648907a5eeda1944bf418848/89a3e5ef-04b8-46ba-801f-1dd21b23e5ef/Geo1.png"
          alt="Global geography of Fairhaven's markets across New Zealand, Australia and Southeast Asia"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/95 to-navy/80 pointer-events-none" />

        <Container className="relative py-28 md:py-36">
          <span className="inline-block text-teal text-xs font-semibold tracking-widest uppercase mb-5 label-uppercase">
            About Fairhaven
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-offwhite leading-tight max-w-3xl">
            About us
          </h1>
        </Container>

        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      </section>

      {/* Where Opportunity and Expertise Converge */}
      <section className="py-24 bg-offwhite">
        <Container>
          <div className="max-w-2xl mb-14">
            <span className="text-teal text-xs font-semibold tracking-widest uppercase label-uppercase">
              Our Philosophy
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-navy mt-3">
              Where Opportunity and Expertise Converge
            </h2>
            <p className="text-stone text-lg mt-4">Focusing on Results that matter</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <h3 className="font-serif text-xl font-semibold text-navy mb-3">Our Mission</h3>
              <p className="text-stone leading-relaxed">
                Our mission is to create exceptional value for investors by identifying and unlocking opportunities
                in overlooked and underserved markets. We combine disciplined underwriting with deep local knowledge
                to acquire, reposition and manage real estate assets that generate durable, risk-adjusted returns for
                the wholesale investors and family offices who partner with us.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-xl font-semibold text-navy mb-3">Our Approach</h3>
              <p className="text-stone leading-relaxed">
                At Fairhaven Property Group, we take a holistic approach to real estate investment. From sourcing and
                due diligence through to acquisition, asset management and eventual realisation, every stage is
                guided by rigorous analysis and a hands-on operating philosophy — ensuring that each asset under our
                stewardship is positioned to reach its full potential.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-xl font-semibold text-navy mb-3">Our Commitment</h3>
              <p className="text-stone leading-relaxed">
                At Fairhaven Property Group, we are committed to transparency, integrity, and delivering exceptional
                value to our investors and the communities in which we operate. We believe that responsible
                investment and long-term value creation go hand in hand, and we hold ourselves to that standard in
                every transaction.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Team / Expertise */}
      <section className="py-20 bg-white border-y border-stone/10">
        <Container>
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div className="rounded-lg overflow-hidden order-2 md:order-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.squarespace-cdn.com/content/v1/648907a5eeda1944bf418848/1692641991491-5431RW88GMPY2RSYOXSM/image-asset.jpeg"
                alt="The Fairhaven Property Group team"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <span className="text-teal text-xs font-semibold tracking-widest uppercase label-uppercase">
                Leadership
              </span>
              <h2 className="text-3xl font-bold font-serif text-navy mt-3 mb-5">
                Experience that propels us forward
              </h2>
              <p className="text-stone leading-relaxed mb-4">
                Propelling Fairhaven Property Group forward is Petrus Yen. His decade of experience in successfully
                managing his family office&apos;s real estate assets has given him a granular understanding of what
                it takes to source, structure and operate property investments that perform through market cycles.
              </p>
              <p className="text-stone leading-relaxed">
                That experience — spanning acquisitions, leasing, capital works and disposals across New Zealand,
                Australia and Southeast Asia — now underpins Fairhaven&apos;s discretionary fund, deal sourcing and
                property management disciplines, giving investors access to institutional-grade rigour with the
                agility of a specialist operator.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-navy">
        <Container className="max-w-3xl text-center">
          <span className="text-teal text-xs font-semibold tracking-widest uppercase label-uppercase">
            Get In Touch
          </span>
          <h2 className="text-3xl font-bold font-serif text-offwhite mt-3 mb-4">
            Want to learn more about investing with Fairhaven?
          </h2>
          <p className="text-offwhite/70 mb-8 leading-relaxed">
            Our team is happy to walk you through our approach, current strategy and how we work with wholesale
            investors, institutions and family offices.
          </p>
          <div className="flex justify-center">
            <ButtonLink href="/contact-us" variant="primary">
              Contact Our Team
            </ButtonLink>
          </div>
          <p className="text-offwhite/50 text-sm mt-6">
            Managing a property with us?{" "}
            <Link href="/pm-enquiry" className="text-gold underline hover:text-gold/80">
              Submit a Property Management enquiry
            </Link>
            .
          </p>
        </Container>
      </section>
    </>
  );
}
