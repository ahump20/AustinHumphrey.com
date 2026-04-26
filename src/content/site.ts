type SiteLink = {
  label: string;
  href: string;
  external?: boolean;
};

export const SITE_TAGLINE = 'Born to Blaze the Path Beaten Less';
export const SITE_LOCATION = 'Boerne, Texas';
export const RESUME_PATH = '/Austin_Humphrey_Resume.pdf';
export const PRIMARY_EMAIL = 'Austin@BlazeSportsIntel.com';
export const ISSUE_DATELINE = 'Volume One · Portfolio Edition · Boerne, Texas';

/* ── Cover content ─────────────────────────────────────────────── */
export const HERO_V2 = {
  dateline: ISSUE_DATELINE,
  roles: ['Builder', 'Writer', 'Strategist'] as const,
  disciplines: 'Sports intelligence · Entertainment business · Applied AI',
  lede:
    'Four years of professional experience across advertising strategy and financial advising. Two years hands-on with Claude, Gemini, and ChatGPT. Independent sports intelligence work covering athletes, programs, and markets outside the coastal spotlight.',
  kickerStats: [
    { value: '4', label: 'Years Professional' },
    { value: '2', label: 'Years Applied AI' },
    { value: '3', label: 'Active Disciplines' },
  ],
  colophon: [
    { label: 'Based', value: 'Boerne, Texas' },
    { label: 'Experience', value: 'Spectrum Reach · Northwestern Mutual' },
    { label: 'Independent Work', value: 'Blaze Sports Intel' },
    { label: 'AI Practice', value: 'Claude · Gemini · ChatGPT' },
  ],
};

/* ── Issue Index — magazine table of contents ────────────────── */
export const ISSUE_INDEX = [
  {
    numeral: 'I',
    title: 'The Three Axes',
    subtitle: 'Sports intelligence, entertainment business, applied AI — the disciplines stacked under one builder.',
    targetId: 'disciplines',
    page: 'PG. 03',
  },
  {
    numeral: 'II',
    title: 'Curriculum Vitae',
    subtitle: 'Spectrum Reach. Northwestern Mutual. UT Austin. Full Sail. McCombs AI/ML. Professional and academic, side by side.',
    targetId: 'curriculum',
    page: 'PG. 06',
  },
  {
    numeral: 'III',
    title: 'Selected Work',
    subtitle: 'Five independent projects — sports intelligence, analytics, infrastructure, games, and applied AI practice.',
    targetId: 'selected-work',
    page: 'PG. 11',
  },
  {
    numeral: 'IV',
    title: 'Reading Room',
    subtitle: 'Editorial features, weekly recaps, and a speaking reel — the work argued in public.',
    targetId: 'reading-room',
    page: 'PG. 17',
  },
  {
    numeral: 'V',
    title: 'Origin',
    subtitle: 'Memphis-born, Texas-raised. Bartlett Blaze, the Forty Acres, and a Friday night standard.',
    targetId: 'origin',
    page: 'PG. 22',
  },
  {
    numeral: 'VI',
    title: 'Colophon',
    subtitle: 'Direct line, credits, and a closing note from the editor.',
    targetId: 'colophon',
    page: 'PG. 26',
  },
];

/* ── Three Discipline Axes ───────────────────────────────────── */
export const DISCIPLINE_AXES = [
  {
    numeral: '01',
    title: 'Sports Intelligence',
    desc:
      'Independent build on Cloudflare since 2023 — live scores, park-adjusted sabermetrics, and original editorial across MLB, NFL, NCAA football, NBA, and Division I college baseball. The work that demonstrates the craft under real deadlines.',
    proofLabel: 'See the work',
    proofHref: '#selected-work',
  },
  {
    numeral: '02',
    title: 'Entertainment Business',
    desc:
      'M.S. in Entertainment Business — Sports Management, Full Sail University (Feb 2026, 3.56 GPA). Twelve MBA-adjacent courses covering leadership, marketing, finance, legal, and operations — applied to sports industry strategy.',
    proofLabel: 'See the credentials',
    proofHref: '#curriculum',
  },
  {
    numeral: '03',
    title: 'Applied AI',
    desc:
      'Two years hands-on with Claude, Gemini, and ChatGPT. Deployed systems — sports data ingestion pipelines, editorial workflows, agentic prompting patterns. Formal grounding via UT Austin McCombs AI/ML postgrad (in progress).',
    proofLabel: 'See the practice',
    proofHref: '#selected-work',
  },
];

/* ── Curriculum Vitae — Professional + Academic ──────────────── */
export const PROFESSIONAL_EXPERIENCE = [
  {
    years: '2022 – 2025',
    role: 'Advertising Account Executive',
    employer: 'Spectrum Reach · Austin, TX',
    body:
      'Data-informed advertising strategies across linear TV, OTT/CTV, streaming, and digital for local and regional clients. Translated campaign performance into insights that drove renewals and strategic upsells. Three years turning numbers into decisions.',
    accolade: null as string | null,
  },
  {
    years: '2020 – 2022',
    role: 'Financial Representative',
    employer: 'Northwestern Mutual · San Antonio, TX',
    body:
      'Top-5 intern program. Converted to full-time advising role. Comprehensive financial plans through structured modeling, prospecting discipline, and consultative client relationships.',
    accolade: 'Power of 10 · Top 10% Nationally',
  },
];

export const ACADEMIC_CREDENTIALS = [
  {
    years: 'Apr 2026 — Cohort',
    degree: 'AI & Machine Learning Postgraduate Certificate',
    school: 'UT Austin McCombs School of Business',
    detail: 'Python · Supervised Learning · Deep Learning · NLP · Statistics',
    pill: 'In Progress',
  },
  {
    years: 'Feb 2026 — Graduated',
    degree: 'M.S. Entertainment Business — Sports Management',
    school: 'Full Sail University',
    detail: 'GPA 3.56 · Twelve MBA-adjacent courses · Sports analytics, media strategy, revenue models',
    pill: null as string | null,
  },
  {
    years: '2014 – 2020',
    degree: 'B.A. International Relations & Global Studies',
    school: 'University of Texas at Austin',
    detail: 'Minors: Economics · European Studies · Policy Analysis',
    pill: null as string | null,
  },
];

/* ── Selected Work gallery ─────────────────────────────────── */
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

export type WorkItem = {
  span: 'feature' | 'half' | 'third';
  role: string;
  year: string;
  title: string;
  titleEm?: string;
  lede: string;
  tech: string[];
  href: string | null;
  cta: string;
  image?: { src: string; srcSet: string; alt: string };
  practiceText?: string;
};

export const WORK_GALLERY: WorkItem[] = [
  {
    span: 'feature',
    role: 'Sports Intelligence Platform',
    year: '2023 – Present',
    title: 'Blaze Sports',
    titleEm: 'Intel',
    lede:
      'A sports intelligence platform that covers athletes, programs, and markets the coastal spotlight skips. Live scores, park-adjusted sabermetrics, and original editorial across MLB, NFL, NCAA football, NBA, and the full Division I college baseball field. Built and maintained independently on Cloudflare, end to end.',
    tech: ['Next.js', 'Cloudflare Workers', 'D1 · KV · R2', 'Hono', 'TypeScript'],
    href: PLATFORM_URLS.bsi,
    cta: 'Visit the platform',
    image: {
      src: '/assets/optimized/bsi-homepage-1024w.webp',
      srcSet: '/assets/optimized/bsi-homepage-640w.webp 640w, /assets/optimized/bsi-homepage-1024w.webp 1024w',
      alt: 'Blaze Sports Intel — homepage scoreboard and editorial layout',
    },
  },
  {
    span: 'half',
    role: 'Quality Auditor',
    year: '2026',
    title: 'BSI Radar',
    titleEm: 'Lab',
    lede:
      'Physics-based quality auditor for TrackMan pitch data. Six validation layers — Magnus model, SSW detection, calibration drift, physical bounds, release clustering, and fatigue tracking. All processing runs locally in the browser.',
    tech: ['React', 'Recharts', 'TypeScript', 'Vite'],
    href: PLATFORM_URLS.labs,
    cta: 'Open the lab',
    image: {
      src: '/assets/optimized/labs-screenshot-1024w.webp',
      srcSet: '/assets/optimized/labs-screenshot-640w.webp 640w, /assets/optimized/labs-screenshot-1024w.webp 1024w',
      alt: 'BSI Radar Lab — TrackMan pitch quality auditor',
    },
  },
  {
    span: 'half',
    role: 'Infrastructure UI',
    year: '2026',
    title: 'BlazeCraft',
    lede:
      'Warcraft 3-style system health dashboard for BSI infrastructure. Real-time monitoring with game-inspired UI and Durable Object state management.',
    tech: ['Cloudflare Pages', 'Workers', 'Durable Objects', 'Canvas2D'],
    href: PLATFORM_URLS.blazecraft,
    cta: 'View the dashboard',
    image: {
      src: '/assets/optimized/blazecraft-screenshot-1024w.webp',
      srcSet: '/assets/optimized/blazecraft-screenshot-640w.webp 640w, /assets/optimized/blazecraft-screenshot-1024w.webp 1024w',
      alt: 'BlazeCraft — system health dashboard with game-inspired UI',
    },
  },
  {
    span: 'third',
    role: 'Browser Game',
    year: '2026',
    title: 'Sandlot',
    titleEm: 'Sluggers',
    lede:
      'Browser-based 3D baseball arcade with four game modes, real college baseball rosters via the BSI API, and leaderboard integration.',
    tech: ['Three.js', 'JavaScript', 'Cloudflare Pages'],
    href: PLATFORM_URLS.arcade,
    cta: 'Play it',
    image: {
      src: '/assets/optimized/arcade-screenshot-1024w.webp',
      srcSet: '/assets/optimized/arcade-screenshot-640w.webp 640w, /assets/optimized/arcade-screenshot-1024w.webp 1024w',
      alt: 'Sandlot Sluggers — browser-based 3D baseball arcade',
    },
  },
  {
    span: 'third',
    role: 'Personal Archive',
    year: '2026',
    title: 'A Documented',
    titleEm: 'Heritage',
    lede:
      'Personal data archive with interactive D3 charts, a Three.js biomechanics viewer, and an ancestry globe.',
    tech: ['React', 'D3.js', 'Three.js'],
    href: PLATFORM_URLS.dna,
    cta: 'Open the archive',
    image: {
      src: '/assets/optimized/dna-screenshot-1024w.webp',
      srcSet: '/assets/optimized/dna-screenshot-640w.webp 640w, /assets/optimized/dna-screenshot-1024w.webp 1024w',
      alt: 'A Documented Heritage — personal data archive with interactive visualizations',
    },
  },
  {
    span: 'third',
    role: 'Discipline Plate',
    year: '2024 – Present',
    title: 'Applied AI',
    titleEm: 'Practice',
    lede:
      'Two years building deployed systems with Claude, Gemini, and ChatGPT — sports data ingestion pipelines, editorial workflows, and agentic prompting patterns that ship results, not demos. Formal grounding via UT Austin McCombs AI/ML postgrad (in progress).',
    tech: ['Claude', 'Gemini', 'ChatGPT', 'MCP'],
    href: null,
    cta: 'Continued in Origin →',
    practiceText: 'Deployed systems, not demos.',
  },
];

/* ── Reading Room — writing and speaking ───────────────────── */
export type ReadingPiece = {
  title: string;
  excerpt: string;
  tag: string;
  url: string;
  featured: boolean;
  readTime: string;
};

export const READING_ROOM: ReadingPiece[] = [
  {
    title: 'Big 12 Conference Baseball Preview 2026',
    excerpt:
      "A deep dive into every Big 12 program — from Texas Tech's rebuilt rotation to TCU's lineup depth. Conference realignment reshuffled the deck; here's how each team plays its hand.",
    tag: 'Conference Preview',
    url: 'https://blazesportsintel.com/college-baseball/editorial/big-12',
    featured: true,
    readTime: '22 min',
  },
  {
    title: 'SEC Conference Baseball Preview 2026',
    excerpt:
      'The deepest conference in college baseball just added Texas and Oklahoma. Sixteen programs, one question: can anyone dethrone the defending champions?',
    tag: 'Conference Preview',
    url: 'https://blazesportsintel.com/college-baseball/editorial/sec',
    featured: false,
    readTime: '18 min',
  },
  {
    title: 'Big Ten Conference Baseball Preview 2026',
    excerpt:
      'The Big Ten remade itself as a baseball conference. New programs, new facilities, new ambition — how every team stacks up in the expanded league.',
    tag: 'Conference Preview',
    url: 'https://blazesportsintel.com/college-baseball/editorial/big-ten',
    featured: false,
    readTime: '15 min',
  },
  {
    title: 'Texas Longhorns: Week 1 in Review',
    excerpt:
      "The Longhorns opened SEC play with a statement. Breaking down the pitching staff's evolution and what the numbers say about postseason trajectory.",
    tag: 'Team Analysis',
    url: 'https://blazesportsintel.com/blog-post-feed/texas-baseball-week-1-recap-lamar-preview-michigan-state-series-2026',
    featured: false,
    readTime: '8 min',
  },
  {
    title: 'Week 1 Recap: What We Learned',
    excerpt:
      'Opening weekend separated contenders from pretenders. Three takeaways from 200+ games across D1 baseball.',
    tag: 'Weekly Recap',
    url: 'https://blazesportsintel.com/college-baseball/editorial/week-1-recap',
    featured: false,
    readTime: '6 min',
  },
];

/* ── Origin narrative ─────────────────────────────────────────── */
export const ORIGIN_PROSE = [
  'Born in Memphis on August 17, 1995. Before Austin arrived, his parents brought soil from West Columbia, Texas and placed it beneath his mother in the delivery room. The doctor said, *"You know you ain\'t the first to do this, but they\'ve all been from Texas."* The next day the El Campo Leader-News ran the headline **Tennessee Birth Will Be on Texas Soil**. Not a gesture for a story later — a family continuation, one hundred and twenty-seven years long.',
  'Texas was never only geography. It was a standard for how to show up. Ricky Williams highlights, season tickets to the Forty Acres, Friday night football, and youth baseball at the local park all formed the same worldview. The games were the first place he learned what showing up meant — for teammates, for communities, for the people in the stands who needed something to believe in on a Friday night.',
  '**Blaze Sports Intel** was named from Bartlett Blaze, the dachshund whose name traces back to his first youth baseball team. The brand was not invented in a vacuum. It was remembered into form.',
];

export const ORIGIN_QUOTE = {
  text:
    'Texas isn’t a birthplace here. It’s a covenant with family, effort, and how you choose to carry yourself when nobody is obligated to care.',
  cite: 'A note in the margin · Boerne, 2026',
};

export const ORIGIN_PHILOSOPHY = {
  passion: 'Sports are my passion.',
  purpose: 'People are my purpose.',
};

export const ORIGIN_PHOTOS = [
  {
    src: '/assets/optimized/chargers-with-dad-1024w.webp',
    srcSet: '/assets/optimized/chargers-with-dad-640w.webp 640w, /assets/optimized/chargers-with-dad-1024w.webp 1024w',
    alt: 'Chargers #20 · post-game with Dad',
    span: 'span-7' as const,
  },
  {
    src: '/assets/optimized/blaze-dog-1024w.webp',
    srcSet: '/assets/optimized/blaze-dog-640w.webp 640w, /assets/optimized/blaze-dog-1024w.webp 1024w',
    alt: 'Bartlett Blaze · the namesake',
    span: 'span-5' as const,
  },
  {
    src: '/assets/optimized/baseball-with-father-1024w.webp',
    srcSet: '/assets/optimized/baseball-with-father-640w.webp 640w, /assets/optimized/baseball-with-father-1024w.webp 1024w',
    alt: 'Father and son at the ballpark',
    span: 'span-8' as const,
  },
  {
    src: '/assets/optimized/young-austin-longhorns-1024w.webp',
    srcSet: '/assets/optimized/young-austin-longhorns-640w.webp 640w, /assets/optimized/young-austin-longhorns-1024w.webp 1024w',
    alt: 'Longhorn allegiance · started early',
    span: 'span-4' as const,
  },
  {
    src: '/assets/optimized/birth-article-1024w.webp',
    srcSet: '/assets/optimized/birth-article-640w.webp 640w, /assets/optimized/birth-article-1024w.webp 1024w',
    alt: 'El Campo Leader-News · Tennessee Birth Will Be on Texas Soil',
    span: 'span-6' as const,
  },
  {
    src: '/assets/optimized/nana-graduation-1024w.webp',
    srcSet: '/assets/optimized/nana-graduation-640w.webp 640w, /assets/optimized/nana-graduation-1024w.webp 1024w',
    alt: 'Graduation day with Nana · Full Sail, 2026',
    span: 'span-6' as const,
  },
  {
    src: '/assets/optimized/last-game-silhouette-1024w.webp',
    srcSet: '/assets/optimized/last-game-silhouette-640w.webp 640w, /assets/optimized/last-game-silhouette-1024w.webp 1024w',
    alt: 'Last game · vs Seguin, 2013',
    span: 'span-12' as const,
  },
];

/* ── Navigation ───────────────────────────────────────────────── */
export const NAV_ITEMS = [
  { id: 'hero', label: 'Cover' },
  { id: 'index', label: 'Index' },
  { id: 'disciplines', label: 'Axes' },
  { id: 'curriculum', label: 'Curriculum' },
  { id: 'selected-work', label: 'Work' },
  { id: 'reading-room', label: 'Reading' },
  { id: 'origin', label: 'Origin' },
  { id: 'colophon', label: 'Colophon' },
] as const;

/* ── Colophon — closing magazine credits ─────────────────────── */
export type ContactChannelIcon = 'email' | 'linkedin' | 'github' | 'x' | 'resume';

export const COLOPHON_CHANNELS: Array<{
  label: string;
  value: string;
  href: string;
  icon: ContactChannelIcon;
  external?: boolean;
}> = [
  {
    label: 'Direct line',
    value: PRIMARY_EMAIL,
    href: PLATFORM_URLS.email,
    icon: 'email',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/ahump20',
    href: PLATFORM_URLS.linkedin,
    icon: 'linkedin',
    external: true,
  },
  {
    label: 'GitHub',
    value: 'github.com/ahump20',
    href: PLATFORM_URLS.github,
    icon: 'github',
    external: true,
  },
  {
    label: 'X / Twitter',
    value: '@BlazeSportsIntel',
    href: PLATFORM_URLS.x,
    icon: 'x',
    external: true,
  },
  {
    label: 'Curriculum Vitae',
    value: 'Download PDF',
    href: RESUME_PATH,
    icon: 'resume',
  },
];

export const COLOPHON_SPECS = [
  { label: 'Editor', value: 'Austin Humphrey' },
  { label: 'Based', value: SITE_LOCATION },
  { label: 'Set in', value: 'Fraunces · JetBrains Mono' },
  { label: 'Stack', value: 'React · TypeScript · Tailwind · Vite' },
  { label: 'Hosted by', value: 'Cloudflare Pages' },
  { label: 'Source', value: 'github.com/ahump20', valueLink: 'https://github.com/ahump20/AustinHumphrey.com' },
];

/* ── Footer link groups (keep for legacy use, but Colophon owns
   the closing surface; footer is now compact) ───────────────── */
export const FOOTER_LINK_GROUPS = [
  {
    title: 'Navigate',
    links: [
      { label: 'Issue Index', href: '#index' },
      { label: 'Selected Work', href: '#selected-work' },
      { label: 'Reading Room', href: '#reading-room' },
      { label: 'Curriculum Vitae', href: RESUME_PATH },
    ] satisfies SiteLink[],
  },
  {
    title: 'Connect',
    links: [
      { label: 'Email', href: PLATFORM_URLS.email },
      { label: 'LinkedIn', href: PLATFORM_URLS.linkedin, external: true },
      { label: 'GitHub', href: PLATFORM_URLS.github, external: true },
      { label: 'X / Twitter', href: PLATFORM_URLS.x, external: true },
    ] satisfies SiteLink[],
  },
] as const;
