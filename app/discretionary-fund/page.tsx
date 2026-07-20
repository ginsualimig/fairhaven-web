import type { Metadata } from "next";
import Container from "@/components/Container";
import HeroSection from "@/components/HeroSection";
import StatCard from "@/components/StatCard";
import NewsletterForm from "@/components/NewsletterForm";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Discretionary Fund | Maximize Your Investment",
  description:
    "Explore Fairhaven's Discretionary Fund for dynamic growth and flexible investment tailored for wholesale and institutional investors.",
  path: "/discretionary-fund",
});

const acquisitionProfiles = [
  {
    city: "Dunedin",
    title: "Dunedin CBD Commercial",
    yield: "12.17%",
    sectionSize: "1,850 m²",
    buildingGla: "3,200 m²",
    description:
      "A well-located CBD commercial asset with a diversified tenant mix, strong walk-up foot traffic and a clear path to rent optimisation through active lease management.",
    image:
      "https://images.squarespace-cdn.com/content/v1/648907a5eeda1944bf418848/b6e87dbc-d67f-40a4-8381-831339d334c4/AdobeStock_327572145.jpeg",
  },
  {
    city: "Christchurch",
    title: "Christchurch Shopping Centre",
    yield: "11.67%",
    sectionSize: "2.4 ha",
    buildingGla: "8,600 m²",
    description:
      "A neighbourhood shopping centre anchored by essential retail, offering resilient cash flow and upside through targeted leasing and centre repositioning.",
    image:
      "https://images.squarespace-cdn.com/content/v1/648907a5eeda1944bf418848/cbeb12af-feca-4ed2-8a6d-84fd7b86c4b4/istockphoto-522540838-2048x2048.jpg",
  },
  {
    city: "Wellington",
    title: "Wellington Student Accommodation",
    yield: "13.76%",
    sectionSize: "1,100 m²",
    buildingGla: "4,050 m²",
    description:
      "A purpose-built student accommodation asset serving Wellington's tertiary institutions, benefiting from structurally constrained supply and strong occupancy.",
    image:
      "https://images.squarespace-cdn.com/content/v1/648907a5eeda1944bf418848/0aade47a-569a-4abf-98e4-0ef5a211d760/brett-jordan-T62S1YjpDKE-unsplash.jpg",
  },
];

export default function DiscretionaryFundPage() {
  return (
    <>
      <HeroSection
        eyebrow="Discretionary Fund Management"
        heading="Fairhaven Discretionary Fund Management"
        subheading="Tailored for wholesale investors, institutional investors and family offices seeking dynamic growth, flexibility and solid performance."
        primaryLabel="Register Your Interest"
        primaryHref="/contact-us"
        secondaryLabel="View Acquisition Profile"
        secondaryHref="#acquisition-profile"
      />

      {/* Fund summary */}
      <section className="py-24 bg-offwhite">
        <Container>
          <div className="max-w-2xl mb-12">
            <span className="text-teal text-xs font-semibold tracking-widest uppercase label-uppercase">
              Fund Summary
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-navy mt-3">
              Structured for disciplined, long-term performance
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
            <StatCard stat="14–15%" label="Target net IRR p.a.*" tooltip="Indicative target return, not guaranteed" />
            <StatCard stat="10 yrs" label="Fund lifetime (+3yr option)" />
            <StatCard stat="NZD 1M" label="Minimum investment" />
            <StatCard stat="50%" label="Target loan-to-value ratio (LVR)" />
          </div>

          <div className="rounded-lg border border-stone/20 bg-white p-6 md:p-8">
            <p className="text-sm text-stone leading-relaxed">
              *Fairhaven Property Group specializes in real estate investment opportunities across New Zealand,
              tailored specifically for wholesale investors as defined by the Financial Markets Authority (FMA).
              Targeted returns are indicative only, are not guaranteed and are available exclusively to Wholesale
              Investors. Our offerings are not available to retail investors. For more information on what
              constitutes a wholesale investor, please visit the FMA&apos;s guidelines. Individuals who are tax
              residents outside of New Zealand are advised to procure legal counsel or engage with the appropriate
              regulatory authority to assess their eligibility for investing with our entity, contingent upon their
              residency status.
            </p>
          </div>
        </Container>
      </section>

      {/* Acquisition Profile */}
      <section id="acquisition-profile" className="py-20 bg-white border-y border-stone/10">
        <Container>
          <div className="max-w-2xl mb-14">
            <span className="text-teal text-xs font-semibold tracking-widest uppercase label-uppercase">
              Acquisition Profile
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-navy mt-3">
              A curated pipeline across New Zealand&apos;s key regions
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {acquisitionProfiles.map((asset) => (
              <div
                key={asset.title}
                className="rounded-lg border border-stone/20 bg-offwhite overflow-hidden hover:border-teal/60 transition-colors duration-300"
              >
                <div className="aspect-[16/10] overflow-hidden bg-stone/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={asset.image} alt={asset.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold tracking-widest uppercase label-uppercase text-teal">
                      {asset.city}
                    </span>
                    <span className="text-xl font-bold text-gold font-serif">{asset.yield}</span>
                  </div>
                  <h3 className="text-navy font-serif font-semibold text-lg mb-3">{asset.title}</h3>
                  <dl className="grid grid-cols-2 gap-3 text-xs text-stone mb-4 pb-4 border-b border-stone/15">
                    <div>
                      <dt className="uppercase tracking-wide text-stone/70">Section Size</dt>
                      <dd className="text-navy font-medium mt-0.5">{asset.sectionSize}</dd>
                    </div>
                    <div>
                      <dt className="uppercase tracking-wide text-stone/70">Building GLA</dt>
                      <dd className="text-navy font-medium mt-0.5">{asset.buildingGla}</dd>
                    </div>
                  </dl>
                  <p className="text-stone text-sm leading-relaxed">{asset.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Onboarding CTA */}
      <section className="py-20 bg-navy">
        <Container className="max-w-2xl text-center">
          <span className="text-teal text-xs font-semibold tracking-widest uppercase label-uppercase">
            Be the First to Know
          </span>
          <h2 className="text-3xl font-bold font-serif text-offwhite mt-3 mb-4">
            We are currently finalizing the Information Memorandum.
          </h2>
          <p className="text-offwhite/70 mb-8 leading-relaxed">
            Register your details below and we&apos;ll notify you as soon as the Fairhaven Discretionary Fund
            Information Memorandum is available for wholesale investors.
          </p>
          <NewsletterForm variant="dark" className="max-w-xl mx-auto" />
        </Container>
      </section>
    </>
  );
}
