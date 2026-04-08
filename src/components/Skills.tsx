import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '../utils/animations';

const SKILL_GROUPS = [
  {
    label: 'Languages',
    items: ['TypeScript', 'Python', 'SQL', 'HTML/CSS'],
  },
  {
    label: 'Frameworks',
    items: ['React', 'Next.js', 'Hono', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    label: 'Infrastructure',
    items: ['Cloudflare Workers', 'D1', 'KV', 'R2', 'Durable Objects', 'Pages'],
  },
  {
    label: 'Tools',
    items: ['Vitest', 'Playwright', 'PostHog', 'Wrangler', 'Git'],
  },
  {
    label: 'Domain',
    items: ['Sabermetrics', 'Sports Analytics', 'Editorial', 'Advertising', 'Financial Planning'],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      aria-label="Technical skills"
      className="section-padding"
      style={{ background: 'var(--surface-elevated)' }}
    >
      <div className="container-custom">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          <motion.div variants={staggerItem}>
            <p className="section-label">// Competencies</p>
            <h2 className="section-title">Skills</h2>
          </motion.div>

          <motion.div variants={staggerItem} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {SKILL_GROUPS.map((group) => (
              <div key={group.label}>
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-burnt-orange mb-3">
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="text-[0.6rem] font-mono text-bone/60 border border-bone/8 rounded-sm px-2 py-1 hover:border-burnt-orange/30 hover:text-bone/80 transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
