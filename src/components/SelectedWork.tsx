import { motion } from 'framer-motion';
import { EASE_OUT_EXPO } from '../utils/animations';
import { WORK_GALLERY, WorkItem } from '../content/site';
import SectionBar from './primitives/SectionBar';

function WorkCard({ item, index }: { item: WorkItem; index: number }) {
  const span =
    item.span === 'feature' ? 'work-card--feature' :
    item.span === 'half'    ? 'work-card--half' :
                              'work-card--third';
  const isPractice = item.span === 'third' && item.practiceText;
  const cardClass = `work-card ${span} ${isPractice ? 'work-card--practice' : ''}`.trim();

  const Inner = (
    <>
      <div className="work-card__plate">
        {isPractice ? (
          <span className="work-card__plate-text">{item.practiceText}</span>
        ) : item.image ? (
          <img
            src={item.image.src}
            srcSet={item.image.srcSet}
            sizes={item.span === 'feature' ? '(max-width: 1024px) 100vw, 60vw' : item.span === 'half' ? '(max-width: 1024px) 100vw, 50vw' : '(max-width: 640px) 100vw, 33vw'}
            alt={item.image.alt}
            loading="lazy"
            decoding="async"
          />
        ) : null}
      </div>
      <div className="work-card__body">
        <div className="work-card__rail">
          <span className="work-card__role">{item.role}</span>
          <span className="work-card__year">{item.year}</span>
        </div>
        <h3 className="work-card__title">
          {item.title}
          {item.titleEm ? (
            <>
              {' '}
              <em>{item.titleEm}</em>
            </>
          ) : null}
        </h3>
        <p className="work-card__lede">{item.lede}</p>
        {item.tech.length > 0 && (
          <div className="work-card__tech">
            {item.tech.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        )}
        {item.href ? (
          <span className="work-card__cta">
            {item.cta}
            <span aria-hidden>↗</span>
          </span>
        ) : (
          <span className="work-card__cta" style={{ color: 'var(--ink-mute)' }}>
            {item.cta}
          </span>
        )}
      </div>
    </>
  );

  if (item.href) {
    return (
      <motion.a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => window.posthog?.capture('work_clicked', { project: item.title })}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, delay: 0.05 * index, ease: EASE_OUT_EXPO }}
        className={`${cardClass} ed-focus`}
        style={{ textDecoration: 'none', color: 'inherit' }}
        aria-label={`${item.title}${item.titleEm ? ' ' + item.titleEm : ''} — ${item.role}`}
      >
        {Inner}
      </motion.a>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: 0.05 * index, ease: EASE_OUT_EXPO }}
      className={cardClass}
    >
      {Inner}
    </motion.article>
  );
}

export default function SelectedWork() {
  return (
    <section
      id="selected-work"
      aria-labelledby="work-heading"
      className="paper-ground"
    >
      <SectionBar
        numeral="Chapter III"
        title={<>Selected <em>Work</em></>}
        kicker="Five Independent Projects · 2023 – Present"
      />

      <div className="ed-section ed-container">
        <motion.p
          id="work-heading"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className="ed-lede mb-12"
          style={{ color: 'var(--ink-mute)', maxWidth: '60ch' }}
        >
          Five projects, all built and maintained independently. Sports
          intelligence, physics-based analytics, infrastructure, browser
          gaming, and an applied AI practice that runs through every one
          of them.
        </motion.p>

        <div className="work-grid">
          {WORK_GALLERY.map((item, i) => (
            <WorkCard key={item.title + (item.titleEm ?? '')} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
