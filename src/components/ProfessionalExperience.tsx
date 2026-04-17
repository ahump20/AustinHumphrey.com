import { motion } from 'framer-motion';
import { EASE_OUT_EXPO } from '../utils/animations';
import { PROFESSIONAL_EXPERIENCE } from '../content/site';
import SectionBar from './primitives/SectionBar';

export default function ProfessionalExperience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="ink-ground"
    >
      <SectionBar
        numeral="Chapter II"
        title={<>Professional <em>Experience</em></>}
        kicker="Real Roles · Real Results"
      />

      <div className="ed-section ed-container">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          id="experience-heading"
          className="ed-lede mb-12"
          style={{ color: 'var(--bone)', maxWidth: '56ch' }}
        >
          Four years of client-facing revenue work. Advertising strategy that
          moved campaign decisions; financial planning that moved household
          outcomes. The discipline translates.
        </motion.p>

        <div className="timeline">
          {PROFESSIONAL_EXPERIENCE.map((node, i) => (
            <motion.article
              key={node.employer}
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.12, ease: EASE_OUT_EXPO }}
              className="timeline-node"
            >
              <p className="timeline-node__years">{node.years}</p>
              <h3 className="timeline-node__role">{node.role}</h3>
              <p className="timeline-node__employer">{node.employer}</p>
              <p className="timeline-node__body">{node.body}</p>
              {node.accolade ? (
                <span className="timeline-node__accolade">{node.accolade}</span>
              ) : null}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
