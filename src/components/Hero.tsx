import { motion } from 'framer-motion';
import { EASE_OUT_EXPO } from '../utils/animations';
import { RESUME_PATH } from '../content/site';

export default function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative min-h-screen flex items-center overflow-hidden bg-midnight"
    >
      {/* Subtle gradient mesh — atmosphere without distraction */}
      <div className="absolute inset-0 pointer-events-none hero-gradient-mesh opacity-40" />
      <div className="grain-overlay" />

      <div className="relative z-10 px-6 md:px-12 lg:px-16 max-w-6xl mx-auto w-full py-24 md:py-32">
        <div className="grid md:grid-cols-[1fr_auto] gap-12 md:gap-16 items-center">

          {/* Text — who Austin is, for employers */}
          <div className="order-2 md:order-1 text-center md:text-left">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT_EXPO }}
              className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-burnt-orange/80 mb-6"
            >
              San Antonio, TX &nbsp;&middot;&nbsp; UT Austin
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20, letterSpacing: '0.15em' }}
              animate={{ opacity: 1, y: 0, letterSpacing: '0.05em' }}
              transition={{ duration: 0.9, delay: 0.2, ease: EASE_OUT_EXPO }}
            >
              <h1
                id="hero-heading"
                className="font-sans font-bold uppercase leading-[0.9] text-bone mb-6"
                style={{ textShadow: '0 2px 30px rgba(0,0,0,0.5)' }}
              >
                <span className="block hero-first-name">Austin</span>
                <span
                  className="block text-burnt-orange hero-last-name"
                  style={{ textShadow: '0 4px 50px rgba(191,87,0,0.3)' }}
                >
                  Humphrey
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: EASE_OUT_EXPO }}
              className="font-sans font-semibold text-burnt-orange uppercase tracking-[0.2em] text-sm mb-8"
            >
              Born to Blaze the Path Beaten Less
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: EASE_OUT_EXPO }}
              className="text-bone/85 text-lg md:text-xl max-w-xl mb-10 leading-relaxed mx-auto md:mx-0"
            >
              I build real products that real people use — from the first commit
              to the live deployment. Strategy, full-stack engineering, data,
              and design. Solo-shipped a live analytics platform covering six
              professional and college sports leagues on Cloudflare's global
              network.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: EASE_OUT_EXPO }}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <a
                href="#projects"
                onClick={() => window.posthog?.capture('hero_cta_clicked', { cta: 'see_work' })}
                className="btn-primary"
              >
                See What I've Built
              </a>
              <a
                href={RESUME_PATH}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => window.posthog?.capture('hero_cta_clicked', { cta: 'resume' })}
                className="btn-outline gradient-border-hover"
              >
                Resume
              </a>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-16 hidden md:flex items-end justify-between"
            >
              <div>
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
              </div>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById('contact');
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                  window.posthog?.capture('hero_get_in_touch_clicked');
                }}
                className="font-mono text-[9px] tracking-[0.2em] uppercase text-warm-gray/30 hover:text-burnt-orange transition-colors duration-300"
              >
                Get in touch &darr;
              </a>
            </motion.div>
          </div>

          {/* Portrait — the professional headshot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: EASE_OUT_EXPO }}
            className="order-1 md:order-2 flex justify-center md:justify-end group"
          >
            <div className="relative">
              {/* Burnt-orange accent glow */}
              <div
                className="absolute -inset-1 rounded-sm opacity-20"
                style={{
                  background: 'linear-gradient(135deg, rgba(191,87,0,0.4), transparent 60%)',
                }}
              />
              <img
                src="/assets/austin-headshot.webp"
                alt="Austin Humphrey — builder, UT Austin graduate"
                className="relative rounded-sm w-64 md:w-72 lg:w-80 shadow-2xl border border-bone/5"
                loading="eager"
                fetchPriority="high"
                style={{
                  filter: 'contrast(1.02) brightness(0.98)',
                }}
              />
              {/* Corner marks */}
              <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-burnt-orange/30 transition-all duration-500 group-hover:w-7 group-hover:h-7 group-hover:border-burnt-orange/50" />
              <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-burnt-orange/30 transition-all duration-500 group-hover:w-7 group-hover:h-7 group-hover:border-burnt-orange/50" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
