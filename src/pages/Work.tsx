import { resume } from '../content/resume'

const blazeExp = resume.experience[0]

const projects = [
  {
    name: 'Blaze Sports Intel',
    url: 'https://BlazeSportsIntel.com',
    description: blazeExp.bullets[0],
    details: [blazeExp.bullets[1], blazeExp.bullets[2], blazeExp.bullets[3]],
  },
  {
    name: 'BlazeCraft.app',
    url: 'https://BlazeCraft.app',
    description: blazeExp.bullets[4],
    details: [blazeExp.bullets[5]],
  },
]

export default function Work() {
  return (
    <section className="section">
      <h1 style={{ marginBottom: '0.5rem' }}>Selected Work</h1>
      <p className="utility-text" style={{ opacity: 0.5, marginBottom: '3rem' }}>
        Products built and operated by Austin Humphrey
      </p>

      <div style={{ display: 'grid', gap: '2.5rem' }}>
        {projects.map((proj) => (
          <article
            key={proj.name}
            style={{
              border: '1px solid rgba(191,87,0,0.2)',
              padding: '2rem',
              borderRadius: '2px',
            }}
          >
            <h2 style={{ marginBottom: '0.25rem' }}>
              <a href={proj.url} target="_blank" rel="noopener noreferrer">
                {proj.name}
              </a>
            </h2>
            <p className="utility-text" style={{ opacity: 0.5, marginBottom: '1rem' }}>
              {proj.url.replace('https://', '')}
            </p>
            <p style={{ marginBottom: '1rem' }}>{proj.description}</p>
            <ul style={{ paddingLeft: '1.25rem', listStyle: 'disc' }}>
              {proj.details.map((d, i) => (
                <li key={i} style={{ marginBottom: '0.4rem', fontSize: '1.05rem' }}>{d}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
