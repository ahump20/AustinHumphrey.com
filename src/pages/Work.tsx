import { resume } from '../content/resume'

const founderExperience = resume.experience[0]

const projects = [
  {
    name: 'Blaze Sports Intel',
    url: 'https://BlazeSportsIntel.com',
    tagline: 'AI-Assisted Sports Intelligence Platform',
    description: founderExperience.bullets[0],
    highlights: [
      { label: 'Architecture', value: 'Serverless on Cloudflare (Workers, D1, KV, R2)' },
      { label: 'Data', value: 'Real-time MLB & college baseball dashboards' },
      { label: 'Refresh', value: '30-second cadence from official APIs' },
      { label: 'Analytics', value: 'Win probability, Monte Carlo simulations' },
    ],
    details: [founderExperience.bullets[1], founderExperience.bullets[2], founderExperience.bullets[3]],
  },
  {
    name: 'BlazeCraft.app',
    url: 'https://BlazeCraft.app',
    tagline: 'RTS-Style Agent Forge Interface',
    description: founderExperience.bullets[4],
    highlights: [
      { label: 'Type', value: 'System health & operational flow visualization' },
      { label: 'Style', value: 'Real-time strategy game interface' },
    ],
    details: [founderExperience.bullets[5]],
  },
  {
    name: 'AustinHumphrey.com',
    url: 'https://AustinHumphrey.com',
    tagline: 'Professional Portfolio & Resume Platform',
    description: 'Full-stack portfolio site with React, TypeScript, Cloudflare Workers API, automated PDF resume generation, and AI-generated assets.',
    highlights: [
      { label: 'Frontend', value: 'React 19 + TypeScript + Vite' },
      { label: 'Backend', value: 'Cloudflare Workers (Hono)' },
      { label: 'Features', value: 'Dark/Light theme, animations, PDF generation' },
    ],
    details: [],
  },
]

export default function Work() {
  return (
    <section className="section page-enter">
      <h1 className="anim-fade-in-up delay-1" style={{ marginBottom: '0.5rem' }}>Selected Work</h1>
      <p className="utility-text anim-fade-in delay-2" style={{ opacity: 0.5, marginBottom: '3rem' }}>
        Products built and operated by Austin Humphrey
      </p>

      <div style={{ display: 'grid', gap: '2.5rem' }}>
        {projects.map((project, i) => (
          <article
            key={project.name}
            className={`card anim-fade-in-up delay-${i + 2}`}
            style={{ borderLeft: '4px solid var(--burnt-orange)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <h2 style={{ marginBottom: 0 }}>
                <a href={project.url} target="_blank" rel="noopener noreferrer">
                  {project.name}
                </a>
              </h2>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="utility-text"
                style={{ opacity: 0.5, fontSize: '0.7rem' }}
              >
                {project.url.replace('https://', '')} &rarr;
              </a>
            </div>
            <p className="utility-text" style={{ opacity: 0.4, marginBottom: '1.25rem', fontSize: '0.7rem' }}>
              {project.tagline}
            </p>
            <p style={{ marginBottom: '1.5rem' }}>{project.description}</p>

            {/* Highlights Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: project.details.length > 0 ? '1.5rem' : 0 }}>
              {project.highlights.map((h) => (
                <div key={h.label}>
                  <p className="utility-text" style={{ color: 'var(--burnt-orange)', marginBottom: '0.2rem', fontSize: '0.65rem' }}>{h.label}</p>
                  <p style={{ fontSize: '0.95rem', marginBottom: 0 }}>{h.value}</p>
                </div>
              ))}
            </div>

            {project.details.length > 0 && (
              <ul style={{ paddingLeft: '1.25rem', listStyle: 'disc' }}>
                {project.details.map((detail, idx) => (
                  <li key={idx} style={{ marginBottom: '0.4rem', fontSize: '1.05rem' }}>{detail}</li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
