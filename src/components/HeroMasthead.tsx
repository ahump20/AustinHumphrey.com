import { motion } from 'framer-motion';
import { EASE_OUT_EXPO } from '../utils/animations';
import { HERO_V2, RESUME_PATH } from '../content/site';
import SectionStamp from './primitives/SectionStamp';
import StatCallout from './primitives/StatCallout';

export default function HeroMasthead() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="paper-ground relative overflow-hidden"
    >
      {/* Newspaper-masthead top rule */}
      <div className="masthead-rule">
        <span className="masthead-rule__volume">{HERO_V2.dateline}</span>
        <span className="masthead-rule__rule" aria-hidden />
        <span className="masthead-rule__date">Updated 2026</span>
      </div>

      <div className="relative z-10 ed-section ed-container pt-10 md:pt-16">
        <div className="ed-grid-asymmetric items-start">

          {/* ── LEFT — Status stamps, nameplate, roles, subhead, lede, stats, CTAs ── */}
          <div className="flex flex-col">
            {/* Status stamp row */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05, ease: EASE_OUT_EXPO }}
              className="flex items-center gap-3 mb-8 flex-wrap"
            >
              <SectionStamp variant="solid" withDot>Status · Building</SectionStamp>
              <SectionStamp variant="outline">Open to Opportunities</SectionStamp>
            </motion.div>

            {/* Nameplate */}
            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.18, ease: EASE_OUT_EXPO }}
              className="ed-display mb-6"
              style={{
                color: 'var(--ink-strong)',
                fontSize: 'clamp(3.5rem, 10vw, 7.5rem)',
                fontWeight: 500,
                lineHeight: 0.95,
                letterSpacing: '-0.022em',
              }}
            >
              <span style={{ display: 'block', whiteSpace: 'nowrap' }}>Austin</span>
              <span
                style={{
                  display: 'block',
                  whiteSpace: 'nowrap',
                  fontStyle: 'italic',
                  fontVariationSettings: '"opsz" 144, "SOFT" 100, "WONK" 1',
                  color: 'var(--accent-burnt)',
                  marginTop: '-0.06em',
                }}
              >
                Humphrey
              </span>
            </motion.h1>

            {/* Three-role line */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: EASE_OUT_EXPO }}
              className="mb-3"
              style={{
                fontFamily: 'Fraunces, Georgia, serif',
                fontVariationSettings: '"opsz" 32, "SOFT" 30',
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: 600,
                color: 'var(--ink-strong)',
                letterSpacing: '-0.01em',
              }}
            >
              {HERO_V2.roles.join(' · ')}
            </motion.p>

            {/* Disciplines line — mono kicker */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: EASE_OUT_EXPO }}
              className="ed-kicker mb-8"
              style={{ fontSize: '0.78rem' }}
            >
              {HERO_V2.disciplines}
            </motion.p>

            {/* Lede — firewalled language */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: EASE_OUT_EXPO }}
              className="mb-10"
              style={{
                fontFamily: 'Fraunces, Georgia, serif',
                fontVariationSettings: '"opsz" 18',
                fontSize: '1.1rem',
                lineHeight: 1.55,
                color: 'var(--ink)',
                maxWidth: '56ch',
              }}
            >
              {HERO_V2.lede}
            </motion.p>

            {/* Stat callouts trio */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65, ease: EASE_OUT_EXPO }}
              className="grid grid-cols-3 gap-4 mb-10 pb-8"
              style={{ borderBottom: '1px solid var(--margin-rule)' }}
            >
              {HERO_V2.kickerStats.map((s) => (
                <StatCallout key={s.label} value={s.value} label={s.label} />
              ))}
            </motion.div>

            {/* CTA pair */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8, ease: EASE_OUT_EXPO }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <a
                href="#experience"
                onClick={() => window.posthog?.capture('hero_cta_clicked', { cta: 'experience' })}
                className="btn-editorial-solid ed-focus"
              >
                See the Experience
                <span aria-hidden style={{ marginLeft: 2 }}>→</span>
              </a>
              <a
                href={RESUME_PATH}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => window.posthog?.capture('hero_cta_clicked', { cta: 'resume' })}
                className="btn-editorial ed-focus"
                style={{ color: 'var(--ink)' }}
              >
                Curriculum Vitae
                <span aria-hidden style={{ marginLeft: 2 }}>↗</span>
              </a>
            </motion.div>
          </div>

          {/* ── RIGHT — Portrait + colophon quad ── */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease: EASE_OUT_EXPO }}
            className="relative"
          >
            <figure className="editorial-figure m-0">
              <div className="portrait-frame" style={{ aspectRatio: '4 / 5' }}>
                <img
                  src="/assets/austin-headshot.webp"
                  alt="Austin Humphrey, portrait"
                  className="ed-portrait-breathe"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
              <figcaption className="mt-4">
                Plate I &nbsp;·&nbsp; Humphrey, Boerne, Texas &nbsp;·&nbsp; 2026
              </figcaption>
            </figure>

            {/* Colophon quad — firewalled */}
            <div
              className="grid grid-cols-2 gap-6 mt-8 pt-6"
              style={{ borderTop: '1px solid var(--margin-rule)' }}
            >
              {HERO_V2.colophon.map((item) => (
                <div key={item.label}>
                  <p className="dateline mb-1" style={{ fontSize: '0.62rem' }}>
                    {item.label}
                  </p>
                  <p
                    style={{
                      fontFamily: 'Fraunces, Georgia, serif',
                      fontVariationSettings: '"opsz" 18, "SOFT" 20',
                      fontSize: '0.95rem',
                      fontWeight: 500,
                      color: 'var(--ink)',
                      lineHeight: 1.35,
                    }}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
