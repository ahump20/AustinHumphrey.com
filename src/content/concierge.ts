import { PLATFORM_URLS, PRIMARY_EMAIL } from './site';

function getTimeGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export const AI_CHAT_GREETING = `${getTimeGreeting()}. Austin Humphrey — builder, BSI architect, Texas-born. Ask me anything.`;

export const AI_CHAT_SUGGESTED_PROMPTS = [
  'What is BSI?',
  'Tell me about the Texas soil',
  "What's the tech stack?",
  'What makes BSI different?',
] as const;

export const AI_CHAT_FALLBACK_RESPONSES: Array<{
  keywords: string[];
  response: string;
}> = [
  {
    keywords: ['bsi', 'blaze', 'sports intel', 'platform'],
    response:
      'Blaze Sports Intel covers what mainstream media overlooks — live scores, park-adjusted sabermetrics, and original editorial across six leagues. 330+ D1 college baseball programs tracked with advanced analytics. Dozens of edge workers, multiple databases, all built and maintained by one person.',
  },
  {
    keywords: ['different', 'unique', 'special', 'why', 'gap'],
    response:
      'The gap BSI fills: nobody else provides advanced analytics for a Tuesday night college baseball game between Rice and Sam Houston. Mainstream sports media covers 20 programs. BSI covers 330. Park-adjusted wOBA, FIP, wRC+ — real sabermetrics for the games people care about but can\'t find data for.',
  },
  {
    keywords: ['sabermetric', 'analytics', 'woba', 'fip', 'wrc', 'stats', 'metric', 'savant'],
    response:
      'BSI Savant computes park-adjusted sabermetrics every 6 hours — wOBA, wRC+, FIP, ERA- across all 330 D1 programs. Park factors are recalculated weekly. Conference strength indexes weight the competition. The same level of analytics MLB teams use, applied to college baseball.',
  },
  {
    keywords: ['contact', 'email', 'hire', 'reach', 'direct', 'connect'],
    response:
      `Reach Austin directly at ${PRIMARY_EMAIL}, on LinkedIn at ${PLATFORM_URLS.linkedin.replace('https://', '')}, or on X at @BlazeSportsIntel. No gatekeepers — Austin reads every message himself.`,
  },
  {
    keywords: ['texas', 'soil', 'origin', 'born', 'memphis'],
    response:
      'Austin was born August 17, 1995 in Memphis. His parents brought Texas soil from West Columbia — birthplace of the Republic of Texas — and placed it beneath his mother before he was born. The El Campo Leader-News ran the headline: "Tennessee Birth Will Be on Texas Soil." Not a gesture for a story later — a family continuation.',
  },
  {
    keywords: ['education', 'school', 'ut', 'university', 'degree', 'full sail', 'mccombs'],
    response:
      'B.A. International Relations & Global Studies from UT Austin (minors in Economics and European Studies). M.S. Entertainment Business — Sports Management from Full Sail University (GPA 3.56). Currently pursuing an AI & Machine Learning Postgraduate Certificate from UT Austin McCombs School of Business.',
  },
  {
    keywords: ['experience', 'work', 'job', 'career', 'spectrum', 'northwestern'],
    response:
      'Founder & Builder at BSI (2023–present). Before that: Advertising Account Executive at Spectrum Reach covering Austin/San Antonio (2022–2025) — linear TV, OTT/CTV, streaming, digital. Financial Representative at Northwestern Mutual (2020–2022) — "Power of 10" Award for top 10% nationally.',
  },
  {
    keywords: ['philosophy', 'covenant', 'believe', 'values', 'crockett'],
    response:
      '"For me, personally, I believe Texas is how you choose to treat the best and worst of us." — Austin Humphrey. It\'s a covenant with oneself — to never stop building beyond the horizon, regardless of where you started.',
  },
  {
    keywords: ['project', 'blazecraft', 'arcade', 'sandlot', 'game', 'dna'],
    response:
      `Beyond BSI: BlazeCraft (${PLATFORM_URLS.blazecraft.replace('https://', '')}) is a Warcraft 3-style system health dashboard. BSI Arcade (${PLATFORM_URLS.arcade.replace('https://', '')}) features Sandlot Sluggers — a 3D browser baseball game with real college rosters. BSI Radar Lab validates TrackMan pitch data with six physics layers.`,
  },
  {
    keywords: ['stack', 'tech', 'cloudflare', 'worker', 'infrastructure', 'built'],
    response:
      'Cloudflare everything — 18 edge workers, 12 databases, 45 KV stores, 40+ API routes. Frontend: Next.js 16 (static export), React 19, TypeScript, Tailwind. 662 tests passing. No AWS, no Vercel, no external databases. One constraint that forces simplicity and keeps it debuggable by one person.',
  },
  {
    keywords: ['podcast', 'audio', 'listen', 'episode'],
    response:
      `BSI publishes a weekly podcast covering college baseball — AI-generated deep dives built with NotebookLM. Listen at ${PLATFORM_URLS.bsi.replace('https://', '')}/podcast.`,
  },
  {
    keywords: ['football', 'athlete', 'sport', 'play', 'charger'],
    response:
      'Austin played football at Boerne Champion High School — #20, Chargers. Running back who understood Friday Night Lights culture from the inside. That competitive instinct and sports culture shaped everything BSI became.',
  },
  {
    keywords: ['blaze', 'dog', 'bartlett', 'name', 'brand'],
    response:
      'The name Blaze comes from Bartlett Blaze — Austin\'s dachshund, named after his first youth baseball team. The brand wasn\'t invented in a vacuum. It was remembered into form.',
  },
  {
    keywords: ['resume', 'cv', 'pdf', 'download'],
    response:
      'Austin\'s resume is available for download at austinhumphrey.com/Austin_Humphrey_Resume.pdf — or click the "Resume" button in the navigation.',
  },
  {
    keywords: ['studying', 'learning', 'course', 'class', 'ai', 'ml', 'machine learning', 'postgrad'],
    response:
      'Austin is currently in the AI & Machine Learning Postgraduate Certificate program at UT Austin McCombs School of Business (Apr 2026 cohort). Coursework covers supervised learning, deep learning, NLP, neural networks, and statistics — all in Python. The goal: bring ML directly into BSI\'s analytics pipeline.',
  },
  {
    keywords: ['advertising', 'spectrum', 'tv', 'media', 'sales', 'ott', 'ctv'],
    response:
      'Before building BSI full-time, Austin spent three years as an Advertising Account Executive at Spectrum Reach (2022–2025). Covered two of Texas\'s fastest-growing markets — Austin and San Antonio. Linear TV, OTT/CTV, streaming, digital. Translated campaign data into revenue decisions for local businesses.',
  },
  {
    keywords: ['fraternity', 'ato', 'alpha tau omega', 'rush', 'greek'],
    response:
      'Austin served as Rush Captain and Alumni Relations Chair for Alpha Tau Omega at UT Austin (2015–2020). Led recruitment strategy for 73 new members and managed approximately $100K in event budgets. The leadership and network-building carried directly into everything after.',
  },
  {
    keywords: ['san antonio', 'location', 'where', 'live', 'based'],
    response:
      'Austin is based in San Antonio, Texas. BSI is built and operated from there. San Antonio is one of the fastest-growing cities in the country — and it\'s where the work happens.',
  },
  {
    keywords: ['bitch', 'idiot', 'stupid', 'trash', 'dumb', 'suck'],
    response:
      "Not productive. Ask about Austin, BSI, the build, the Texas soil story, or how to reach him — I'll give you something useful.",
  },
] as const;
