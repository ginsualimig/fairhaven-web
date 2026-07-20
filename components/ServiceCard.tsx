"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  icon?: ReactNode;
  metric?: string;
}

export default function ServiceCard({ title, description, href, icon, metric }: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        boxShadow: "0 16px 40px rgba(15,23,42,0.14)",
        backgroundColor: "rgba(74,155,142,0.04)",
      }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="rounded-lg border border-stone/20 bg-white overflow-hidden h-full"
    >
      <Link href={href} className="group block p-8 h-full hover:border-teal/60 transition-colors duration-300">
        {icon && (
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-sm bg-navy/5 text-teal group-hover:bg-teal/10 transition-colors">
            {icon}
          </div>
        )}
        {metric && <div className="text-2xl font-bold text-gold font-serif mb-2">{metric}</div>}
        <h3 className="text-navy font-semibold text-lg mb-2 font-serif group-hover:text-teal transition-colors">
          {title}
        </h3>
        <p className="text-stone text-sm leading-relaxed">{description}</p>
        <div className="mt-4 inline-flex items-center text-sm text-gold font-medium gap-1">
          <span>Learn more</span>
          <span className="arrow-animate group-hover:translate-x-1.5 transition-transform inline-block">→</span>
        </div>
      </Link>
    </motion.div>
  );
}
