type SiteLink = {
  label: string;
  href: string;
  external?: boolean;
};

export const SITE_TAGLINE = 'Born to Blaze the Path Beaten Less';
export const SITE_LOCATION = 'Boerne, Texas';
export const RESUME_PATH = '/Austin_Humphrey_Resume.pdf';
export const PRIMARY_EMAIL = 'Austin@BlazeSportsIntel.com';

/* V2 — Three Discipline Axes */
export const DISCIPLINE_AXES = [
  {
    numeral: '01',
    title: 'Sports Intelligence',
    desc:
      'Solo build on Cloudflare since 2023 — live scores, park-adjusted sabermetrics, and original editorial across MLB, NFL, NCAA football, NBA, and Division I college baseball. The work that demonstrates the craft under real deadlines.',
    proofLabel: 'See the platform',
    proofHref: '#bsi',
  },
  {
    numeral: '02',
    title: 'Entertainment Business',
    desc:
      'M.S. in Entertainment Business — Sports Management, Full Sail University (Feb 2026, 3.56 GPA). Twelve MBA-adjacent courses covering leadership, marketing, finance, legal, and operations — applied to sports industry strategy.',
    proofLabel: 'See the coursework',
    proofHref: '#education',
  },
  {
    numeral: '03',
    title: 'Applied AI',
    desc:
      'Two years hands-on with Claude, Gemini, and ChatGPT. Deployed systems — sports data ingestion pipelines, editorial workflows, agentic prompting patterns. Formal grounding via UT Austin McCombs AI/ML postgrad (in progress).',
    proofLabel: 'See the AI practice',
    proofHref: '#ai-practice',
  },
];

/* V2 Hero Masthead content — firewalled positioning */
export const HERO_V2 = {
  dateline: 'Volume One · Portfolio Edition · Boerne, Texas',
  roles: ['Builder', 'Writer', 'Strategist'] as const,
  disciplines: 'Sports intelligence · Entertainment business · Applied AI',
  lede:
    'Four years of professional experience across advertising strategy and financial advising. Two years hands-on with Claude, Gemini, and ChatGPT. One sports intelligence platform — Blaze Sports Intel — built and maintained solo as a passion project.',
  kickerStats: [
    { value: '4', label: 'Years Professional' },
    { value: '2', label: 'Years Applied AI' },
    { value: '3', label: 'Active Disciplines' },
  ],
  colophon: [
    { label: 'Based', value: 'Boerne, Texas' },
    { label: 'Experience', value: 'Spectrum Reach · Northwestern Mutual' },
    { label: 'Passion Project', value: 'Blaze Sports Intel' },
    { label: 'AI Practice', value: 'Claude · Gemini · ChatGPT' },
  ],
};

export const PLATFORM_URLS = {
  bsi: 'https://blazesportsintel.com',
  blazecraft: 'https://blazecraft.app',
  labs: 'https://labs.blazesportsintel.com',
  arcade: 'https://arcade.blazesportsintel.com',
  dna: 'https://dna.austinhumphrey.com',
  linkedin: 'https://linkedin.com/in/ahump20',
  github: 'https://github.com/ahump20',
  x: 'https://x.com/BlazeSportsIntel',
  email: `mailto:${PRIMARY_EMAIL}`,
} as const;

export const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'projects', label: 'Work' },
  { id: 'proof', label: 'Proof' },
  { id: 'bsi', label: 'BSI' },
  { id: 'origin', label: 'Origin' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
] as const;

export const FOOTER_LINK_GROUPS = [
  {
    title: 'Navigate',
    links: [
      { label: 'Work', href: '#projects' },
      { label: 'Proof', href: '#proof' },
      { label: 'BSI', href: '#bsi' },
      { label: 'Origin', href: '#origin' },
      { label: 'Contact', href: '#contact' },
    ] satisfies SiteLink[],
  },
  {
    title: 'BSI',
    links: [
      { label: 'BlazeSportsIntel.com', href: PLATFORM_URLS.bsi, external: true },
      { label: 'BSI Radar Lab', href: PLATFORM_URLS.labs, external: true },
      { label: 'BlazeCraft Dashboard', href: PLATFORM_URLS.blazecraft, external: true },
      { label: 'BSI Arcade', href: PLATFORM_URLS.arcade, external: true },
      { label: 'A Documented Heritage', href: PLATFORM_URLS.dna, external: true },
      { label: 'BSI Editorial', href: 'https://blazesportsintel.com/#editorial', external: true },
      { label: 'BSI Podcast', href: 'https://blazesportsintel.com/podcast', external: true },
    ] satisfies SiteLink[],
  },
  {
    title: 'Social',
    links: [
      { label: 'LinkedIn', href: PLATFORM_URLS.linkedin, external: true },
      { label: 'GitHub', href: PLATFORM_URLS.github, external: true },
      { label: 'X / Twitter', href: PLATFORM_URLS.x, external: true },
      { label: 'Email', href: PLATFORM_URLS.email },
    ] satisfies SiteLink[],
  },
] as const;

export type ContactChannelIcon = 'email' | 'linkedin' | 'bsi' | 'github' | 'x';

export const CONTACT_CHANNELS: Array<{
  label: string;
  value: string;
  href: string;
  icon: ContactChannelIcon;
}> = [
  {
    label: 'Email',
    value: PRIMARY_EMAIL,
    href: PLATFORM_URLS.email,
    icon: 'email',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/ahump20',
    href: PLATFORM_URLS.linkedin,
    icon: 'linkedin',
  },
  {
    label: 'BSI',
    value: 'BlazeSportsIntel.com',
    href: PLATFORM_URLS.bsi,
    icon: 'bsi',
  },
  {
    label: 'GitHub',
    value: 'github.com/ahump20',
    href: PLATFORM_URLS.github,
    icon: 'github',
  },
  {
    label: 'X',
    value: '@BlazeSportsIntel',
    href: PLATFORM_URLS.x,
    icon: 'x',
  },
];

export const PORTFOLIO_PROJECTS = {
  featured: [
    {
      name: 'Blaze Sports Intel',
      description:
        'Live scores, park-adjusted sabermetrics, and original editorial covering sports outside the coastal spotlight. College baseball across every D1 program. Built solo on Cloudflare, end to end.',
      tech: ['Next.js', 'Cloudflare Workers', 'D1', 'Hono'],
      url: PLATFORM_URLS.bsi,
      highlight: 'Flagship',
      live: true,
    },
    {
      name: 'BSI Radar Lab',
      description:
        'Physics-based quality auditor for TrackMan pitch data. Six validation layers — Magnus model, SSW detection, calibration drift, physical bounds, release clustering, and fatigue tracking. All processing runs locally in the browser.',
      tech: ['React', 'Recharts', 'TypeScript', 'Vite'],
      url: PLATFORM_URLS.labs,
      highlight: 'Analytics',
      live: true,
    },
  ],
  supporting: [
    {
      name: 'BlazeCraft',
      description:
        'Warcraft 3: Frozen Throne-style system health dashboard for BSI infrastructure. Real-time monitoring with game-inspired UI and Durable Object state management.',
      tech: ['Cloudflare Pages', 'Workers', 'Durable Objects', 'Canvas2D'],
      url: PLATFORM_URLS.blazecraft,
      highlight: 'DevOps',
      live: true,
    },
    {
      name: 'Sandlot Sluggers',
      description:
        'Browser-based 3D baseball arcade with four game modes, real college baseball rosters via BSI API, and leaderboard integration.',
      tech: ['Three.js', 'JavaScript', 'Cloudflare Pages'],
      url: PLATFORM_URLS.arcade,
      highlight: 'Game',
      live: true,
    },
    {
      name: 'A Documented Heritage',
      description:
        'Personal data archive with interactive D3 charts, Three.js biomechanics viewer, and ancestry globe.',
      tech: ['React', 'D3.js', 'Three.js'],
      url: PLATFORM_URLS.dna,
      highlight: 'Data Viz',
      live: false,
    },
  ],
} as const;

export const BSI_SHOWCASE = {
  stats: [
    { value: 'MLB', label: 'Professional Baseball' },
    { value: 'NFL', label: 'Professional Football' },
    { value: 'NBA', label: 'Professional Basketball' },
    { value: 'D1', label: 'College Baseball · Football · Basketball' },
  ],
  architecture: [
    { label: 'External APIs', sub: 'Highlightly · SportsDataIO · ESPN' },
    { label: 'Workers', sub: 'Dozens of edge-powered specialists' },
    { label: 'Storage', sub: 'D1 · KV · R2' },
    { label: 'UI', sub: 'Next.js static export' },
  ],
  leagues: [
    { name: 'College Baseball', note: 'Flagship' },
    { name: 'MLB', note: 'Scores + Standings' },
    { name: 'NFL', note: 'Scores + Standings' },
    { name: 'NCAA Football', note: 'Scores + Standings' },
    { name: 'NBA', note: 'Scores + Standings' },
    { name: 'NCAA Basketball', note: 'Scores + Standings' },
  ],
  techStack: [
    'Cloudflare Workers',
    'D1/KV/R2',
    'Hono',
    'Next.js',
    'TypeScript',
    'Playwright',
  ],
} as const;
