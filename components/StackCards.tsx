"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export interface StackCardData {
  eyebrow: string;
  title: string;
  description: string;
  metric: string;
  href: string;
  image: string;
  imageAlt: string;
}

function Card({ data, index, total }: { data: StackCardData; index: number; total: number }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });

  const isLast = index === total - 1;
  const scale = useTransform(scrollYProgress, [0.6, 1], [1, reduceMotion || isLast ? 1 : 0.9]);
  const dim = useTransform(scrollYProgress, [0.6, 1], [0, reduceMotion || isLast ? 0 : 0.5]);

  return (
    <div ref={trackRef} className="relative" style={{ height: isLast ? "100vh" : "180vh" }}>
      <div className="sticky top-0 h-screen flex items-center justify-center px-6" style={{ zIndex: index + 1 }}>
        <motion.div
          style={{ scale, top: `${index * 14}px` }}
          className="relative w-full max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-2xl shadow-navy/40 aspect-[4/5] sm:aspect-[16/10] md:aspect-[21/9]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.image} alt={data.imageAlt} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/10" />
          <motion.div className="absolute inset-0 bg-navy pointer-events-none" style={{ opacity: dim }} />

          <div className="relative h-full flex flex-col justify-end p-8 md:p-14">
            <span className="text-teal text-xs font-semibold tracking-widest uppercase label-uppercase mb-4">
              {data.eyebrow}
            </span>
            <div className="flex items-end justify-between gap-6 flex-wrap mb-4">
              <h3 className="text-3xl md:text-5xl font-bold font-serif text-offwhite leading-tight max-w-xl">
                {data.title}
              </h3>
              <span className="text-2xl md:text-4xl font-bold font-serif text-gold shrink-0">{data.metric}</span>
            </div>
            <p className="text-offwhite/70 text-base md:text-lg leading-relaxed max-w-2xl mb-6">{data.description}</p>
            <Link
              href={data.href}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold/80 transition-colors w-fit"
            >
              Learn more
              <span className="group-hover:translate-x-1.5 transition-transform">→</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function StackCards({ cards }: { cards: StackCardData[] }) {
  return (
    <div className="relative bg-navy">
      {cards.map((card, i) => (
        <Card key={card.title} data={card} index={i} total={cards.length} />
      ))}
    </div>
  );
}
