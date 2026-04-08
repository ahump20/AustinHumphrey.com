import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '../utils/animations';

interface PhotoProps {
  src: string;
  srcSet: string;
  alt: string;
}

const originMoments = [
  {
    title: 'The soil came first',
    text:
      'Austin was born in Memphis on August 17, 1995, but his parents brought Texas soil from West Columbia and placed it beneath his mother before he was born. The doctor told the family, "You know you ain\'t the first to do this, but they\'ve ALL been from Texas." The next day the El Campo Leader-News ran the headline "Tennessee Birth Will Be on Texas Soil." Not a gesture for a story later — a family continuation.',
  },
  {
    title: 'Sports culture was native, not added',
    text:
      'Ricky Williams, UT season tickets, youth baseball, Friday night lights, and the Forty Acres all formed the same worldview: Texas was never only geography. It was a standard for how to show up.',
  },
  {
    title: 'BSI came out of lived history',
    text:
      'Blaze Sports Intel was named from Bartlett Blaze, Austin\'s dachshund, whose name traces back to his first youth baseball team. The brand was not invented in a vacuum. It was remembered into form.',
  },
];

function PhotoCard({ src, srcSet, alt }: PhotoProps) {
  return (
    <motion.div
      variants={staggerItem}
      className="group overflow-hidden rounded-sm border border-bone/10 bg-charcoal/40"
    >
      <img
        src={src}
        srcSet={srcSet}
        sizes="(max-width: 640px) 200px, 260px"
        alt={alt}
        loading="lazy"
        decoding="async"
        className="block h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
      />
      <div className="border-t border-bone/10 px-4 py-3">
        <p className="text-[0.65rem] font-mono uppercase tracking-[0.22em] text-warm-gray/80">{alt}</p>
      </div>
    </motion.div>
  );
}

export default function About() {
  return (
    <section
      id="origin"
      aria-labelledby="origin-heading"
      className="section-padding section-border about-section-top"
    >
      <div className="container-custom max-w-4xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={staggerContainer}
        >
          <motion.div variants={staggerItem}>
            <p className="section-label">// The Origin</p>
            <h2 id="origin-heading" className="section-title">
              Born in Memphis. Rooted in Texas Soil.
            </h2>
            <p className="editorial-lead max-w-3xl">
              Texas was never a backdrop. It was the standard behind the family, the sports, the
              identity, and eventually the work.
            </p>
          </motion.div>

          <motion.div variants={staggerItem} className="grid gap-6 md:grid-cols-2 mb-12">
            <PhotoCard
              src="/assets/texas-soil.jpg"
              srcSet="/assets/optimized/texas-soil-640w.webp 640w, /assets/optimized/texas-soil-1024w.webp 1024w"
              alt="West Columbia soil, preserved article, and the beginning of the story"
            />
            <PhotoCard
              src="/assets/young-austin-longhorns.jpg"
              srcSet="/assets/optimized/young-austin-longhorns-640w.webp 640w, /assets/optimized/young-austin-longhorns-1024w.webp 1024w"
              alt="Longhorn allegiance started early and never needed explanation"
            />
          </motion.div>

          <div className="space-y-8 mb-12">
            {originMoments.map((moment, index) => (
              <motion.article
                key={moment.title}
                variants={staggerItem}
                className="grid gap-4 border-t border-bone/10 pt-6 md:grid-cols-[4rem_minmax(0,1fr)]"
              >
                <div className="font-mono text-xs uppercase tracking-[0.24em] text-burnt-orange/70">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="space-y-3">
                  <h3 className="font-sans text-base font-semibold uppercase tracking-[0.18em] text-bone">
                    {moment.title}
                  </h3>
                  <p className="text-base leading-8 text-bone/85">{moment.text}</p>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Documentary proof — birth article and certificate */}
          <motion.div variants={staggerItem} className="grid gap-6 md:grid-cols-2 mb-12">
            <PhotoCard
              src="/assets/birth-article.jpg"
              srcSet="/assets/optimized/birth-article-640w.webp 640w, /assets/optimized/birth-article-1024w.webp 1024w"
              alt="El Campo Leader-News: Tennessee Birth Will Be on Texas Soil"
            />
            <PhotoCard
              src="/assets/birth-certificate.jpg"
              srcSet="/assets/optimized/birth-certificate-640w.webp 640w, /assets/optimized/birth-certificate-1024w.webp 1024w"
              alt="Birth certificate — Memphis, Tennessee, August 17, 1995"
            />
          </motion.div>

          <motion.div variants={staggerItem} className="grid gap-6 md:grid-cols-2 mb-12">
            <div className="overflow-hidden rounded-sm border border-bone/10 bg-charcoal/40">
              <img
                src="/assets/blaze-dog.jpg"
                srcSet="/assets/optimized/blaze-dog-640w.webp 640w, /assets/optimized/blaze-dog-1024w.webp 1024w"
                sizes="(max-width: 640px) 100vw, 50vw"
                alt="Bartlett Blaze, the namesake that turned memory into brand"
                loading="lazy"
                decoding="async"
                className="block h-full w-full object-cover"
              />
              <div className="border-t border-bone/10 px-4 py-3">
                <p className="text-[0.65rem] font-mono uppercase tracking-[0.22em] text-warm-gray/80">
                  Bartlett Blaze, the namesake that turned memory into brand
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <blockquote className="border-l border-burnt-orange/40 pl-6 text-xl italic leading-relaxed text-bone/85">
                Texas isn&apos;t a birthplace here. It&apos;s a covenant with family, effort, and
                how you choose to carry yourself when nobody is obligated to care.
              </blockquote>
            </div>
          </motion.div>

          {/* Closing photo — family milestone */}
          <motion.div variants={staggerItem} className="mt-8">
            <PhotoCard
              src="/assets/nana-graduation.jpg"
              srcSet="/assets/optimized/nana-graduation-640w.webp 640w, /assets/optimized/nana-graduation-1024w.webp 1024w"
              alt="Graduation day with Nana — Full Sail University, 2026"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
