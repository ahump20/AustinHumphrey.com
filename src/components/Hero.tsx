import { motion } from 'framer-motion';
import { EASE_OUT_EXPO } from '../utils/animations';
import { PLATFORM_URLS } from '../content/site';

export default function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative min-h-screen flex items-end overflow-hidden bg-midnight"
    >
      {/* Background photograph — football uniform, real and personal */}
      <img
        src="/assets/optimized/football-uniform-1920w.webp"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-top hero-photo-ken-burns"
        loading="eager"
        fetchPriority="high"
      />

      {/* Dark gradient overlay — ensures text readability while preserving atmosphere */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.35) 30%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.75) 70%, rgba(13,13,13,0.95) 90%, rgba(13,13,13,1) 100%)',
        }}
      />

      {/* Editorial gradient mesh — subtle warm tint over the overlay */}
      <div className="absolute inset-0 pointer-events-none hero-gradient-mesh opacity-60" />

      {/* Film grain texture */}
      <div className="grain-overlay" />

      {/* Content — anchored to bottom of viewport for dramatic reveal */}
      <div className="relative z-10 px-6 md:px-12 lg:px-16 max-w-6xl mx-auto w-full pb-16 md:pb-24 pt-32">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className="section-label mb-6 text-center md:text-left"
        >
          Sports Intelligence Architect
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE_OUT_EXPO }}
        >
          <h1
            id="hero-heading"
            className="font-sans font-bold uppercase leading-[0.9] tracking-wider text-bone mb-6 text-center md:text-left"
            style={{ textShadow: '0 2px 30px rgba(0,0,0,0.7)' }}
          >
            <span className="block hero-first-name">Austin</span>
            <span className="block text-burnt-orange hero-last-name" style={{ textShadow: '0 4px 50px rgba(191,87,0,0.3), 0 2px 20px rgba(0,0,0,0.8)' }}>
              Humphrey
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: EASE_OUT_EXPO }}
          className="font-sans font-semibold text-burnt-orange uppercase tracking-[0.2em] text-sm mb-6 text-center md:text-left"
          style={{ textShadow: '0 1px 12px rgba(0,0,0,0.6)' }}
        >
          Born to Blaze the Path Beaten Less
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: EASE_OUT_EXPO }}
          className="text-bone/90 text-lg md:text-xl max-w-xl mb-10 leading-relaxed text-center md:text-left mx-auto md:mx-0"
          style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}
        >
          Built Blaze Sports Intel solo — live analytics, park-adjusted
          sabermetrics, and original editorial for 330 D1 college baseball
          programs. Six leagues. One builder.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: EASE_OUT_EXPO }}
          className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
        >
          <a
            href={PLATFORM_URLS.bsi}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Blaze Sports Intel
          </a>
          <a href="#projects" className="btn-outline">
            See the Work
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-12"
        >
          <span
            className="inline-block font-mono text-[9px] tracking-[0.3em] uppercase"
            style={{ color: 'rgba(245,240,235,0.25)' }}
          >
            Scroll
          </span>
          <div
            className="w-px h-8 mt-2"
            style={{ background: 'linear-gradient(to bottom, rgba(191,87,0,0.4), transparent)' }}
          />
        </motion.div>
      </div>
    </section>
  );
}
