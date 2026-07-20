import Link from "next/link";
import type { Metadata } from "next";
import Container from "@/components/Container";
import ContactForm from "@/components/ContactForm";
import { siteConfig } from "@/lib/site-config";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Contact Form | Reach Out Today",
  description:
    "Contact Fairhaven Property Group for inquiries or feedback on our property management services. Fill out the form and we will respond promptly.",
  path: "/contact-us",
});

export default function ContactUsPage() {
  return (
    <section className="py-24 bg-offwhite">
      <Container>
        <div className="grid md:grid-cols-2 gap-14">
          <div>
            <span className="text-teal text-xs font-semibold tracking-widest uppercase label-uppercase">
              Contact Us
            </span>
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-navy mt-3 mb-5 leading-tight">
              Invest with intent, invest with Fairhaven
            </h1>
            <p className="text-stone text-lg leading-relaxed mb-10">
              Tell us more about yourself and we will get in touch shortly.
            </p>

            <div className="rounded-lg border border-stone/20 bg-white p-6 mb-6">
              <h2 className="font-serif font-semibold text-navy mb-3">Our Office</h2>
              <address className="text-stone text-sm leading-relaxed not-italic">
                {siteConfig.address.line1}
                <br />
                {siteConfig.address.line2}
                <br />
                {siteConfig.address.city} {siteConfig.address.postcode}
                <br />
                {siteConfig.address.country}
              </address>
              <p className="text-stone text-sm mt-4">
                Email:{" "}
                <a href={`mailto:${siteConfig.email}`} className="text-teal underline hover:text-teal/80">
                  {siteConfig.email}
                </a>
              </p>
            </div>

            <p className="text-sm text-stone">
              For enquiries about a property we manage,{" "}
              <Link href="/pm-enquiry" className="text-gold underline hover:text-gold/80">
                click here
              </Link>
              .
            </p>
          </div>

          <div className="rounded-lg border border-stone/20 bg-white p-8">
            <ContactForm endpoint="/api/contact" />
          </div>
        </div>
      </Container>
    </section>
  );
}
