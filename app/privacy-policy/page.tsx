import type { Metadata } from "next";
import Container from "@/components/Container";
import { siteConfig } from "@/lib/site-config";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Privacy policy | Protect Your Privacy Today",
  description:
    "Understand how Fairhaven Property Group collects, uses, and safeguards your personal data according to global privacy laws.",
  path: "/privacy-policy",
});

const sections = [
  {
    title: "1. Introduction",
    body: `Fairhaven Property Group ("Fairhaven", "we", "us" or "our") is committed to protecting the privacy of individuals who interact with our website, services and investment offerings. This Privacy Policy explains how we collect, use, disclose and safeguard your personal information in accordance with the Privacy Act 2020 (New Zealand) and other applicable global privacy laws.`,
  },
  {
    title: "2. Information We Collect",
    body: `We may collect personal information including your name, email address, phone number, postal address, investment preferences, and any other information you voluntarily provide to us through our website forms, enquiries, or in the course of our business relationship with you.`,
  },
  {
    title: "3. How We Collect Information",
    body: `We collect information directly from you when you fill out a contact form, subscribe to our newsletter, submit a property management enquiry, or otherwise communicate with us. We may also collect information automatically through cookies and similar technologies when you browse our website.`,
  },
  {
    title: "4. Use of Your Information",
    body: `We use the personal information we collect to respond to your enquiries, provide our services, communicate updates about investment opportunities to wholesale investors, send newsletters (where you have opted in), improve our website and services, and comply with our legal and regulatory obligations.`,
  },
  {
    title: "5. Disclosure of Your Information",
    body: `We do not sell your personal information. We may share your information with trusted third-party service providers who assist us in operating our business (such as email delivery and hosting providers), professional advisers, and regulators or authorities where required by law.`,
  },
  {
    title: "6. Data Security",
    body: `We implement reasonable technical and organisational measures designed to protect your personal information from unauthorised access, loss, misuse or alteration. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.`,
  },
  {
    title: "7. Data Retention",
    body: `We retain personal information for as long as necessary to fulfil the purposes for which it was collected, including to satisfy legal, accounting or reporting requirements, after which it will be securely deleted or anonymised.`,
  },
  {
    title: "8. Your Rights",
    body: `Subject to applicable law, you have the right to request access to, correction of, or deletion of your personal information held by us, and to withdraw consent to marketing communications at any time. To exercise these rights, please contact us using the details below.`,
  },
  {
    title: "9. International Transfers",
    body: `As Fairhaven operates across New Zealand, Australia and Southeast Asia, your personal information may be transferred to, stored and processed in countries other than your country of residence. Where this occurs, we take steps to ensure your information continues to be protected in accordance with this Privacy Policy.`,
  },
  {
    title: "10. Contact Us & Changes to This Policy",
    body: `If you have any questions about this Privacy Policy or how we handle your personal information, please contact us at ${siteConfig.email}. We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements; any changes will be posted on this page.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <section className="py-24 bg-offwhite">
      <Container className="max-w-3xl">
        <span className="text-teal text-xs font-semibold tracking-widest uppercase label-uppercase">
          Legal
        </span>
        <h1 className="text-4xl md:text-5xl font-bold font-serif text-navy mt-3 mb-6">Privacy Policy</h1>
        <p className="text-stone text-lg leading-relaxed mb-14">
          This Privacy Policy sets out how Fairhaven Property Group collects, uses and protects your personal
          information in accordance with New Zealand and applicable international privacy laws.
        </p>

        <div className="space-y-10">
          {sections.map((section) => (
            <div key={section.title} className="pb-10 border-b border-stone/15 last:border-b-0">
              <h2 className="font-serif text-xl md:text-2xl font-semibold text-navy mb-3">{section.title}</h2>
              <p className="text-stone leading-relaxed">{section.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
