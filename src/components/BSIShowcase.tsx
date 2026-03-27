import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '../utils/animations';
import { BSI_SHOWCASE, PLATFORM_URLS, SITE_TAGLINE } from '../content/site';

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="text-3xl font-bold font-sans text-burnt-orange">{value}</p>
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

          {/* Editorial lead + stats — 2 column on desktop */}
          <div className="grid lg:grid-cols-5 gap-12 mb-16">
            {/* Narrative — 3 cols */}
            <motion.div variants={staggerItem} className="lg:col-span-3 space-y-5 text-bone/85 text-lg leading-relaxed">
              <p>
                BSI exists because the coverage gap between interest in the game and access to
                meaningful data is the product. Advanced analytics for a Tuesday night college
                baseball game between Rice and Sam Houston. Conference standings across five
                sports without clicking through fifteen pages.
              </p>
              <p>
                Dozens of specialized systems handle every data call, transformation, and
                storage layer. Multiple databases track historical and live game data across
                six leagues. One person built all of it &mdash; old-school scouting instinct
                fused with new-school sabermetrics.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href={PLATFORM_URLS.bsi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Visit BSI
                </a>
              </div>
            </motion.div>

            {/* Stats + architecture — 2 cols */}
            <motion.div variants={staggerItem} className="lg:col-span-2 space-y-8">
              {/* Stat grid */}
              <div className="grid grid-cols-2 gap-6">
                {BSI_SHOWCASE.stats.map((stat) => (
                  <StatCard key={stat.label} value={stat.value} label={stat.label} />
                ))}
              </div>

              {/* Architecture flow — compact */}
              <div className="card p-5">
                <p className="section-label mb-3">// Data Flow</p>
                <div className="space-y-2">
                  {BSI_SHOWCASE.architecture.map((node, i) => (
                    <div key={node.label} className="flex items-center gap-3">
                      {i > 0 && <span aria-hidden="true" className="text-burnt-orange/50 font-mono text-xs">&rarr;</span>}
                      <div>
                        <span className="font-sans text-xs uppercase tracking-wider text-bone font-semibold">{node.label}</span>
                        <span className="font-mono text-[0.6rem] text-warm-gray ml-2">{node.sub}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

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
