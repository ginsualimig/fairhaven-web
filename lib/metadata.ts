import type { Metadata } from "next";
import { siteConfig } from "./site-config";

export function pageMetadata({
  title,
  description,
  path = "/",
  ogImage = "/og-image.png",
}: {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const fullTitle = path === "/" ? title : `${title} | ${siteConfig.name}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      images: [{ url: ogImage }],
      locale: "en_NZ",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Dunedin Property Investment & Management`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    sameAs: [siteConfig.social.facebook, siteConfig.social.instagram],
    address: {
      "@type": "PostalAddress",
      streetAddress: `${siteConfig.address.line1}, ${siteConfig.address.line2}`,
      addressLocality: siteConfig.address.city,
      postalCode: siteConfig.address.postcode,
      addressCountry: siteConfig.address.countryCode,
    },
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: siteConfig.legalName,
    image: `${siteConfig.url}/logo.png`,
    url: siteConfig.url,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${siteConfig.address.line1}, ${siteConfig.address.line2}`,
      addressLocality: siteConfig.address.city,
      postalCode: siteConfig.address.postcode,
      addressCountry: siteConfig.address.countryCode,
    },
    areaServed: ["New Zealand", "Australia", "Singapore", "Malaysia", "Southeast Asia"],
    sameAs: [siteConfig.social.facebook, siteConfig.social.instagram],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}
