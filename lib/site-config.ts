export const siteConfig = {
  name: "Fairhaven Property Group",
  legalName: "Fairhaven Property Group Limited",
  shortName: "Fairhaven",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://fairhaven-web.vercel.app",
  description:
    "Fairhaven Property Group is a Dunedin-based property investment manager offering discretionary fund management, cross-border deal sourcing, and property management & optimisation across New Zealand, Australia and Southeast Asia.",
  keywords: [
    "Fairhaven Property Group",
    "Fairhaven Advisory",
    "Dunedin property investment",
    "discretionary fund management New Zealand",
    "wholesale investor property fund",
    "property deal sourcing NZ Australia",
    "property management Dunedin",
    "New Zealand property fund",
  ],
  email: "info@fairhavenproperty.co.nz",
  phone: "",
  address: {
    line1: "First Floor, Harvest Court",
    line2: "218 George Street",
    suburb: "",
    city: "Dunedin",
    postcode: "9016",
    country: "New Zealand",
    countryCode: "NZ",
  },
  social: {
    facebook: "https://www.facebook.com/fairhavenproperty",
    instagram: "https://www.instagram.com/fairhaven.nz",
  },
  charityPartner: {
    name: "B1G1",
    url: "https://www.b1g1.com",
  },
};

export type NavLink = {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "What We Do",
    href: "/what-we-do",
    children: [
      {
        label: "Discretionary Fund Management",
        href: "/discretionary-fund",
        description: "Wholesale-investor property fund targeting ~15% net p.a.",
      },
      {
        label: "Deal Sourcing",
        href: "/deal-sourcing",
        description: "Off-market property opportunities across NZ, AU, SG, MY & SEA",
      },
      {
        label: "Property Management",
        href: "/property-management",
        description: "Hands-on management & optimisation for investment property",
      },
    ],
  },
  { label: "About Us", href: "/about-us" },
  { label: "Charity Initiatives", href: "/charity-initiatives" },
  { label: "News & Insights", href: "/news-insights" },
  { label: "Contact Us", href: "/contact-us" },
];

export const footerLinkGroups = [
  {
    title: "What We Do",
    links: [
      { label: "Discretionary Fund Management", href: "/discretionary-fund" },
      { label: "Deal Sourcing", href: "/deal-sourcing" },
      { label: "Property Management", href: "/property-management" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Charity Initiatives", href: "/charity-initiatives" },
      { label: "News & Insights", href: "/news-insights" },
    ],
  },
  {
    title: "Get in Touch",
    links: [
      { label: "Contact Us", href: "/contact-us" },
      { label: "Property Management Enquiry", href: "/pm-enquiry" },
      { label: "Privacy Policy", href: "/privacy-policy" },
    ],
  },
];
