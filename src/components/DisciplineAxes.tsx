import { motion } from 'framer-motion';
import { EASE_OUT_EXPO } from '../utils/animations';
import { DISCIPLINE_AXES } from '../content/site';
import SectionBar from './primitives/SectionBar';

export default function DisciplineAxes() {
  return (
    <section
      id="disciplines"
      aria-labelledby="disciplines-heading"
      className="ink-ground"
    >
      <SectionBar
        numeral="Chapter I"
        title={<>The Three <em>Axes</em></>}
        kicker="Sports Intelligence · Ent. Business · Applied AI"
      />

      <div className="ed-section ed-container">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          id="disciplines-heading"
          className="ed-lede mb-12"
          style={{ color: 'var(--bone)', maxWidth: '62ch' }}
        >
          Three disciplines, one builder. Each axis has live experience, formal
          credentials, and deployed work — the portfolio stacks proof under
          each one, not claims on top of it.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {DISCIPLINE_AXES.map((axis, i) => (
            <motion.div
              key={axis.numeral}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: EASE_OUT_EXPO }}
              className="axis-card"
            >
              <span className="axis-card__numeral">Axis {axis.numeral}</span>
              <h3 className="axis-card__title">{axis.title}</h3>
              <p className="axis-card__desc">{axis.desc}</p>
              <a
                href={axis.proofHref}
                className="axis-card__proof ed-link ed-focus"
              >
                {axis.proofLabel} →
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
