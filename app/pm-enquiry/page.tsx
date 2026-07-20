import type { Metadata } from "next";
import Container from "@/components/Container";
import ContactForm from "@/components/ContactForm";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Property Management Enquiry Form | Contact Us Today",
  description:
    "Fill out the Property Management Enquiry Form to connect with Fairhaven Property Group about leasing opportunities or concerns.",
  path: "/pm-enquiry",
});

export default function PmEnquiryPage() {
  return (
    <section className="py-24 bg-offwhite">
      <Container className="max-w-2xl">
        <div className="text-center mb-12">
          <span className="text-teal text-xs font-semibold tracking-widest uppercase label-uppercase">
            Property Management
          </span>
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-navy mt-3 mb-5 leading-tight">
            Property Management Enquiry Form
          </h1>
          <p className="text-stone text-lg leading-relaxed">
            Please leave a message if you are interested in leasing one of our properties or have any questions or
            feedback regarding our listings. A team member will respond to you promptly.
          </p>
        </div>

        <div className="rounded-lg border border-stone/20 bg-white p-8">
          <ContactForm
            endpoint="/api/pm-enquiry"
            extraField={{
              name: "propertyAddress",
              label: "Property / listing address",
              placeholder: "Which property is your enquiry about?",
            }}
            messageLabel="Your enquiry"
            messagePlaceholder="Tell us about your leasing enquiry, question or feedback…"
            submitLabel="Send Enquiry"
          />
        </div>
      </Container>
    </section>
  );
}
