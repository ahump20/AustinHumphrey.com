import { motion } from 'framer-motion';
import { EASE_OUT_EXPO } from '../utils/animations';
import {
  ORIGIN_PROSE,
  ORIGIN_QUOTE,
  ORIGIN_PHILOSOPHY,
  ORIGIN_PHOTOS,
} from '../content/site';
import SectionBar from './primitives/SectionBar';
import PullQuote from './primitives/PullQuote';

/**
 * Render markdown-light text: **bold** and *italic* runs
 * become strong/em respectively. No nesting depth.
 */
function renderInline(text: string) {
  const parts: React.ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  const matches = Array.from(text.matchAll(pattern));
  let cursor = 0;
  matches.forEach((m, i) => {
    const seg = m[0];
    const idx = m.index ?? 0;
    if (idx > cursor) parts.push(text.slice(cursor, idx));
    if (seg.startsWith('**')) {
      parts.push(<strong key={`s${i}`}>{seg.slice(2, -2)}</strong>);
    } else {
      parts.push(<em key={`e${i}`}>{seg.slice(1, -1)}</em>);
    }
    cursor = idx + seg.length;
  });
  if (cursor < text.length) parts.push(text.slice(cursor));
  return parts;
}

export default function Origin() {
  const [first, second, third] = ORIGIN_PROSE;
  const [hero, blaze, ballpark, longhorns, article, nana, lastGame] = ORIGIN_PHOTOS;

  return (
    <section
      id="origin"
      aria-labelledby="origin-heading"
      className="paper-ground"
    >
      <SectionBar
        numeral="Chapter V"
        title={<>The <em>Origin</em></>}
        kicker="Memphis-born · Texas-raised · Boerne-based"
      />

      <div className="ed-section ed-container">

        {/* Lede + opening photo plate side by side */}
        <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          >
            <h2 id="origin-heading" className="sr-only">Origin</h2>
            <p className="ed-lede" style={{ color: 'var(--ink-mute)', maxWidth: '32ch' }}>
              Texas was never a backdrop. It was the standard behind the
              family, the sports, and the conviction that what you build
              should serve the people around you.
            </p>
          </motion.div>

          <motion.figure
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
            className="origin-photo origin-photo--span-12"
            style={{ aspectRatio: '21 / 9', gridColumn: 'auto', margin: 0 }}
          >
            <img
              src={hero.src}
              srcSet={hero.srcSet}
              sizes="(max-width: 1024px) 100vw, 60vw"
              alt={hero.alt}
              loading="lazy"
              decoding="async"
            />
            <span className="origin-photo__caption">{hero.alt}</span>
          </motion.figure>
        </div>

        {/* First prose block with drop cap */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          className="origin-prose drop-cap mx-auto mt-16"
        >
          <p>{renderInline(first)}</p>
        </motion.div>

        {/* Photo trio — Blaze + Ballpark + Longhorns */}
        <div className="origin-grid mt-12">
          <motion.figure
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
            className={`origin-photo origin-photo--${blaze.span}`}
            style={{ margin: 0 }}
          >
            <img src={blaze.src} srcSet={blaze.srcSet} alt={blaze.alt} sizes="(max-width: 900px) 100vw, 40vw" loading="lazy" decoding="async" />
            <span className="origin-photo__caption">{blaze.alt}</span>
          </motion.figure>

          <motion.figure
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.05, ease: EASE_OUT_EXPO }}
            className={`origin-photo origin-photo--${ballpark.span}`}
            style={{ margin: 0 }}
          >
            <img src={ballpark.src} srcSet={ballpark.srcSet} alt={ballpark.alt} sizes="(max-width: 900px) 100vw, 60vw" loading="lazy" decoding="async" />
            <span className="origin-photo__caption">{ballpark.alt}</span>
          </motion.figure>

          <motion.figure
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT_EXPO }}
            className={`origin-photo origin-photo--${longhorns.span}`}
            style={{ margin: 0 }}
          >
            <img src={longhorns.src} srcSet={longhorns.srcSet} alt={longhorns.alt} sizes="(max-width: 900px) 100vw, 30vw" loading="lazy" decoding="async" />
            <span className="origin-photo__caption">{longhorns.alt}</span>
          </motion.figure>
        </div>

        <div className="origin-mark" aria-hidden="true">
          <span className="origin-mark__glyph" />
        </div>

        {/* Second prose block + photo pair */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          className="origin-prose mx-auto"
        >
          <p>{renderInline(second)}</p>
        </motion.div>

        <div className="origin-grid mt-12">
          <motion.figure
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
            className={`origin-photo origin-photo--${article.span}`}
            style={{ margin: 0 }}
          >
            <img src={article.src} srcSet={article.srcSet} alt={article.alt} sizes="(max-width: 900px) 100vw, 50vw" loading="lazy" decoding="async" />
            <span className="origin-photo__caption">{article.alt}</span>
          </motion.figure>

          <motion.figure
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.05, ease: EASE_OUT_EXPO }}
            className={`origin-photo origin-photo--${nana.span}`}
            style={{ margin: 0 }}
          >
            <img src={nana.src} srcSet={nana.srcSet} alt={nana.alt} sizes="(max-width: 900px) 100vw, 50vw" loading="lazy" decoding="async" />
            <span className="origin-photo__caption">{nana.alt}</span>
          </motion.figure>
        </div>

        {/* Pull quote — magazine-style margin moment */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
          className="mx-auto mt-12"
          style={{ maxWidth: '64ch' }}
        >
          <PullQuote cite={ORIGIN_QUOTE.cite}>
            {ORIGIN_QUOTE.text}
          </PullQuote>
        </motion.div>

        {/* Third prose block — Blaze namesake closer */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          className="origin-prose mx-auto mt-2"
        >
          <p>{renderInline(third)}</p>
        </motion.div>

        {/* Closing widescreen photo */}
        <motion.figure
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
          className="origin-photo mt-16"
          style={{ aspectRatio: '21 / 9', margin: '4rem 0 0' }}
        >
          <img
            src={lastGame.src}
            srcSet={lastGame.srcSet}
            sizes="100vw"
            alt={lastGame.alt}
            loading="lazy"
            decoding="async"
          />
          <span className="origin-photo__caption">{lastGame.alt}</span>
        </motion.figure>

        {/* Philosophy banner — closing covenant */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
          className="text-center mt-20"
        >
          <p
            style={{
              fontFamily: 'Fraunces, Georgia, serif',
              fontVariationSettings: '"opsz" 144, "SOFT" 30',
              fontWeight: 500,
              fontSize: 'clamp(1.75rem, 4.2vw, 3.25rem)',
              lineHeight: 1.1,
              color: 'var(--ink-strong)',
              letterSpacing: '-0.018em',
              marginBottom: '0.5rem',
            }}
          >
            <span style={{ color: 'var(--accent-burnt)' }}>{ORIGIN_PHILOSOPHY.passion}</span>
          </p>
          <p
            style={{
              fontFamily: 'Fraunces, Georgia, serif',
              fontVariationSettings: '"opsz" 144, "SOFT" 80, "WONK" 1',
              fontStyle: 'italic',
              fontWeight: 500,
              fontSize: 'clamp(1.75rem, 4.2vw, 3.25rem)',
              lineHeight: 1.1,
              color: 'var(--ink)',
              letterSpacing: '-0.018em',
            }}
          >
            {ORIGIN_PHILOSOPHY.purpose}
          </p>
          <p
            className="mt-4"
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.62rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'var(--ink-mute)',
            }}
          >
            — Austin Humphrey
          </p>
        </motion.div>
      </div>
    </section>
  );
}
