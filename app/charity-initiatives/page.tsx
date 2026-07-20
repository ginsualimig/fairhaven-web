import type { Metadata } from "next";
import Container from "@/components/Container";
import { ButtonLink } from "@/components/Button";
import { siteConfig } from "@/lib/site-config";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Charity Initiatives | Join Our Global Mission",
  description:
    "Explore Fairhaven Property Group's charity initiatives supporting global education, healthcare, and environmental causes through B1G1 partnerships.",
  path: "/charity-initiatives",
});

export default function CharityInitiativesPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 bg-offwhite">
        <Container className="max-w-3xl text-center">
          <span className="text-teal text-xs font-semibold tracking-widest uppercase label-uppercase">
            Giving Back
          </span>
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-navy mt-3 mb-6">Charity Initiatives</h1>
          <p className="text-stone text-lg leading-relaxed">
            At Fairhaven Property Group, we believe that business success and social impact go hand in hand. Through
            our partnership with{" "}
            <a
              href={siteConfig.charityPartner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal underline hover:text-teal/80"
            >
              {siteConfig.charityPartner.name}
            </a>
            , we channel a portion of our success into causes that support global education, healthcare,
            environmental conservation and poverty alleviation.
          </p>
        </Container>
      </section>

      {/* B1G1 Partnership */}
      <section className="py-20 bg-white border-y border-stone/10">
        <Container>
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div>
              <div className="mb-8 max-w-[220px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.squarespace-cdn.com/content/v1/648907a5eeda1944bf418848/6593bc7e-1fc1-4dd2-aa29-188f366f0a21/B1G1+Logo.png"
                  alt="B1G1 — Business for Good logo"
                  className="w-full h-auto"
                />
              </div>
              <span className="text-teal text-xs font-semibold tracking-widest uppercase label-uppercase">
                Our Partner
              </span>
              <h2 className="text-3xl font-bold font-serif text-navy mt-3 mb-5">
                A Global B1G1 Partnership
              </h2>
              <p className="text-stone leading-relaxed mb-4">
                B1G1 (Buy1GIVE1) connects businesses like ours to a global network of vetted, high-impact projects.
                Every transaction and milestone we achieve as a business is linked to a giving activity — creating a
                continuous, measurable stream of impact rather than a one-off donation.
              </p>
              <p className="text-stone leading-relaxed">
                Through this partnership, Fairhaven Property Group supports initiatives spanning{" "}
                <strong className="text-navy">global education</strong>,{" "}
                <strong className="text-navy">healthcare</strong>,{" "}
                <strong className="text-navy">environmental conservation</strong> and{" "}
                <strong className="text-navy">poverty alleviation</strong> — giving our investors and partners
                confidence that our growth as a business directly contributes to positive change around the world.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.squarespace-cdn.com/content/v1/648907a5eeda1944bf418848/c6092664-d4b2-4fea-bdb8-5d972b05a901/B1G1-Image-15.jpg"
                alt="Communities supported through B1G1 giving initiatives"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Focus areas */}
      <section className="py-24 bg-offwhite">
        <Container>
          <div className="max-w-2xl mb-14">
            <span className="text-teal text-xs font-semibold tracking-widest uppercase label-uppercase">
              Focus Areas
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-navy mt-3">
              Where our giving makes an impact
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="rounded-lg border border-stone/20 bg-white p-6">
              <h3 className="font-serif font-semibold text-navy mb-2">Global Education</h3>
              <p className="text-stone text-sm leading-relaxed">
                Supporting access to quality education and learning resources for underserved communities worldwide.
              </p>
            </div>
            <div className="rounded-lg border border-stone/20 bg-white p-6">
              <h3 className="font-serif font-semibold text-navy mb-2">Healthcare</h3>
              <p className="text-stone text-sm leading-relaxed">
                Contributing to healthcare access, medical supplies and wellbeing programs for vulnerable
                populations.
              </p>
            </div>
            <div className="rounded-lg border border-stone/20 bg-white p-6">
              <h3 className="font-serif font-semibold text-navy mb-2">Environmental Conservation</h3>
              <p className="text-stone text-sm leading-relaxed">
                Backing projects that protect natural habitats, promote sustainability and combat climate impact.
              </p>
            </div>
            <div className="rounded-lg border border-stone/20 bg-white p-6">
              <h3 className="font-serif font-semibold text-navy mb-2">Poverty Alleviation</h3>
              <p className="text-stone text-sm leading-relaxed">
                Helping fund initiatives that provide essential resources and opportunities to communities in need.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Closing quote */}
      <section className="py-20 bg-navy">
        <Container className="max-w-3xl text-center">
          <p className="text-2xl md:text-3xl font-serif text-offwhite leading-snug mb-8">
            &ldquo;Join us in our journey of giving and together, let&apos;s make a lasting impact that extends far
            beyond the boundaries of our business.&rdquo;
          </p>
          <ButtonLink href="/contact-us" variant="primary">
            Get In Touch
          </ButtonLink>
        </Container>
      </section>
    </>
  );
}
