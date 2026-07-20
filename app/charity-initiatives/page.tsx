import type { Metadata } from "next";
import Container from "@/components/Container";
import { ButtonLink } from "@/components/Button";
import Reveal, { StaggerGroup, StaggerItem } from "@/components/Reveal";
import B1G1ImpactCounter from "@/components/B1G1ImpactCounter";
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
        <Reveal>
          <Container className="max-w-3xl text-center">
            <span className="text-teal text-xs font-semibold tracking-widest uppercase label-uppercase">
              Giving Back
            </span>
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-navy mt-3 mb-6">Charity Initiatives</h1>
            <p className="text-stone text-lg leading-relaxed">
              At Fairhaven Property Group, we believe that business success and social impact go hand in hand.
              Through our partnership with{" "}
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
        </Reveal>
      </section>

      {/* B1G1 Partnership */}
      <section className="py-20 bg-white border-y border-stone/10">
        <Container>
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <Reveal>
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
            </Reveal>
            <Reveal delay={0.1} y={0} className="rounded-lg overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.squarespace-cdn.com/content/v1/648907a5eeda1944bf418848/c6092664-d4b2-4fea-bdb8-5d972b05a901/B1G1-Image-15.jpg"
                alt="Communities supported through B1G1 giving initiatives"
                className="w-full h-full object-cover"
              />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Global impact counter */}
      <section className="relative py-24 bg-navy overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <Reveal className="relative">
          <Container className="max-w-3xl text-center">
            <span className="text-teal text-xs font-semibold tracking-widest uppercase label-uppercase">
              Part Of Something Bigger
            </span>
            <div className="text-5xl md:text-7xl font-bold font-serif text-gold mt-5 mb-4">
              <B1G1ImpactCounter />
            </div>
            <p className="text-offwhite/70 text-lg leading-relaxed max-w-xl mx-auto">
              Giving impacts created so far by the global B1G1 community of businesses — a live count from B1G1&apos;s
              own network, updated as members like Fairhaven complete giving activities alongside every business
              milestone.
            </p>
          </Container>
        </Reveal>
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      </section>

      {/* Focus areas */}
      <section className="py-24 bg-offwhite">
        <Container>
          <Reveal className="max-w-2xl mb-14">
            <span className="text-teal text-xs font-semibold tracking-widest uppercase label-uppercase">
              Focus Areas
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-navy mt-3">
              Where our giving makes an impact
            </h2>
          </Reveal>

          <StaggerGroup className="grid md:grid-cols-4 gap-6">
            <StaggerItem className="rounded-lg border border-stone/20 bg-white p-6">
              <h3 className="font-serif font-semibold text-navy mb-2">Global Education</h3>
              <p className="text-stone text-sm leading-relaxed">
                Supporting access to quality education and learning resources for underserved communities worldwide.
              </p>
            </StaggerItem>
            <StaggerItem className="rounded-lg border border-stone/20 bg-white p-6">
              <h3 className="font-serif font-semibold text-navy mb-2">Healthcare</h3>
              <p className="text-stone text-sm leading-relaxed">
                Contributing to healthcare access, medical supplies and wellbeing programs for vulnerable
                populations.
              </p>
            </StaggerItem>
            <StaggerItem className="rounded-lg border border-stone/20 bg-white p-6">
              <h3 className="font-serif font-semibold text-navy mb-2">Environmental Conservation</h3>
              <p className="text-stone text-sm leading-relaxed">
                Backing projects that protect natural habitats, promote sustainability and combat climate impact.
              </p>
            </StaggerItem>
            <StaggerItem className="rounded-lg border border-stone/20 bg-white p-6">
              <h3 className="font-serif font-semibold text-navy mb-2">Poverty Alleviation</h3>
              <p className="text-stone text-sm leading-relaxed">
                Helping fund initiatives that provide essential resources and opportunities to communities in need.
              </p>
            </StaggerItem>
          </StaggerGroup>
        </Container>
      </section>

      {/* Live impact map */}
      <section className="py-24 bg-white border-t border-stone/10">
        <Container>
          <Reveal className="max-w-2xl mb-10">
            <span className="text-teal text-xs font-semibold tracking-widest uppercase label-uppercase">
              Explore The Map
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-navy mt-3">
              See our giving connections worldwide
            </h2>
            <p className="text-stone mt-4 leading-relaxed">
              Every pin marks a project or worthy cause connected to Fairhaven through B1G1 — click around the live
              map below to explore where our giving reaches.
            </p>
          </Reveal>
          <Reveal delay={0.1} y={0}>
            <div className="rounded-xl border border-stone/15 shadow-xl shadow-navy/10 overflow-hidden bg-offwhite">
              <div className="h-1.5 bg-gradient-to-r from-teal via-gold to-teal" />
              <iframe
                title="Fairhaven Property Group's B1G1 giving impact map"
                style={{ border: "none" }}
                loading="lazy"
                height={560}
                width="100%"
                src="https://businessesforgood.com/embed.php?id=16793&id2=Impact&height=560"
              />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Closing quote */}
      <section className="py-20 bg-navy">
        <Reveal>
          <Container className="max-w-3xl text-center">
            <p className="text-2xl md:text-3xl font-serif text-offwhite leading-snug mb-8">
              &ldquo;Join us in our journey of giving and together, let&apos;s make a lasting impact that extends far
              beyond the boundaries of our business.&rdquo;
            </p>
            <ButtonLink href="/contact-us" variant="primary">
              Get In Touch
            </ButtonLink>
          </Container>
        </Reveal>
      </section>
    </>
  );
}
