// Central site configuration — edit contact details and links here.
export const SITE = {
  name: 'Offshore Africa Magazine',
  tagline: 'Your Leading Energy & Mining Industry Resource',
  description:
    "Offshore Africa Magazine is Africa's premier monthly publication delivering expert opinion, in-depth analysis, and key insights into the continent's energy, mining, oil, and gas industries.",
  url: 'https://offshoreafricamagazine.net',
  domain: 'offshoreafricamagazine.net',
};

export const CONTACT = {
  email: 'hello@offshoreafricamagazine.net',
  phonePrimary: '+233 (0)54 739 5411',
  phoneSecondary: '+233 (0)24 572 7780',
  instagram: 'offshoreafricamagazine',
  instagramUrl: 'https://instagram.com/offshoreafricamagazine',
  address: 'Accra, Ghana',
};

export const NAV = [
  { label: 'Home', href: '/' },
  { label: 'Articles', href: '/articles/' },
  { label: 'Issues', href: '/issues/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
  { label: 'Subscribe', href: '/subscribe/' },
  { label: 'Advertise', href: '/advertise/' },
];

// Category cards shown on the homepage "Industry Sections" strip.
export const INDUSTRY_SECTIONS = [
  {
    name: 'Oil & Gas',
    blurb: 'Upstream exploration, offshore developments and field updates.',
  },
  {
    name: 'Mining',
    blurb: "Gold, bauxite, lithium and the minerals powering Africa's growth.",
  },
  {
    name: 'Downstream',
    blurb: 'Refining, distribution, retail and petrochemical value chains.',
  },
  {
    name: 'Company News',
    blurb: 'Deals, appointments and corporate moves across the industry.',
  },
];
