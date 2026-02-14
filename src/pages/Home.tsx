import { Link } from 'react-router-dom'
import { resume } from '../content/resume'

export default function Home() {
  return (
    <section className="section hero">
      <p className="utility-text" style={{ marginBottom: '0.5rem', color: 'var(--burnt-orange)' }}>
        {resume.origin.birthplace} &mdash; {resume.contact.location}
      </p>
      <h1 style={{ marginBottom: '0.5rem' }}>{resume.name}</h1>
      <p className="utility-text" style={{ marginBottom: '2rem', opacity: 0.7 }}>
        {resume.tagline}
      </p>
      <p style={{ maxWidth: '640px', fontSize: '1.2rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
        {resume.summary}
      </p>
      <p className="utility-text" style={{ maxWidth: '640px', opacity: 0.5, marginBottom: '2.5rem', fontSize: '0.75rem' }}>
        Roots in {resume.origin.heritage} — {resume.origin.heritageDetail}
      </p>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
        <Link to="/origin" className="btn btn-primary">The Origin Story</Link>
        <Link to="/resume" className="btn">View Resume</Link>
        <a
          href="/assets/Austin_Humphrey_Resume.pdf"
          className="btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download PDF
        </a>
      </div>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
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
