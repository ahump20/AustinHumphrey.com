import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '../utils/animations';

const schools = [
  {
    degree: 'M.S. Entertainment Business — Sports Management',
    school: 'Full Sail University',
    detail: 'Graduated February 2026 | GPA: 3.56',
    bgAccent: 'bg-ember',
    textAccent: 'text-ember',
    focus: ['Sports Analytics', 'Media Strategy', 'Revenue Models'],
  },
  {
    degree: 'AI & Machine Learning Postgraduate Certificate',
    school: 'UT Austin McCombs School of Business',
    detail: 'Accepted — Apr 2026 cohort',
    bgAccent: 'bg-burnt-orange',
    textAccent: 'text-burnt-orange',
    focus: ['Python', 'Supervised Learning', 'Deep Learning', 'NLP', 'Statistics', 'Neural Networks'],
    inProgress: true,
  },
  {
    degree: 'B.A. International Relations & Global Studies',
    school: 'University of Texas at Austin',
    detail: '2014 – 2020 | Minors: Economics, European Studies',
    bgAccent: 'bg-burnt-orange',
    textAccent: 'text-burnt-orange',
    focus: ['Economics', 'European Studies', 'Policy Analysis'],
  },
];

export default function Education() {
  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="section-padding education-bg"
    >
      <div className="container-custom">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={staggerContainer}
        >
          <motion.div variants={staggerItem}>
            <p className="section-label">// Education</p>
            <h2 id="education-heading" className="section-title">Academic Foundation</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {schools.map((s) => (
              <motion.div
                key={s.school}
                variants={staggerItem}
                className="group relative py-6 px-4 rounded-sm border border-transparent hover:border-bone/5 hover:-translate-y-0.5 transition-all duration-300"
              >
                {/* Accent dot */}
                <div
                  className={`w-3 h-3 rounded-full mb-4 ${s.bgAccent} group-hover:brightness-125 transition-all duration-300`}
                />

                <div className="flex items-start gap-3 mb-2">
                  <h3 className="font-sans font-semibold text-base uppercase tracking-wider text-bone group-hover:text-burnt-orange transition-colors duration-300">
                    {s.degree}
                  </h3>
                  {'inProgress' in s && s.inProgress && (
                    <span className="shrink-0 flex items-center gap-1.5 text-[0.55rem] font-mono text-amber-400 uppercase tracking-widest mt-1">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75 animate-ping" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-400" />
                      </span>
                      Active
                    </span>
                  )}
                </div>
                <p className={`font-semibold text-sm mb-2 ${s.textAccent}`}>{s.school}</p>
                <p className="text-sm font-mono text-warm-gray">{s.detail}</p>

                {s.focus && s.focus.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {s.focus.map((f) => (
                      <span
                        key={f}
                        className="text-[0.5rem] font-mono uppercase tracking-widest text-warm-gray/50 border border-bone/8 rounded-sm px-1.5 py-0.5"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                )}

                {/* Bottom accent line — gradient fade */}
                <div
                  className="mt-5 h-px w-16"
                  style={{
                    background: `linear-gradient(90deg, ${s.bgAccent === 'bg-burnt-orange' ? '#BF5700' : s.bgAccent === 'bg-ember' ? '#FF6B35' : '#BF5700'}, transparent)`,
                    opacity: 0.4,
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
