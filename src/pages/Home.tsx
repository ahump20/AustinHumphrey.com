import { Link } from 'react-router-dom'
import { resume } from '../content/resume'
import './Home.css'

export default function Home() {
  return (
    <section className="section hero">
      <p className="utility-text" style={{ marginBottom: '0.5rem', color: 'var(--burnt-orange)' }}>
        {resume.contact.location}
      </p>
      <h1 style={{ marginBottom: '0.5rem' }}>{resume.name}</h1>
      <p className="utility-text" style={{ marginBottom: '2rem', opacity: 0.7 }}>
        {resume.tagline}
      </p>
      <p className="hero-summary">
        {resume.summary}
      </p>

      <div className="hero-actions">
        <Link to="/resume" className="btn btn-primary">View Resume</Link>
        <a
          href="/assets/Austin_Humphrey_Resume.pdf"
          className="btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download PDF
        </a>
      </div>

      <div className="hero-links">
        <a
          href={`https://${resume.contact.linkedin}`}
          target="_blank"
          rel="noopener noreferrer"
          className="utility-text"
        >
          LinkedIn →
        </a>
        <a
          href="https://BlazeSportsIntel.com"
          target="_blank"
          rel="noopener noreferrer"
          className="utility-text"
        >
          BlazeSportsIntel.com →
        </a>
      </div>
    </section>
  )
}
