import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '../utils/animations';
import { PORTFOLIO_PROJECTS } from '../content/site';

/** Map project names → optimized screenshot paths at multiple sizes */
const SCREENSHOTS: Record<string, { small: string; large: string }> = {
  'Blaze Sports Intel': {
    small: '/assets/optimized/bsi-homepage-640w.webp',
    large: '/assets/optimized/bsi-homepage-1024w.webp',
  },
  'BSI Radar Lab': {
    small: '/assets/optimized/labs-screenshot-640w.webp',
    large: '/assets/optimized/labs-screenshot-1024w.webp',
  },
  'BlazeCraft': {
    small: '/assets/optimized/blazecraft-screenshot-640w.webp',
    large: '/assets/optimized/blazecraft-screenshot-1024w.webp',
  },
  'Sandlot Sluggers': {
    small: '/assets/optimized/arcade-screenshot-640w.webp',
    large: '/assets/optimized/arcade-screenshot-1024w.webp',
  },
  'A Documented Heritage': {
    small: '/assets/optimized/dna-screenshot-640w.webp',
    large: '/assets/optimized/dna-screenshot-1024w.webp',
  },
};

function LiveBadge() {
  return (
    <span className="flex items-center gap-1.5 text-[0.6rem] font-mono text-emerald-400 uppercase tracking-widest" title="Running in production right now">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
      </span>
      Live
    </span>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="section-padding"
    >
      <div className="container-custom">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={staggerContainer}
        >
          <motion.div variants={staggerItem}>
            <p className="section-label">// The Work</p>
            <div className="flex items-center gap-4 mb-10">
              <h2 id="projects-heading" className="section-title mb-0">Projects</h2>
              <span className="flex items-center gap-1.5 text-[0.6rem] font-mono text-emerald-400 uppercase tracking-widest border border-emerald-400/20 bg-emerald-400/5 px-2.5 py-1 rounded-sm" aria-label="4 projects currently live in production">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                4 Live
              </span>
            </div>
          </motion.div>

          {/* Heavy-weight projects — larger cards with screenshots */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {PORTFOLIO_PROJECTS.featured.map((project) => {
              const shot = SCREENSHOTS[project.name];
              return (
                <motion.a
                  key={project.name}
                  variants={staggerItem}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card group block gradient-border-hover rounded-sm project-card-featured-bg overflow-hidden"
                >
                  {/* Screenshot — use larger variant for featured projects */}
                  {shot && (
                    <div className="overflow-hidden border-b border-bone/5 img-skeleton">
                      <img
                        src={shot.large}
                        alt={`${project.name} — live screenshot`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.02]"
                      />
                    </div>
                  )}

                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-[0.6rem] font-mono text-burnt-orange bg-burnt-orange/10 border border-burnt-orange/20 px-3 py-1 rounded-sm uppercase tracking-widest">
                          {project.highlight}
                        </span>
                        {project.live && <LiveBadge />}
                      </div>
                      <svg className="w-5 h-5 text-bone/20 group-hover:text-burnt-orange group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 shrink-0" viewBox="0 0 20 20" fill="none">
                        <path d="M5 15L15 5M15 5H8M15 5V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>

                    <h3 className="font-sans font-bold text-xl uppercase tracking-wider text-bone mb-3 group-hover:text-burnt-orange transition-colors duration-300">
                      {project.name}
                    </h3>
                    <p className="text-bone/75 text-base leading-relaxed">{project.description}</p>
                  </div>
                </motion.a>
              );
            })}
          </div>

          {/* Light-weight projects — compact treatment with thumbnails */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PORTFOLIO_PROJECTS.supporting.map((project) => {
              const shot = SCREENSHOTS[project.name];
              return (
                <motion.a
                  key={project.name}
                  variants={staggerItem}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group card rounded-sm overflow-hidden"
                >
                  {/* Thumbnail — smaller variant for supporting projects */}
                  {shot && (
                    <div className="overflow-hidden border-b border-bone/5 max-h-[160px] img-skeleton">
                      <img
                        src={shot.small}
                        alt={`${project.name} screenshot`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[0.55rem] font-mono text-burnt-orange bg-burnt-orange/10 border border-burnt-orange/20 px-2 py-0.5 rounded-sm uppercase tracking-widest">
                        {project.highlight}
                      </span>
                      {project.live && <LiveBadge />}
                    </div>
                    <h3 className="font-sans font-semibold text-sm uppercase tracking-wider text-bone group-hover:text-burnt-orange transition-colors duration-300 mb-1">
                      {project.name}
                    </h3>
                    <p className="text-bone/60 text-sm leading-relaxed">{project.description}</p>
                  </div>
                </motion.a>
              );
            })}
          </div>

          {/* GitHub link */}
          <motion.div variants={staggerItem} className="mt-8 text-center md:text-left">
            <a
              href="https://github.com/ahump20"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-warm-gray/50 hover:text-burnt-orange transition-colors duration-300"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              More on GitHub
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
