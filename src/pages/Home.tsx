import { Link } from 'react-router-dom'
import { resume } from '../content/resume'
import ContactLinks from '../components/ContactLinks'

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
      <p style={{ maxWidth: '640px', fontSize: '1.2rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
        {resume.summary}
      </p>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
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

      <ContactLinks variant="home" />
    </section>
  )
}
