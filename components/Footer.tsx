import Link from "next/link";
import Image from "next/image";
import { footerLinkGroups, siteConfig } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="bg-navy text-offwhite/70 border-t border-gold/20">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          <div className="md:col-span-2">
            <Image
              src="/logos/logo-property-white.svg"
              alt="Fairhaven Property Group"
              width={220}
              height={46}
              unoptimized
              className="h-9 w-auto mb-4"
            />
            <p className="text-sm leading-relaxed max-w-xs mb-6">
              Discretionary fund management, cross-border deal sourcing, and property management &amp;
              optimisation — headquartered in Dunedin, New Zealand.
            </p>
            <address className="not-italic text-sm leading-relaxed mb-6">
              {siteConfig.address.line1}
              <br />
              {siteConfig.address.line2}
              <br />
              {siteConfig.address.city} {siteConfig.address.postcode}, {siteConfig.address.country}
            </address>
            <div className="flex items-center gap-4">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Fairhaven Property Group on Facebook"
                className="text-offwhite/60 hover:text-gold transition-colors"
              >
                Facebook
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Fairhaven Property Group on Instagram"
                className="text-offwhite/60 hover:text-gold transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>

          {footerLinkGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-offwhite text-sm font-semibold mb-4 tracking-wider uppercase label-uppercase">
                {group.title}
              </h3>
              <ul className="space-y-2">
                {group.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm hover:text-gold transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gold/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-offwhite/40">
            © {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </p>
          <p className="text-xs text-offwhite/40">Dunedin, New Zealand</p>
        </div>
      </div>
    </footer>
  );
}
