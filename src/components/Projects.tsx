import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '../utils/animations';
import { PORTFOLIO_PROJECTS } from '../content/site';

/** Map project names → optimized screenshot path */
const SCREENSHOTS: Record<string, string> = {
  'Blaze Sports Intel': '/assets/optimized/bsi-homepage-640w.webp',
  'BSI Radar Lab': '/assets/optimized/labs-screenshot-640w.webp',
  'BlazeCraft': '/assets/optimized/blazecraft-screenshot-640w.webp',
  'Sandlot Sluggers': '/assets/optimized/arcade-screenshot-640w.webp',
  'A Documented Heritage': '/assets/optimized/dna-screenshot-640w.webp',
};

function LiveBadge() {
  return (
    <span className="flex items-center gap-1.5 text-[0.6rem] font-mono text-emerald-400 uppercase tracking-widest">
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
            <h2 id="projects-heading" className="section-title">Projects</h2>
          </motion.div>

          {/* Heavy-weight projects — larger cards with screenshots */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {PORTFOLIO_PROJECTS.featured.map((project) => {
              const shotSrc = SCREENSHOTS[project.name];
              return (
                <motion.a
                  key={project.name}
                  variants={staggerItem}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card group block gradient-border-hover rounded-sm project-card-featured-bg overflow-hidden"
                >
                  {/* Screenshot */}
                  {shotSrc && (
                    <div className="overflow-hidden border-b border-bone/5">
                      <img
                        src={shotSrc}
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
              const shotSrc = SCREENSHOTS[project.name];
              return (
                <motion.a
                  key={project.name}
                  variants={staggerItem}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group card rounded-sm overflow-hidden"
                >
                  {/* Thumbnail */}
                  {shotSrc && (
                    <div className="overflow-hidden border-b border-bone/5 max-h-[160px]">
                      <img
                        src={shotSrc}
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
        </motion.div>
      </div>
    </section>
  );
}
