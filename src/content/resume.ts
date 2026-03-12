import { brand, type Brand } from "./brand";

export interface SocialLinks {
  linkedin: string;
  github: string;
  twitter: string;
}

export interface ContactInfo {
  location: string;
  phone: string;
  emails: string[];
  linkedin: string;
  websites: string[];
  socials: SocialLinks;
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  dates: string;
  bullets: string[];
}

export interface Education {
  institution: string;
  degree: string;
  details?: string;
}

export interface Origin {
  birthplace: string;
  heritage: string;
  heritageDetail: string;
  narrative: string;
}

export interface ResumeData {
  fullName: string;
  name: string;
  tagline: string;
  contact: ContactInfo;
  summary: string;
  origin: Origin;
  experience: Experience[];
  education: Education[];
  honorsAndLeadership: string[];
  skills: string[];
  brand: Brand;
}

export const resume: ResumeData = {
  fullName: "John Austin Humphrey",
  name: "Austin Humphrey",
  tagline: "Sports Intelligence Architect & AI-Powered Analytics",

  summary:
    "Product-minded builder with deep experience in sports intelligence, advertising analytics, and AI-assisted development. Currently building BlazeSportsIntel.com — a real-time sports intelligence platform deployed on Cloudflare — while pursuing graduate and postgraduate studies in business management and artificial intelligence.",

  origin: {
    birthplace: "Memphis, Tennessee",
    heritage: "West Columbia, Texas",
    heritageDetail: "Birthplace of the Republic of Texas",
    narrative:
      "Born in Memphis, Tennessee — the city of blues, grit, and unshakable resolve. Raised with roots in West Columbia, Texas — the birthplace of the Republic of Texas, where Stephen F. Austin's colony planted the flag that built a nation. That heritage runs deep: a foundation forged in the place where Texas itself was born, carrying forward the same restless drive to build something from nothing. From the banks of the Mississippi to the plains of the Brazos, the through-line has always been the same — show up, compete, and build.",
  },

  contact: {
    location: "San Antonio, TX",
    phone: "(210) 273-5538",
    emails: [
      "Austin@BlazeSportsIntel.com",
      "humphrey.austin20@gmail.com",
    ],
    linkedin: "linkedin.com/in/ahump20",
    websites: ["BlazeSportsIntel.com", "AustinHumphrey.com"],
    socials: {
      linkedin: "https://linkedin.com/in/ahump20",
      github: "https://github.com/ahump20",
      twitter: "https://x.com/ahump20",
    },
  },

  experience: [
    {
      title: "Founder & Builder",
      company: "Blaze Sports Intel (Blaze Intelligence)",
      location: "San Antonio, TX",
      dates: "2023 – Present",
      bullets: [
        "Built and operate BlazeSportsIntel.com, an AI-assisted sports intelligence platform; shipped real-time MLB and college baseball dashboards and scoreboards sourced from official APIs with a 30-second refresh cadence.",
        "Deployed on Cloudflare with a serverless architecture focused on speed, reliability, documentation, and cost discipline (Workers, D1, KV, R2).",
        "Develop analytics modules for research and predictive work (win probability and Monte Carlo) and reporting products for scouts, coaches, programs, and media partners.",
        "Designed Pro and Enterprise packaging with API access and custom exports for professional users.",
        "Created BlazeCraft.app, an RTS-style Agent Forge interface that visualizes system health and operational flow.",
        "Lead end-to-end execution across product direction, publishing cadence, documentation, and stakeholder communication under game-day deadlines.",
      ],
    },
    {
      title: "Advertising Account Executive",
      company: "Spectrum Reach",
      location: "Austin, TX (hybrid / field)",
      dates: "Nov 2022 – Dec 2025",
      bullets: [
        "Developed data-informed advertising strategies across linear TV, OTT/CTV, streaming, and digital platforms for local and regional brands.",
        "Translated campaign performance and audience insights into recommendations that informed renewals, retention, and strategic upsells.",
        "Built client-ready decks and proposals while coordinating with creative, production, and analytics teams to maintain on-time delivery.",
      ],
    },
    {
      title: "Financial Representative",
      company: "Northwestern Mutual",
      location: "Austin, TX",
      dates: "2020 – 2022",
      bullets: [
        "Delivered consultative planning through structured discovery, needs analysis, and financial modeling for client decision support.",
        "Recognized with Power of 10 and March Madness Competition awards; converted to full-time role based on results.",
      ],
    },
  ],

  education: [
    {
      institution: "Full Sail University",
      degree: "M.S., Entertainment Business Management (Sports Management)",
      details: "Feb 2026 | GPA 3.56",
    },
    {
      institution: "The University of Texas at Austin (McCombs)",
      degree: "Artificial Intelligence and Machine Learning Postgraduate Certificate",
      details: "Accepted / In progress",
    },
    {
      institution: "The University of Texas at Austin",
      degree: "B.A., International Relations & Global Studies",
      details: "Minors: Economics, European Studies | 2014–2020",
    },
  ],

  honorsAndLeadership: [
    "Power of 10 Award Recipient (Northwestern Mutual)",
    "March Madness Competition Champion (Northwestern Mutual)",
    "Alpha Tau Omega leadership: Rush Captain / Rush Chair, Alumni Relations, Intramural Chair",
    "Managed $100K chapter budget (Alpha Tau Omega)",
    "Multi-sport athlete background in baseball, football, and track",
    "References available upon request",
  ],

  skills: [
    "Cloudflare Workers, D1 (SQLite), KV, R2",
    "TypeScript, Node.js, Python, SQL, Git/GitHub, CI/CD",
    "REST APIs, data ingestion, caching, data validation",
    "LLM-assisted and agentic development: Claude.ai, Claude Code, ChatGPT, Gemini, OpenAI Codex",
    "Product strategy, stakeholder communication, narrative reporting, dashboards/exports",
  ],

  brand,
};
