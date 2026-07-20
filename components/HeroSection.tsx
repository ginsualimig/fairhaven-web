import { ButtonLink } from "./Button";

interface HeroSectionProps {
  eyebrow?: string;
  heading: string;
  subheading: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  compact?: boolean;
}

export default function HeroSection({
  eyebrow,
  heading,
  subheading,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  compact = false,
}: HeroSectionProps) {
  return (
    <section className="relative bg-navy overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-teal/10 pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className={`relative mx-auto max-w-7xl px-6 ${compact ? "py-20 md:py-28" : "py-28 md:py-40"}`}>
        <div className="max-w-3xl">
          {eyebrow && (
            <span className="inline-block text-teal text-xs font-semibold tracking-widest uppercase mb-5 label-uppercase">
              {eyebrow}
            </span>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-offwhite leading-tight mb-6">
            {heading}
          </h1>
          <p className="text-offwhite/65 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
            {subheading}
          </p>
          {(primaryLabel || secondaryLabel) && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {primaryLabel && primaryHref && (
                <ButtonLink href={primaryHref} variant="primary">
                  {primaryLabel}
                </ButtonLink>
              )}
              {secondaryLabel && secondaryHref && (
                <ButtonLink href={secondaryHref} variant="outline">
                  {secondaryLabel}
                </ButtonLink>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
    </section>
  );
}
