import { ButtonLink } from "./Button";
import MagneticButton from "./MagneticButton";
import Reveal from "./Reveal";

interface CTASectionProps {
  eyebrow?: string;
  heading: string;
  subheading: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function CTASection({
  eyebrow,
  heading,
  subheading,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: CTASectionProps) {
  return (
    <section className="bg-navy py-20 px-6">
      <Reveal>
        <div className="mx-auto max-w-3xl text-center">
          {eyebrow && (
            <span className="inline-block text-teal text-xs font-semibold tracking-widest uppercase mb-4 label-uppercase">
              {eyebrow}
            </span>
          )}
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-offwhite mb-4">{heading}</h2>
          <p className="text-offwhite/70 text-lg mb-10 leading-relaxed">{subheading}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton>
              <ButtonLink href={primaryHref} variant="primary">
                {primaryLabel}
              </ButtonLink>
            </MagneticButton>
            {secondaryLabel && secondaryHref && (
              <MagneticButton>
                <ButtonLink href={secondaryHref} variant="outline">
                  {secondaryLabel}
                </ButtonLink>
              </MagneticButton>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
