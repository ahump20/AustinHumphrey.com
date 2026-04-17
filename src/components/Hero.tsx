import { motion } from 'framer-motion';
import { EASE_OUT_EXPO } from '../utils/animations';
import { RESUME_PATH } from '../content/site';

export default function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="paper-ground relative overflow-hidden"
    >
      {/* Masthead rule — thin burnt-orange tick under the nav */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <div className="max-w-[86rem] mx-auto px-6 md:px-10 lg:px-16">
          <div className="h-px w-full bg-margin" style={{ background: 'var(--margin-rule)' }} />
        </div>
      </div>

      <div className="relative z-10 ed-section ed-container pt-28 md:pt-36">
        <div className="ed-grid-asymmetric items-start">

          {/* ── LEFT COLUMN — Book jacket copy block ── */}
          <div className="flex flex-col">
            {/* Dateline / edition */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease: EASE_OUT_EXPO }}
              className="dateline"
              aria-label="Edition"
            >
              Volume I &nbsp;·&nbsp; 2026 Edition &nbsp;·&nbsp; San Antonio, Texas
            </motion.p>

            {/* Rule with tick */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.15, ease: EASE_OUT_EXPO }}
              className="marginalia-rule"
              style={{ transformOrigin: 'left' }}
            />

            {/* Kicker */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: EASE_OUT_EXPO }}
              className="ed-kicker mb-6"
            >
              A Portfolio &nbsp;/&nbsp; A Record of Work
            </motion.p>

            {/* Nameplate — blocked spans, no mid-word breaks */}
            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: EASE_OUT_EXPO }}
              className="ed-display mb-4"
              style={{
                color: 'var(--ink-strong)',
                fontSize: 'clamp(3.5rem, 9vw, 7rem)',
                lineHeight: 0.98,
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
                  marginTop: '-0.08em',
                }}
              >
                Humphrey
              </span>
            </motion.h1>

            {/* Lede */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: EASE_OUT_EXPO }}
              className="ed-lede mb-8"
              style={{ color: 'var(--ink)' }}
            >
              Builder of sports intelligence. Writer of systems. Reader of games.
              Raised on Memphis clay, shaped on the forty acres, still playing the
              long season.
            </motion.p>

            {/* Body paragraph — one pass, no vanity stats */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: EASE_OUT_EXPO }}
              className="ed-body mb-10"
              style={{ color: 'var(--ink-mute)' }}
            >
              This edition gathers the work into chapters — the platform I am
              building, the pieces I have published, the program behind the
              product, and the people the whole thing is for. Read as far as the
              interest carries. The index at the end is there for the hurry.
            </motion.p>

            {/* CTA pair */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75, ease: EASE_OUT_EXPO }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <a
                href="#projects"
                onClick={() => window.posthog?.capture('hero_cta_clicked', { cta: 'index' })}
                className="btn-editorial-solid ed-focus"
              >
                Turn to the Index
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

          {/* ── RIGHT COLUMN — Portrait as book jacket plate ── */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.35, ease: EASE_OUT_EXPO }}
            className="relative"
          >
            {/* Portrait plate with caption block below — held at generous margin */}
            <figure className="editorial-figure m-0">
              <div
                className="portrait-frame"
                style={{ aspectRatio: '4 / 5' }}
              >
                <img
                  src="/assets/austin-headshot.webp"
                  alt="Austin Humphrey, portrait"
                  className="ed-portrait-breathe"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
              <figcaption className="mt-4">
                Plate I &nbsp;·&nbsp; The Author &nbsp;·&nbsp; Humphrey, 2026
              </figcaption>
            </figure>

            {/* Below-portrait three-column colophon — substantive, non-vanity */}
            <div
              className="grid grid-cols-3 gap-4 mt-8 pt-6"
              style={{ borderTop: '1px solid var(--margin-rule)' }}
            >
              <div>
                <p className="dateline mb-1">Role</p>
                <p
                  className="ed-h4"
                  style={{
                    fontSize: '0.95rem',
                    fontVariationSettings: '"opsz" 18, "SOFT" 20',
                    fontWeight: 500,
                    color: 'var(--ink)',
                    lineHeight: 1.3,
                  }}
                >
                  Founder &amp; Builder
                </p>
              </div>
              <div>
                <p className="dateline mb-1">Program</p>
                <p
                  className="ed-h4"
                  style={{
                    fontSize: '0.95rem',
                    fontVariationSettings: '"opsz" 18, "SOFT" 20',
                    fontWeight: 500,
                    color: 'var(--ink)',
                    lineHeight: 1.3,
                  }}
                >
                  Blaze Sports Intel
                </p>
              </div>
              <div>
                <p className="dateline mb-1">Formed</p>
                <p
                  className="ed-h4"
                  style={{
                    fontSize: '0.95rem',
                    fontVariationSettings: '"opsz" 18, "SOFT" 20',
                    fontWeight: 500,
                    color: 'var(--ink)',
                    lineHeight: 1.3,
                  }}
                >
                  Texas &amp; Tennessee
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Chapter transition — "continue reading" cue at bottom of hero */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="flex items-center justify-between mt-20 md:mt-28 pt-6"
          style={{ borderTop: '1px solid var(--margin-rule)' }}
        >
          <span className="dateline">Continue →</span>
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              const target = document.getElementById('projects');
              if (target) target.scrollIntoView({ behavior: 'smooth' });
            }}
            className="dateline ed-link ed-focus"
            style={{ color: 'var(--ink)' }}
          >
            Chapter I &middot; The Index of Work
          </a>
        </motion.div>
      </div>
    </section>
  );
}
