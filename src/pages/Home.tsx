import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { resume } from '../content/resume'
import Typewriter from '../components/Typewriter'
import ScrollReveal from '../components/ScrollReveal'
import { StaggerContainer, StaggerItem } from '../components/ScrollReveal'
import GlassCard from '../components/GlassCard'
import AnimatedCounter from '../components/AnimatedCounter'

const typewriterWords = [
  'Sports Intelligence',
  'Product Strategy',
  'AI-Assisted Analytics',
  'Data-Driven Insights',
  'Cloudflare Architecture',
]

const highlights = [
  {
    icon: '⚡',
    title: 'Blaze Sports Intel',
    desc: 'Real-time MLB & college baseball dashboards with 30-second refresh cadence.',
  },
  {
    icon: '🧠',
    title: 'AI & ML Pipeline',
    desc: 'Win probability models, Monte Carlo simulations, and predictive analytics.',
  },
  {
    icon: '☁',
    title: 'Serverless Architecture',
    desc: 'Built on Cloudflare Workers, D1, KV, and R2 for speed and reliability.',
  },
  {
    icon: '🎯',
    title: 'BlazeCraft.app',
    desc: 'RTS-style Agent Forge interface for system health and operational flow.',
  },
]

export default function Home() {
  return (
    <>
      {/* ── Hero Section ── */}
      <section className="hero-section">
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hero-location"
          >
            <span className="location-dot" />
            {resume.contact.location}
          </motion.div>

          <motion.h1
            className="hero-name"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {resume.name}
          </motion.h1>

          <motion.div
            className="hero-typewriter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Typewriter words={typewriterWords} className="utility-text" />
          </motion.div>

          <motion.p
            className="hero-summary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {resume.summary}
          </motion.p>

          <motion.div
            className="hero-ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <Link to="/resume" className="btn btn-primary btn-glow">
              View Resume
            </Link>
            <a
              href="/assets/Austin_Humphrey_Resume.pdf"
              className="btn btn-outline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download PDF
            </a>
            <Link to="/work" className="btn btn-ghost">
              View Work
            </Link>
          </motion.div>

          <motion.div
            className="hero-links"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <a
              href={`https://${resume.contact.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-link"
            >
              <span className="hero-link-label">LinkedIn</span>
              <span className="hero-link-arrow">&rarr;</span>
            </a>
            <a
              href="https://BlazeSportsIntel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-link"
            >
              <span className="hero-link-label">BlazeSportsIntel.com</span>
              <span className="hero-link-arrow">&rarr;</span>
            </a>
            <a
              href="https://BlazeCraft.app"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-link"
            >
              <span className="hero-link-label">BlazeCraft.app</span>
              <span className="hero-link-arrow">&rarr;</span>
            </a>
          </motion.div>
        </div>

        <div className="hero-scroll-indicator">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* ── Stats Dashboard ── */}
      <section className="section stats-section">
        <ScrollReveal>
          <h2 className="section-heading">By the Numbers</h2>
        </ScrollReveal>
        <div className="stats-grid">
          <GlassCard>
            <AnimatedCounter end={3} suffix="+" label="Years Building" />
          </GlassCard>
          <GlassCard>
            <AnimatedCounter end={2} label="Live Products" />
          </GlassCard>
          <GlassCard>
            <AnimatedCounter end={5} label="Tech Stacks" />
          </GlassCard>
          <GlassCard>
            <AnimatedCounter end={3} label="Degrees & Certs" />
          </GlassCard>
        </div>
      </section>

      {/* ── Highlights ── */}
      <section className="section highlights-section">
        <ScrollReveal>
          <h2 className="section-heading">What I Build</h2>
        </ScrollReveal>
        <StaggerContainer className="highlights-grid" staggerDelay={0.15}>
          {highlights.map((item) => (
            <StaggerItem key={item.title}>
              <GlassCard>
                <div className="highlight-icon">
                  {item.icon}
                </div>
                <h3 className="highlight-title">{item.title}</h3>
                <p className="highlight-desc">{item.desc}</p>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ── Experience Preview ── */}
      <section className="section experience-preview">
        <ScrollReveal>
          <h2 className="section-heading">Experience</h2>
        </ScrollReveal>
        <div className="timeline">
          {resume.experience.map((exp, i) => (
            <ScrollReveal key={exp.company} delay={i * 0.1} direction={i % 2 === 0 ? 'left' : 'right'}>
              <GlassCard style={{ marginBottom: '1.5rem' }}>
                <div className="timeline-header">
                  <div>
                    <h3 className="timeline-title">{exp.title}</h3>
                    <p className="timeline-company">{exp.company}</p>
                  </div>
                  <span className="timeline-dates">{exp.dates}</span>
                </div>
                <p className="timeline-bullet">{exp.bullets[0]}</p>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal delay={0.3}>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/resume" className="btn btn-outline">
              Full Resume &rarr;
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Education ── */}
      <section className="section education-preview">
        <ScrollReveal>
          <h2 className="section-heading">Education</h2>
        </ScrollReveal>
        <StaggerContainer className="education-grid" staggerDelay={0.12}>
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

      {/* ── CTA ── */}
      <section className="section cta-section">
        <ScrollReveal>
          <GlassCard hover={false} style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <h2 className="cta-heading">Let&apos;s Connect</h2>
            <p className="cta-text">
              Interested in sports intelligence, product strategy, or collaboration?
            </p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary btn-glow">
                Get in Touch
              </Link>
              <a
                href={`https://${resume.contact.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                LinkedIn
              </a>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>
    </>
  )
}
