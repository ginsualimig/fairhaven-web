"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { navLinks } from "@/lib/site-config";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-gold/20 bg-navy/95 backdrop-blur transition-shadow duration-300 ${
        scrolled ? "shadow-[0_2px_16px_0_rgba(0,0,0,0.35)]" : "shadow-none"
      }`}
    >
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2" aria-label="Fairhaven Property Group home">
          <span className="text-gold font-serif font-bold text-xl tracking-tight">Fairhaven</span>
          <span className="hidden sm:inline text-offwhite/70 text-xs uppercase tracking-widest label-uppercase mt-1">
            Property Group
          </span>
        </Link>

        <ul className="hidden lg:flex items-center gap-7">
          {navLinks.map((l) => (
            <li
              key={l.href}
              className="relative"
              onMouseEnter={() => l.children && setDropdownOpen(true)}
              onMouseLeave={() => l.children && setDropdownOpen(false)}
            >
              <Link
                href={l.href}
                className="text-sm text-offwhite/80 hover:text-gold transition-colors duration-200"
              >
                {l.label}
              </Link>
              {l.children && dropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-72 z-50">
                  <div className="bg-white rounded-lg shadow-xl border border-stone/10 overflow-hidden">
                    {l.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className="block px-5 py-4 hover:bg-teal/5 border-b border-stone/10 last:border-b-0 transition-colors"
                      >
                        <div className="text-navy text-sm font-semibold font-serif">{c.label}</div>
                        {c.description && <div className="text-stone text-xs mt-1">{c.description}</div>}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        <button
          className="lg:hidden text-offwhite p-2"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`block w-5 h-0.5 bg-current mb-1 transition-transform ${open ? "translate-y-1.5 rotate-45" : ""}`} />
          <span className={`block w-5 h-0.5 bg-current mb-1 transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-current transition-transform ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
        </button>
      </nav>

      {open && (
        <div className="lg:hidden bg-navy border-t border-gold/20 px-6 pb-4">
          <ul className="flex flex-col gap-1 pt-4">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="block py-2 text-offwhite/80 hover:text-gold text-sm transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
                {l.children && (
                  <ul className="pl-4 border-l border-gold/20 ml-1 mb-2">
                    {l.children.map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          className="block py-1.5 text-offwhite/60 hover:text-gold text-xs transition-colors"
                          onClick={() => setOpen(false)}
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
