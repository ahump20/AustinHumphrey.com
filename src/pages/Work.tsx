import { motion } from 'framer-motion'
import { resume } from '../content/resume'
import ScrollReveal from '../components/ScrollReveal'
import { StaggerContainer, StaggerItem } from '../components/ScrollReveal'
import GlassCard from '../components/GlassCard'

const blazeExp = resume.experience[0]

const projects = [
  {
    name: 'Blaze Sports Intel',
    url: 'https://BlazeSportsIntel.com',
    tagline: 'AI-Assisted Sports Intelligence Platform',
    description: blazeExp.bullets[0],
    details: [blazeExp.bullets[1], blazeExp.bullets[2], blazeExp.bullets[3]],
    tech: ['Cloudflare Workers', 'D1', 'KV', 'R2', 'TypeScript', 'Hono'],
    status: 'Live',
  },
  {
    name: 'BlazeCraft.app',
    url: 'https://BlazeCraft.app',
    tagline: 'RTS-Style Agent Forge Interface',
    description: blazeExp.bullets[4],
    details: [blazeExp.bullets[5]],
    tech: ['React', 'TypeScript', 'Canvas API', 'Cloudflare Pages'],
    status: 'Live',
  },
]

const techStack = [
  { name: 'TypeScript', category: 'Language' },
  { name: 'React', category: 'Frontend' },
  { name: 'Cloudflare Workers', category: 'Runtime' },
  { name: 'D1 (SQLite)', category: 'Database' },
  { name: 'KV Storage', category: 'Storage' },
  { name: 'R2', category: 'Object Store' },
  { name: 'Hono', category: 'Framework' },
  { name: 'Python', category: 'Language' },
  { name: 'Node.js', category: 'Runtime' },
  { name: 'Git/GitHub', category: 'Version Control' },
  { name: 'Claude Code', category: 'AI Tooling' },
  { name: 'Vite', category: 'Build Tool' },
]

export default function Work() {
  return (
    <>
      {/* ── Header ── */}
      <section className="section work-header">
        <motion.h1
          className="page-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Selected Work
        </motion.h1>
        <motion.p
          className="page-subtitle utility-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Products built and operated by Austin Humphrey
        </motion.p>
      </section>

      {/* ── Projects ── */}
      <section className="section projects-section">
        <div className="projects-grid">
          {projects.map((proj, i) => (
            <ScrollReveal key={proj.name} delay={i * 0.15}>
              <GlassCard className="project-card">
                <div className="project-status">
                  <span className="status-dot" />
                  {proj.status}
                </div>

                <h2 className="project-name">
                  <a href={proj.url} target="_blank" rel="noopener noreferrer">
                    {proj.name}
                  </a>
                </h2>
                <p className="project-tagline utility-text">{proj.tagline}</p>

                <p className="project-description">{proj.description}</p>

                <ul className="project-details">
                  {proj.details.map((d, idx) => (
                    <li key={idx}>{d}</li>
                  ))}
                </ul>

                <div className="project-tech">
                  {proj.tech.map((t) => (
                    <span key={t} className="tech-badge">{t}</span>
                  ))}
                </div>

                <a
                  href={proj.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  Visit Site &rarr;
                </a>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section className="section tech-section">
        <ScrollReveal>
          <h2 className="section-heading">Tech Stack</h2>
        </ScrollReveal>
        <StaggerContainer className="tech-grid" staggerDelay={0.05}>
          {techStack.map((tech) => (
            <StaggerItem key={tech.name}>
              <GlassCard style={{ padding: '1.25rem', textAlign: 'center' }}>
                <p className="tech-name">{tech.name}</p>
                <p className="tech-category">{tech.category}</p>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>
    </>
  )
}
