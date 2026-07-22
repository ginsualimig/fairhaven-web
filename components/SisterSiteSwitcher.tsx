"use client";

import Image from "next/image";
import { useState } from "react";

type SisterSiteSwitcherProps = {
  current: "property" | "advisory";
};

const sites = {
  property: {
    name: "Fairhaven Property Group",
    descriptor: "Property investment & management",
    href: "https://fairhavenproperty.co.nz",
    logo: "/logos/logo-property-white.svg",
  },
  advisory: {
    name: "Fairhaven Advisory",
    descriptor: "Strategic advisory & partnerships",
    href: "https://fairhavenadvisory.co.nz",
    logo: "/logos/logo-option-c-white.svg",
  },
} as const;

export default function SisterSiteSwitcher({ current }: SisterSiteSwitcherProps) {
  const [open, setOpen] = useState(false);
  const active = sites[current];

  return (
    <div className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={`Choose Fairhaven business unit (currently ${active.name})`}
        onClick={() => setOpen((value) => !value)}
        className="group flex items-center gap-2 rounded-sm p-1 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
      >
        <Image src={active.logo} alt={active.name} width={220} height={46} priority unoptimized className="h-8 w-auto sm:h-9" />
        <svg aria-hidden="true" viewBox="0 0 12 8" className={`mt-0.5 h-2 w-3 shrink-0 text-gold transition-transform ${open ? "rotate-180" : ""}`} fill="none">
          <path d="m1 1.5 5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <>
          <button type="button" aria-label="Close business unit menu" className="fixed inset-0 z-40 cursor-default" onClick={() => setOpen(false)} />
          <div role="menu" className="absolute left-0 top-full z-50 mt-3 w-80 overflow-hidden rounded-lg border border-gold/20 bg-white p-2 shadow-[0_16px_40px_rgba(15,23,42,0.22)]">
            <div className="px-3 pb-2 pt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-stone">Fairhaven business units</div>
            {(Object.keys(sites) as Array<keyof typeof sites>).map((key) => {
              const site = sites[key];
              const isCurrent = key === current;
              return (
                <a
                  key={key}
                  href={site.href}
                  role="menuitem"
                  aria-current={isCurrent ? "page" : undefined}
                  className={`group flex items-center gap-3 rounded-md px-3 py-3 transition-colors ${isCurrent ? "bg-navy/[0.06]" : "hover:bg-teal/[0.07]"}`}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-navy p-1.5">
                    <Image src={site.logo} alt="" width={220} height={46} unoptimized className="h-auto w-full" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-serif text-sm font-semibold text-navy">{site.name}</span>
                    <span className="mt-0.5 block text-xs text-stone">{site.descriptor}</span>
                  </span>
                  {isCurrent ? <span className="text-[10px] font-semibold uppercase tracking-wider text-teal">Current</span> : <span aria-hidden="true" className="text-lg text-gold opacity-0 transition-opacity group-hover:opacity-100">↗</span>}
                </a>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
