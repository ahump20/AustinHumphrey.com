import { motion } from 'framer-motion';
import { EASE_OUT_EXPO } from '../utils/animations';
import {
  PROFESSIONAL_EXPERIENCE,
  ACADEMIC_CREDENTIALS,
  RESUME_PATH,
} from '../content/site';
import SectionBar from './primitives/SectionBar';

export default function Curriculum() {
  return (
    <section
      id="curriculum"
      aria-labelledby="curriculum-heading"
      className="paper-ground"
    >
      <SectionBar
        numeral="Chapter II"
        title={<>Curriculum <em>Vitae</em></>}
        kicker="Professional · Academic · Side By Side"
      />

      <div className="ed-section ed-container">
        <motion.p
          id="curriculum-heading"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className="ed-lede mb-14"
          style={{ color: 'var(--ink-mute)', maxWidth: '60ch' }}
        >
          Four years of client-facing revenue work — advertising strategy
          that moved campaign decisions, financial planning that moved
          household outcomes. Three programs of academic grounding behind
          the practice. The discipline translates.
        </motion.p>

        <div className="cv-spread">

          {/* ── Professional column ── */}
          <div>
            <p className="cv-column__heading">Professional</p>
            <div className="timeline timeline--paper">
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

          {/* ── Academic column ── */}
          <div>
            <p className="cv-column__heading">Academic</p>
            <div>
              {ACADEMIC_CREDENTIALS.map((c, i) => (
                <motion.article
                  key={c.school}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: 0.05 + i * 0.1, ease: EASE_OUT_EXPO }}
                  className="credential"
                >
                  <p className="credential__years">{c.years}</p>
                  <h3 className="credential__degree">{c.degree}</h3>
                  <p className="credential__school">{c.school}</p>
                  <p className="credential__detail">{c.detail}</p>
                  {c.pill ? <span className="credential__pill">{c.pill}</span> : null}
                </motion.article>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.4, ease: EASE_OUT_EXPO }}
              className="mt-10"
            >
              <a
                href={RESUME_PATH}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => window.posthog?.capture('resume_downloaded', { source: 'curriculum' })}
                className="btn-editorial-solid ed-focus"
              >
                Download Curriculum Vitae
                <span aria-hidden style={{ marginLeft: 2 }}>↗</span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
