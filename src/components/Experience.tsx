import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '../utils/animations';

const experiences = [
  {
    title: 'Founder & Builder',
    company: 'Blaze Sports Intel',
    location: 'San Antonio, TX',
    period: '2023 – Present',
    duration: '3+ years',
    bgAccent: 'bg-burnt-orange',
    textAccent: 'text-burnt-orange',
    description:
      'Six-league sports intelligence platform. Dozens of edge workers, multiple databases, 58+ editorial features. Full architecture — API design to deploy pipeline — built and maintained solo on Cloudflare.',
    tags: ['Cloudflare Workers', 'Hono', 'D1/KV/R2', 'Next.js', 'TypeScript', 'Playwright'],
  },
  {
    title: 'Advertising Account Executive',
    company: 'Spectrum Reach',
    location: 'Austin / San Antonio, TX',
    period: 'Nov 2022 – Dec 2025',
    duration: '3 years',
    bgAccent: 'bg-spectrum-blue',
    textAccent: 'text-spectrum-blue',
    description:
      'Advertising strategy across two of Texas\'s fastest-growing markets. Linear TV, OTT/CTV, streaming, and digital. Translated campaign performance data into revenue decisions for local and regional businesses.',
    tags: ['Linear TV', 'OTT/CTV', 'Streaming', 'Campaign Analytics'],
  },
  {
    title: 'Financial Representative',
    company: 'Northwestern Mutual',
    location: 'Austin, TX',
    period: 'Dec 2020 – Aug 2022',
    duration: '1 yr 8 mo',
    bgAccent: 'bg-nw-navy',
    textAccent: 'text-nw-navy',
    description:
      'Top-5 nationally ranked intern program to full-time. Only person in the office daily during COVID. Nearly tripled the referral production of every other advisor. "Power of 10" Award — top 10% national performance.',
    tags: ['Financial Planning', 'Client Acquisition', 'Power of 10 Award'],
  },
  {
    title: 'Rush Captain & Alumni Relations Chair',
    company: 'Alpha Tau Omega — UT Austin',
    location: 'Austin, TX',
    period: '2015 – 2020',
    duration: '5 years',
    bgAccent: 'bg-ato-gold',
    textAccent: 'text-ato-gold',
    description:
      'Led recruitment strategy for 73 new members. Managed approximately $100K in event budgets. Bridge between active chapter and alumni network.',
    tags: ['Leadership', 'Event Management', 'Alumni Relations'],
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="section-padding section-border"
    >
      <div className="container-custom">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={staggerContainer}
        >
          <motion.div variants={staggerItem}>
            <p className="section-label">// The Journey</p>
            <h2 id="experience-heading" className="section-title">Experience</h2>
          </motion.div>

          {/* Timeline-style editorial list */}
          <div className="space-y-0">
            {experiences.map((exp) => (
              <motion.div
                key={exp.company}
                variants={staggerItem}
                className="group relative pl-6 py-6 border-l border-bone/10 hover:border-l-2 hover:border-burnt-orange/40 transition-all duration-300"
              >
                {/* Timeline dot with hover glow */}
                <div className="absolute left-0 top-8 -translate-x-1/2">
                  <span
                    className={`block w-2.5 h-2.5 rounded-full ${exp.bgAccent} transition-shadow duration-300 group-hover:shadow-[0_0_8px_2px_currentColor]`}
                    style={{ color: exp.bgAccent === 'bg-burnt-orange' ? '#BF5700' : exp.bgAccent === 'bg-ember' ? '#FF6B35' : exp.bgAccent === 'bg-spectrum-blue' ? '#3B82F6' : exp.bgAccent === 'bg-nw-navy' ? '#1E3A5F' : exp.bgAccent === 'bg-ato-gold' ? '#D4A843' : '#BF5700' }}
                  />
                </div>

                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1 mb-2">
                  <div>
                    <h3 className="font-sans font-semibold text-base uppercase tracking-wider text-bone group-hover:text-burnt-orange transition-colors duration-300">
                      {exp.title}
                    </h3>
                    <p className={`text-sm font-semibold ${exp.textAccent} group-hover:brightness-125 transition-all duration-300`}>{exp.company}</p>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-mono text-warm-gray shrink-0">
                    <span>{exp.location}</span>
                    <span className="text-bone/10">|</span>
                    <time>{exp.period}</time>
                    {'duration' in exp && (
                      <span className="text-burnt-orange/60 text-[0.65rem]">({exp.duration})</span>
                    )}
                  </div>
                </div>

                <p className="text-bone/75 text-sm leading-relaxed max-w-3xl">{exp.description}</p>

                {exp.tags && exp.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[0.55rem] font-mono uppercase tracking-widest text-warm-gray/60 border border-bone/8 rounded-sm px-2 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
