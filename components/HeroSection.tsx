"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ButtonLink } from "./Button";
import MagneticButton from "./MagneticButton";

interface HeroSectionProps {
  eyebrow?: string;
  heading: string;
  subheading: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  compact?: boolean;
  image?: string;
  imageAlt?: string;
}

const textVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.85, ease: [0.21, 0.47, 0.32, 0.98] as const } },
};

export default function HeroSection({
  eyebrow,
  heading,
  subheading,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  compact = false,
  image,
  imageAlt = "",
}: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : 1.25]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 80]);
  const sinkOpacity = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 0.9]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, reduceMotion ? 1 : 0]);

  return (
    <section ref={sectionRef} className="relative bg-navy overflow-hidden">
      {image && (
        <motion.div className="absolute inset-0" style={{ scale: imageScale, y: imageY }}>
          <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="object-cover object-center" />
        </motion.div>
      )}
      <div
        className={`absolute inset-0 pointer-events-none ${
          image
            ? "bg-gradient-to-r from-navy via-navy/85 to-navy/50"
            : "bg-gradient-to-br from-navy via-navy to-teal/10"
        }`}
      />
      {image && <motion.div className="absolute inset-0 bg-navy pointer-events-none" style={{ opacity: sinkOpacity }} />}
      {!image && (
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      )}

      <motion.div
        className={`relative mx-auto max-w-7xl px-6 ${compact ? "py-20 md:py-28" : "py-28 md:py-40"}`}
        style={{ opacity: contentOpacity }}
      >
        <motion.div className="max-w-3xl" variants={textVariants} initial="hidden" animate="show">
          {eyebrow && (
            <motion.span
              variants={itemVariants}
              className="inline-block text-teal text-xs font-semibold tracking-widest uppercase mb-5 label-uppercase"
            >
              {eyebrow}
            </motion.span>
          )}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-offwhite leading-tight mb-6"
          >
            {heading}
          </motion.h1>
          <motion.p variants={itemVariants} className="text-offwhite/65 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
            {subheading}
          </motion.p>
          {(primaryLabel || secondaryLabel) && (
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {primaryLabel && primaryHref && (
                <MagneticButton>
                  <ButtonLink href={primaryHref} variant="primary">
                    {primaryLabel}
                  </ButtonLink>
                </MagneticButton>
              )}
              {secondaryLabel && secondaryHref && (
                <MagneticButton>
                  <ButtonLink href={secondaryHref} variant="outline">
                    {secondaryLabel}
                  </ButtonLink>
                </MagneticButton>
              )}
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
    </section>
  );
}
