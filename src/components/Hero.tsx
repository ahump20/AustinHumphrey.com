import { motion } from 'framer-motion';
import { EASE_OUT_EXPO } from '../utils/animations';
import { PLATFORM_URLS } from '../content/site';

export default function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-heading" className="relative min-h-screen flex items-center overflow-hidden bg-midnight">
      {/* Static editorial gradient — deliberate burnt-orange anchor at top-right */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 hero-gradient-mesh"
        />
      </div>

      {/* Content — left-aligned on desktop, centered on mobile */}
      <div className="relative z-10 px-6 md:px-12 lg:px-16 max-w-6xl mx-auto w-full py-32 md:py-0">
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
          className="text-center md:text-left"
        >
          <h1
            id="hero-heading"
            className="font-sans font-bold uppercase leading-[0.9] tracking-wider text-bone mb-6"
          >
            <span className="block hero-first-name">
              Austin
            </span>
            <span
              className="block text-stroke text-burnt-orange hero-last-name"
            >
              Humphrey
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: EASE_OUT_EXPO }}
          className="font-sans font-semibold text-burnt-orange uppercase tracking-[0.2em] text-sm mb-6 text-center md:text-left"
        >
          Born to Blaze the Path Beaten Less
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: EASE_OUT_EXPO }}
          className="text-warm-gray text-lg md:text-xl max-w-xl mb-10 leading-relaxed text-center md:text-left"
        >
          Built Blaze Sports Intel solo — live analytics, park-adjusted sabermetrics, and original editorial for 330 D1 college baseball programs.
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
      </div>
    </section>
  );
}
