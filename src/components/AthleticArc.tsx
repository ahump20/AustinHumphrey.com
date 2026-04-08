import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '../utils/animations';

const photos = [
  {
    src: '/assets/optimized/running-vs-tivy-640w.webp',
    srcSet: '/assets/optimized/running-vs-tivy-640w.webp 640w, /assets/optimized/running-vs-tivy-1024w.webp 1024w',
    alt: 'Chargers #20 — corner route vs Tivy',
    aspect: 'wide' as const,
    featured: false,
  },
  {
    src: '/assets/optimized/chargers-with-dad-640w.webp',
    srcSet: '/assets/optimized/chargers-with-dad-640w.webp 640w, /assets/optimized/chargers-with-dad-1024w.webp 1024w',
    alt: 'Post-game with Dad — Friday night lights',
    aspect: 'tall' as const,
    featured: false,
  },
  {
    src: '/assets/optimized/last-game-silhouette-640w.webp',
    srcSet: '/assets/optimized/last-game-silhouette-640w.webp 640w, /assets/optimized/last-game-silhouette-1024w.webp 1024w',
    alt: 'Last game — vs Seguin, 2013',
    aspect: 'wide' as const,
    featured: true,
  },
  {
    src: '/assets/optimized/friendsgiving-640w.webp',
    srcSet: '/assets/optimized/friendsgiving-640w.webp 640w, /assets/optimized/friendsgiving-1024w.webp 1024w',
    alt: 'Friendsgiving — Austin, TX',
    aspect: 'wide' as const,
    featured: false,
  },
  {
    src: '/assets/optimized/ballpark-kids-640w.webp',
    srcSet: '/assets/optimized/ballpark-kids-640w.webp 640w, /assets/optimized/ballpark-kids-1024w.webp 1024w',
    alt: 'Ballpark days — where it started',
    aspect: 'wide' as const,
    featured: false,
  },
  {
    src: '/assets/optimized/titans-halloween-640w.webp',
    srcSet: '/assets/optimized/titans-halloween-640w.webp 640w, /assets/optimized/titans-halloween-1024w.webp 1024w',
    alt: 'Remember the Titans — Halloween, always football',
    aspect: 'tall' as const,
    featured: false,
  },
];

export default function AthleticArc() {
  return (
    <section
      id="athletic-arc"
      aria-label="Athletic arc — Friday Night Lights to the Forty Acres"
      className="relative pt-8 pb-12 overflow-hidden athletic-arc-bg"
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px accent-line-horizontal"
      />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={staggerContainer}
        >
          <motion.p
            variants={staggerItem}
            className="section-label text-center mb-10"
          >
            // Friday Night Lights to the Forty Acres
          </motion.p>

          {/* Desktop: staggered grid */}
          <div className="hidden md:grid md:grid-cols-12 gap-4 items-center">
            {photos.map((photo) => {
              // Layout: wide photos span 7 cols, tall photos span 5 cols
              // Alternate alignment for visual rhythm
              const isWide = photo.aspect === 'wide';
              const colSpan = isWide ? 'md:col-span-7' : 'md:col-span-5';
              const isLastGame = photo.featured;

              return (
                <motion.div
                  key={photo.alt}
                  variants={staggerItem}
                  className={`${colSpan} relative group ${isLastGame ? 'grid-full-span' : ''}`}
                >
                  <div
                    className={`overflow-hidden rounded-sm border border-bone/5 ${
                      isLastGame ? 'max-h-[400px]' : 'max-h-[320px]'
                    }`}
                  >
                    <img
                      src={photo.src}
                      srcSet={photo.srcSet}
                      sizes="(max-width: 768px) 85vw, 60vw"
                      alt={photo.alt}
                      loading="lazy"
                      decoding="async"
                      className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02] ${
                        isLastGame ? 'object-center min-h-photo' : ''
                      }`}
                    />
                    {/* Vignette overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none vignette-inset"
                    />
                    {/* Hover caption overlay */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <p className={`text-xs font-mono ${isLastGame ? 'text-burnt-orange' : 'text-warm-gray/90'}`}>
                        {photo.alt}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile: horizontal scroll strip with edge fade hints */}
          <div className="md:hidden -mx-6 px-6 overflow-x-auto scrollbar-hide relative">
            {/* Scroll fade hints */}
            <div className="pointer-events-none absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-midnight/90 to-transparent z-10 md:hidden" />
            <div className="flex gap-4 pb-4 mobile-scroll-track">
              {photos.map((photo) => {
                const isLastGame = photo.featured;
                return (
                  <div
                    key={photo.alt}
                    className={`flex-shrink-0 ${
                      isLastGame ? 'w-[85vw]' : 'w-[70vw]'
                    }`}
                  >
                    <div className="overflow-hidden rounded-sm max-h-[240px]">
                      <img
                        src={photo.src}
                        srcSet={photo.srcSet}
                        sizes="85vw"
                        alt={photo.alt}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p
                      className={`text-xs font-mono mt-2 ${
                        isLastGame ? 'text-burnt-orange' : 'text-warm-gray/80'
                      }`}
                    >
                      {photo.alt}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px accent-line-horizontal"
      />
    </section>
  );
}
