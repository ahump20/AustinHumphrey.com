import { resume } from '../content/resume'
import './Work.css'

const founderExperience = resume.experience[0]

const projects = [
  {
    name: 'Blaze Sports Intel',
    url: 'https://BlazeSportsIntel.com',
    description: founderExperience.bullets[0],
    details: [founderExperience.bullets[1], founderExperience.bullets[2], founderExperience.bullets[3]],
  },
  {
    name: 'BlazeCraft.app',
    url: 'https://BlazeCraft.app',
    description: founderExperience.bullets[4],
    details: [founderExperience.bullets[5]],
  },
]

export default function Work() {
  return (
    <section className="section">
      <h1 style={{ marginBottom: '0.5rem' }}>Selected Work</h1>
      <p className="utility-text" style={{ opacity: 0.5, marginBottom: '3rem' }}>
        Products built and operated by Austin Humphrey
      </p>

      <div className="work-grid">
        {projects.map((project) => (
          <article key={project.name} className="work-card">
            <h2 style={{ marginBottom: '0.25rem' }}>
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                {project.name}
              </a>
            </h2>
            <p className="utility-text" style={{ opacity: 0.5, marginBottom: '1rem' }}>
              {project.url.replace('https://', '')}
            </p>
            <p style={{ marginBottom: '1rem' }}>{project.description}</p>
            <ul style={{ paddingLeft: '1.25rem', listStyle: 'disc' }}>
              {project.details.map((detail, index) => (
                <li key={index} style={{ marginBottom: '0.4rem', fontSize: '1.05rem' }}>{detail}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
