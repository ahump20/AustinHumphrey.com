import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '../utils/animations';

export default function Philosophy() {
  return (
    <section
      id="covenant"
      aria-labelledby="covenant-heading"
      className="section-padding section-border relative overflow-hidden philosophy-bg"
    >
      <div className="container-custom max-w-4xl mx-auto text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={staggerContainer}
        >
          <motion.div variants={staggerItem}>
            <p className="section-label">// The Covenant</p>
            <h2 id="covenant-heading" className="sr-only">Texas Covenant</h2>
          </motion.div>

          {/* Geometric accent lines */}
          <motion.div aria-hidden="true" variants={staggerItem} className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-burnt-orange/40" />
            <div className="w-2 h-2 rotate-45 border border-burnt-orange/40" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-burnt-orange/40" />
          </motion.div>

          {/* Contemplative portrait — the quiet Austin between the declarations */}
          <motion.div variants={staggerItem} className="mb-10 flex justify-center">
            <div className="relative">
              <img
                src="/assets/optimized/hawaiian-candid-640w.webp"
                srcSet="/assets/optimized/hawaiian-candid-640w.webp 640w, /assets/optimized/hawaiian-candid-1024w.webp 1024w"
                sizes="(max-width: 640px) 200px, 280px"
                alt="Austin — warm afternoon light, looking off-camera"
                loading="lazy"
                decoding="async"
                className="w-48 md:w-64 rounded-sm shadow-lg"
                style={{ filter: 'contrast(1.02) brightness(0.98)' }}
              />
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-burnt-orange/25" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-burnt-orange/25" />
            </div>
          </motion.div>

          <motion.blockquote variants={staggerItem} className="mb-12">
            <p className="font-display italic text-bone/90 text-3xl md:text-5xl leading-relaxed mb-6">
              "For me, personally, I believe Texas is how you choose to treat
              the best and worst of us."
            </p>
            <footer className="text-sm font-mono text-burnt-orange">— Austin Humphrey</footer>
          </motion.blockquote>

          <motion.div variants={staggerItem} className="text-warm-gray text-lg leading-relaxed space-y-6 text-left max-w-2xl mx-auto">
            <p>
              It's a covenant with oneself and the company one keeps, to never stop dreaming
              beyond the horizon, regardless of race, ethnicity, religion, or even birth soil.
            </p>
            <p>
              The land doesn't care about your resume. The wind doesn't read your LinkedIn.
              What matters is whether you showed up when it was hard, stayed when it was
              thankless, and built something that outlasts the news cycle.
            </p>
          </motion.div>

          {/* Closing line with animated underline */}
          <motion.div
            variants={staggerItem}
            className="mt-12"
          >
            <p className="font-sans font-bold uppercase tracking-[0.2em] text-xl md:text-2xl">
              <span className="relative inline-block">
                <span className="text-burnt-orange">It's not where you're from.</span>
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 bg-burnt-orange"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5, ease: [0.19, 1, 0.22, 1] }}
                />
              </span>
              <br />
              <span className="text-bone mt-1 block">It's how you show up.</span>
            </p>
          </motion.div>

          {/* Crockett whisper — ceremonial citation */}
          <motion.p
            variants={staggerItem}
            className="mt-16 font-display italic text-sm text-warm-gray/40 hover:text-warm-gray/60 tracking-wide transition-colors duration-500 cursor-default"
          >
            &ldquo;You may all go to hell, and I will go to Texas.&rdquo;
            <span className="block mt-1 not-italic font-mono text-[0.55rem] uppercase tracking-[0.3em] text-burnt-orange/30">
              &mdash; Davy Crockett, 1835
            </span>
          </motion.p>

          {/* Transition bridge — wider diamond accent signaling the close */}
          <motion.div
            aria-hidden="true"
            variants={staggerItem}
            className="flex items-center justify-center gap-3 mt-12 opacity-30"
          >
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-burnt-orange/40" />
            <div className="w-1.5 h-1.5 rotate-45 border border-burnt-orange/40" />
            <div className="h-px w-12 bg-burnt-orange/20" />
            <div className="w-1.5 h-1.5 rotate-45 border border-burnt-orange/40" />
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-burnt-orange/40" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
