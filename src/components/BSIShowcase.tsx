import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '../utils/animations';
import { BSI_SHOWCASE, PLATFORM_URLS, SITE_TAGLINE } from '../content/site';
import { useAnimatedCounter } from '../hooks/useAnimatedCounter';
import PlatformStatus from './PlatformStatus';

function AnimatedStatCard({ value, label, suffix = '' }: { value: string; label: string; suffix?: string }) {
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10);
  const hasPlus = value.includes('+');
  const [ref, displayValue] = useAnimatedCounter(isNaN(numericValue) ? 0 : numericValue);

  return (
    <div className="text-center" ref={ref as React.RefObject<HTMLDivElement>}>
      <p className="text-3xl font-bold font-sans text-burnt-orange hover:text-ember transition-colors duration-300 cursor-default" aria-hidden="true">
        {isNaN(numericValue) ? value : displayValue}
        {hasPlus && '+'}
        {suffix}
      </p>
      <span className="sr-only">{value}{suffix}</span>
      <p className="text-xs font-mono text-warm-gray mt-1">{label}</p>
    </div>
  );
}

export default function BSIShowcase() {
  return (
    <section
      id="bsi"
      aria-labelledby="bsi-heading"
      className="section-padding relative bsi-showcase-bg"
    >
      <div className="container-custom">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={staggerContainer}
        >
          {/* Header */}
          <motion.div variants={staggerItem}>
            <p className="section-label">// The Platform</p>
            <h2 id="bsi-heading" className="section-title">Blaze Sports Intel</h2>
            <p className="font-sans font-semibold text-burnt-orange uppercase tracking-[0.2em] text-sm mb-10">
              {SITE_TAGLINE}
            </p>
          </motion.div>

          {/* Screenshot — visual proof the platform is real */}
          <motion.div variants={staggerItem} className="mb-16">
            <a
              href={PLATFORM_URLS.bsi}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => window.posthog?.capture('bsi_screenshot_clicked')}
              className="block group"
            >
              <div className="relative rounded-sm overflow-hidden border border-bone/10 shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all duration-500 group-hover:shadow-[0_24px_70px_rgba(191,87,0,0.15)] group-hover:-translate-y-1 group-hover:rotate-[0.5deg]">
                {/* Browser chrome bar */}
                <div className="flex items-center gap-2 px-4 py-2.5 bg-[#1a1a1a] border-b border-bone/5">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60 group-hover:bg-red-500 transition-colors duration-300" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60 group-hover:bg-yellow-500 transition-colors duration-300" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/60 group-hover:bg-green-500 transition-colors duration-300" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <span className="font-mono text-[0.6rem] text-warm-gray/50 bg-bone/5 rounded-sm px-3 py-0.5 group-hover:text-burnt-orange/70 transition-colors duration-300">
                      blazesportsintel.com
                      <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-burnt-orange/50">↗</span>
                    </span>
                  </div>
                  <span className="font-mono text-[0.5rem] text-warm-gray/30 tracking-wider hidden sm:inline">
                    Captured Apr 2026
                  </span>
                </div>
                <img
                  src="/assets/bsi-homepage.png"
                  srcSet="/assets/optimized/bsi-homepage-640w.webp 640w, /assets/optimized/bsi-homepage-1024w.webp 1024w"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1024px"
                  alt="Blaze Sports Intel homepage — live sports intelligence platform"
                  loading="lazy"
                  decoding="async"
                  className="block w-full"
                />
              </div>
            </a>
          </motion.div>

          {/* Editorial lead + stats — 2 column on desktop */}
          <div className="grid lg:grid-cols-5 gap-12 mb-16">
            {/* Narrative — 3 cols */}
            <motion.div variants={staggerItem} className="lg:col-span-3 space-y-5 text-bone/85 text-lg leading-relaxed">
              <p>
                The gap between caring about a Tuesday night college baseball game and having real
                analytics for it &mdash; that gap is the product. Park-adjusted sabermetrics for
                Rice vs. Sam Houston. Conference standings across six sports without clicking
                through fifteen pages. Real data for the games mainstream media ignores.
              </p>
              <p>
                Dozens of specialized edge systems handle every data call, transformation, and
                storage operation. Multiple databases track historical and live game data
                across six leagues. Every API route, every analytics pipeline, every line of
                editorial &mdash; one builder, zero shortcuts.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href={PLATFORM_URLS.bsi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Visit BSI
                </a>
                <a
                  href="https://blazesportsintel.com/scores"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                >
                  Live Scores
                </a>
                <a
                  href="https://blazesportsintel.com/college-baseball/savant"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => window.posthog?.capture('bsi_savant_clicked')}
                  className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-warm-gray/50 hover:text-burnt-orange transition-colors duration-300"
                >
                  BSI Savant &rarr;
                </a>
                <PlatformStatus />
              </div>
            </motion.div>

            {/* Stats + architecture — 2 cols */}
            <motion.div variants={staggerItem} className="lg:col-span-2 space-y-8">
              {/* Stat grid */}
              <div className="grid grid-cols-2 gap-6">
                {BSI_SHOWCASE.stats.map((stat) => (
                  <AnimatedStatCard key={stat.label} value={stat.value} label={stat.label} />
                ))}
              </div>

              {/* Architecture flow — visual pipeline */}
              <div className="card p-5">
                <p className="section-label mb-4">// Data Flow</p>
                <div className="space-y-0">
                  {BSI_SHOWCASE.architecture.map((node, i) => (
                    <div key={node.label}>
                      <div className="group/node flex items-center gap-3 py-2.5 px-3 rounded-sm hover:bg-bone/[0.02] transition-colors duration-300">
                        <div className="shrink-0 w-6 h-6 rounded-full border border-burnt-orange/30 flex items-center justify-center group-hover/node:border-burnt-orange/80 group-hover/node:bg-burnt-orange/10 transition-all duration-300">
                          <span className="font-mono text-[0.5rem] text-burnt-orange">{i + 1}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="font-sans text-xs uppercase tracking-wider text-bone font-semibold block">{node.label}</span>
                          <span className="font-mono text-[0.55rem] text-warm-gray/70 block mt-0.5">{node.sub}</span>
                        </div>
                      </div>
                      {i < BSI_SHOWCASE.architecture.length - 1 && (
                        <div className="ml-6 h-4 border-l border-dashed border-burnt-orange/20" aria-hidden="true" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Tech stack */}
          <motion.div variants={staggerItem} className="mb-12">
            <p className="section-label mb-4">// Stack</p>
            <div className="flex flex-wrap gap-2">
              {BSI_SHOWCASE.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-[0.6rem] font-mono uppercase tracking-widest text-warm-gray/60 border border-bone/10 rounded-sm px-3 py-1"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* League coverage — editorial inline list */}
          <motion.div variants={staggerItem}>
            <p className="section-label mb-4">// Coverage</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {BSI_SHOWCASE.leagues.map((league, i) => (
                <span key={league.name} className="flex items-center gap-2">
                  <span className="font-sans text-sm uppercase tracking-wider text-bone font-medium">
                    {league.name}
                  </span>
                  <span className="text-[0.6rem] font-mono text-burnt-orange">{league.note}</span>
                  {i < BSI_SHOWCASE.leagues.length - 1 && (
                    <span className="text-bone/10 ml-2" aria-hidden="true">|</span>
                  )}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
