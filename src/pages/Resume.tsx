import { motion } from 'framer-motion'
import { resume } from '../content/resume'
import ScrollReveal from '../components/ScrollReveal'
import { StaggerContainer, StaggerItem } from '../components/ScrollReveal'
import GlassCard from '../components/GlassCard'

const skillCategories = [
  { label: 'Infrastructure', items: ['Cloudflare Workers', 'D1 (SQLite)', 'KV', 'R2'], pct: 90 },
  { label: 'Languages & Tools', items: ['TypeScript', 'Node.js', 'Python', 'SQL', 'Git/GitHub', 'CI/CD'], pct: 85 },
  { label: 'Data Engineering', items: ['REST APIs', 'Data Ingestion', 'Caching', 'Validation'], pct: 80 },
  { label: 'AI & LLM', items: ['Claude Code', 'ChatGPT', 'Gemini', 'OpenAI Codex'], pct: 75 },
  { label: 'Product & Strategy', items: ['Product Strategy', 'Stakeholder Comms', 'Dashboards', 'Exports'], pct: 88 },
]

export default function Resume() {
  return (
    <article className="section resume-page">
      {/* ── Header ── */}
      <header className="resume-header">
        <motion.h1
          className="resume-name"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {resume.name}
        </motion.h1>
        <motion.p
          className="resume-tagline utility-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {resume.tagline}
        </motion.p>
        <motion.div
          className="resume-contact-bar"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <span>{resume.contact.location}</span>
          <span className="contact-sep">&middot;</span>
          <span>{resume.contact.phone}</span>
          {resume.contact.emails.map((e) => (
            <span key={e}>
              <span className="contact-sep">&middot;</span>
              <a href={`mailto:${e}`}>{e}</a>
            </span>
          ))}
          <span className="contact-sep">&middot;</span>
          <a href={`https://${resume.contact.linkedin}`} target="_blank" rel="noopener noreferrer">
            {resume.contact.linkedin}
          </a>
        </motion.div>
      </header>

      {/* ── Download Bar ── */}
      <ScrollReveal>
        <div className="no-print resume-actions">
          <a
            href="/assets/Austin_Humphrey_Resume.pdf"
            className="btn btn-primary btn-glow"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download PDF
          </a>
          <button className="btn btn-outline" onClick={() => window.print()}>
            Print Resume
          </button>
        </div>
      </ScrollReveal>

      {/* ── Summary ── */}
      <ScrollReveal>
        <section className="resume-section">
          <h2 className="section-heading">Summary</h2>
          <GlassCard hover={false}>
            <p className="resume-summary-text">{resume.summary}</p>
          </GlassCard>
        </section>
      </ScrollReveal>

      {/* ── Experience ── */}
      <section className="resume-section">
        <ScrollReveal>
          <h2 className="section-heading">Experience</h2>
        </ScrollReveal>
        <div className="experience-timeline">
          {resume.experience.map((exp, idx) => (
            <ScrollReveal key={exp.company} delay={idx * 0.1}>
              <div className="exp-card">
                <div className="exp-timeline-dot" />
                <GlassCard>
                  <div className="exp-header">
                    <div>
                      <h3 className="exp-title">{exp.title}</h3>
                      <p className="exp-company">{exp.company}</p>
                    </div>
                    <div className="exp-meta">
                      <span className="exp-location">{exp.location}</span>
                      <span className="exp-dates">{exp.dates}</span>
                    </div>
                  </div>
                  <ul className="exp-bullets">
                    {exp.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </GlassCard>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Education ── */}
      <section className="resume-section">
        <ScrollReveal>
          <h2 className="section-heading">Education</h2>
        </ScrollReveal>
        <StaggerContainer className="education-cards" staggerDelay={0.1}>
          {resume.education.map((ed) => (
            <StaggerItem key={ed.institution}>
              <GlassCard>
                <h3 className="edu-degree">{ed.degree}</h3>
                <p className="edu-institution">{ed.institution}</p>
                {ed.details && <p className="edu-details">{ed.details}</p>}
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ── Skills ── */}
      <section className="resume-section">
        <ScrollReveal>
          <h2 className="section-heading">Skills</h2>
        </ScrollReveal>
        <StaggerContainer className="skills-container" staggerDelay={0.1}>
          {skillCategories.map((cat) => (
            <StaggerItem key={cat.label}>
              <div className="skill-row">
                <div className="skill-header">
                  <span className="skill-label">{cat.label}</span>
                  <span className="skill-tags">
                    {cat.items.map((item) => (
                      <span key={item} className="skill-tag">{item}</span>
                    ))}
                  </span>
                </div>
                <div className="skill-bar-track">
                  <motion.div
                    className="skill-bar-fill"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${cat.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ── Honors ── */}
      <section className="resume-section">
        <ScrollReveal>
          <h2 className="section-heading">Honors &amp; Leadership</h2>
        </ScrollReveal>
        <StaggerContainer className="honors-grid" staggerDelay={0.08}>
          {resume.honorsAndLeadership.map((item, i) => (
            <StaggerItem key={i}>
              <GlassCard style={{ padding: '1.25rem 1.5rem' }}>
                <p className="honor-item">{item}</p>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>
    </article>
  )
}
