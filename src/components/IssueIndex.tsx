import { motion } from 'framer-motion';
import { EASE_OUT_EXPO } from '../utils/animations';
import { ISSUE_INDEX, ISSUE_DATELINE } from '../content/site';

export default function IssueIndex() {
  const handleNavigate = (event: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    event.preventDefault();
    const target = document.getElementById(targetId);
    if (!target) return;
    const top = window.scrollY + target.getBoundingClientRect().top - 80;
    window.history.replaceState(null, '', `/#${targetId}`);
    window.scrollTo({ top, behavior: 'smooth' });
    window.posthog?.capture('issue_index_clicked', { chapter: targetId });
  };

  return (
    <section
      id="index"
      aria-labelledby="index-heading"
      className="paper-ground"
    >
      <div className="ed-section ed-container">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-2 pb-6"
          style={{ borderBottom: '1px solid var(--margin-rule)' }}
        >
          <div>
            <p className="ed-kicker mb-3" style={{ color: 'var(--accent-burnt)' }}>
              Issue Contents
            </p>
            <h2
              id="index-heading"
              style={{
                fontFamily: 'Fraunces, Georgia, serif',
                fontVariationSettings: '"opsz" 96, "SOFT" 30',
                fontWeight: 500,
                fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
                lineHeight: 1.02,
                letterSpacing: '-0.02em',
                color: 'var(--ink-strong)',
                margin: 0,
              }}
            >
              The whole thing,{' '}
              <em
                style={{
                  fontStyle: 'italic',
                  fontVariationSettings: '"opsz" 144, "SOFT" 100, "WONK" 1',
                  color: 'var(--accent-burnt)',
                }}
              >
                in one glance.
              </em>
            </h2>
          </div>
          <div className="text-left md:text-right">
            <p
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.62rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--ink-mute)',
                fontWeight: 500,
              }}
            >
              {ISSUE_DATELINE}
            </p>
            <p
              className="mt-2"
              style={{
                fontFamily: 'Fraunces, Georgia, serif',
                fontVariationSettings: '"opsz" 14',
                fontStyle: 'italic',
                fontSize: '0.95rem',
                color: 'var(--ink-mute)',
                maxWidth: '32ch',
              }}
            >
              Six chapters. One builder. Click a row to jump to its plate.
            </p>
          </div>
        </motion.div>

        <motion.nav
          aria-label="Chapters in this issue"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
          }}
          className="issue-index"
        >
          {ISSUE_INDEX.map((entry) => (
            <motion.a
              key={entry.targetId}
              href={`#${entry.targetId}`}
              onClick={(event) => handleNavigate(event, entry.targetId)}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
              }}
              className="issue-index__row ed-focus"
            >
              <span className="issue-index__numeral tabular-figs">{entry.numeral}</span>
              <span className="issue-index__title">{entry.title}</span>
              <span className="issue-index__subtitle">{entry.subtitle}</span>
              <span className="issue-index__page tabular-figs">{entry.page}</span>
            </motion.a>
          ))}
        </motion.nav>
      </div>
    </section>
  );
}
