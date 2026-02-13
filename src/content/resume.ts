import { brand, type Brand } from "./brand";

export interface ContactInfo {
  location: string;
  phone: string;
  emails: string[];
  linkedin: string;
  websites: string[];
}

export interface Experience {
  company: string;
  title: string;
  dates: string;
  bullets: string[];
}

export interface Education {
  institution: string;
  degree: string;
  details?: string;
}

export interface ResumeData {
  name: string;
  tagline: string;
  contact: ContactInfo;
  experience: Experience[];
  education: Education[];
  honorsAndLeadership: string[];
  skills: string[];
  brand: Brand;
}

export const resume: ResumeData = {
  name: "Austin Humphrey",
  tagline: "Sports Intelligence | Product Strategy | AI-Assisted Analytics",

  contact: {
    location: "San Antonio, TX",
    phone: "(210) 273-5538",
    emails: [
      "Austin@BlazeSportsIntel.com",
      "humphrey.austin20@gmail.com",
    ],
    linkedin: "linkedin.com/in/ahump20",
    websites: [
      "BlazeSportsIntel.com",
      "AustinHumphrey.com",
    ],
  },

  experience: [
    {
      company: "Blaze Sports Intel",
      title: "Founder & CEO",
      dates: "2023–Present",
      bullets: [
        "Founded an AI-assisted sports-intelligence platform that delivers real-time predictive analytics to bettors and fantasy-sports players.",
        "Designed the product roadmap, brand identity, and go-to-market strategy from zero to MVP launch.",
        "Built dashboards combining machine-learning models with live odds feeds to surface actionable betting edges.",
        "Negotiated data-provider contracts and managed a lean development budget while iterating on user feedback.",
      ],
    },
    {
      company: "Spectrum Reach",
      title: "Marketing Data Analyst",
      dates: "Nov 2022–Dec 2025",
      bullets: [
        "Analyzed campaign performance data across 200+ local advertisers to optimize media spend and ROI.",
        "Built automated reporting pipelines in Python and SQL that cut manual reporting time by 60%.",
        "Partnered with sales teams to translate analytics insights into client-facing proposals and QBRs.",
        "Developed audience-segmentation models that improved campaign targeting accuracy by 25%.",
      ],
    },
    {
      company: "Northwestern Mutual",
      title: "Financial Representative",
      dates: "2020–2022",
      bullets: [
        "Managed a book of 80+ clients, delivering comprehensive financial plans covering insurance, investments, and retirement.",
        "Exceeded quarterly revenue targets by 15% through consultative selling and referral-network growth.",
        "Earned multiple company awards for client retention and new-business production.",
      ],
    },
  ],

  education: [
    {
      institution: "Full Sail University",
      degree: "M.S. Entertainment Business",
    },
    {
      institution: "The University of Texas at Austin",
      degree: "AI/ML Certificate",
      details: "Post-graduate professional certificate in Artificial Intelligence and Machine Learning",
    },
    {
      institution: "The University of Texas at Austin",
      degree: "B.A. Communication Studies",
    },
  ],

  honorsAndLeadership: [
    "Texas Exes Alumni Association – Active Member",
    "Spectrum Reach President's Club – Top 10% of analysts nationwide",
    "Northwestern Mutual Pacesetter Award – First-year achievement recognition",
  ],

  skills: [
    "Sports Analytics",
    "Predictive Modeling",
    "Product Strategy",
    "AI/ML",
    "Python",
    "SQL",
    "Data Visualization",
    "Tableau",
    "Media Analytics",
    "Audience Segmentation",
    "Financial Planning",
    "Go-to-Market Strategy",
    "Brand Development",
    "Stakeholder Communication",
    "Agile / Scrum",
  ],

  brand,
};
