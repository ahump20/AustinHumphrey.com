import { Link } from 'react-router-dom'
import { resume } from '../content/resume'

const stats = [
  { value: '3+', label: 'Years Building' },
  { value: 'Real-Time', label: 'Data Pipelines' },
  { value: '3', label: 'Degrees & Certs' },
  { value: '30s', label: 'Refresh Cadence' },
]

const navCards = [
  {
    to: '/origin',
    icon: '\u2302',
    title: 'The Origin',
    desc: 'Memphis roots, Texas heritage, and the drive to build.',
  },
  {
    to: '/resume',
    icon: '\u2261',
    title: 'Resume',
    desc: 'Experience, education, skills, and achievements.',
  },
  {
    to: '/work',
    icon: '\u2726',
    title: 'Selected Work',
    desc: 'Products built and shipped by Austin Humphrey.',
  },
  {
    to: '/contact',
    icon: '\u2709',
    title: 'Contact',
    desc: 'Get in touch or connect on social platforms.',
  },
]

export default function Home() {
  return (
    <section className="section hero">
      {/* Location Badge */}
      <p className="utility-text anim-fade-in delay-1" style={{ marginBottom: '0.75rem', color: 'var(--burnt-orange)' }}>
        {resume.origin.birthplace} &mdash; {resume.contact.location}
      </p>

      {/* Hero Title */}
      <h1 className="hero-title anim-fade-in-up delay-2">{resume.name}</h1>

      {/* Typewriter Tagline */}
      <p className="utility-text hero-tagline delay-3" style={{ marginBottom: '2.5rem' }}>
        {resume.tagline}
      </p>

      {/* Summary */}
      <p className="anim-fade-in-up delay-4" style={{ maxWidth: '640px', fontSize: '1.2rem', lineHeight: 1.7, marginBottom: '1rem' }}>
        {resume.summary}
      </p>

      {/* Heritage line */}
      <p className="utility-text anim-fade-in delay-5" style={{ opacity: 0.4, marginBottom: '2.5rem', fontSize: '0.7rem' }}>
        Roots in {resume.origin.heritage} &mdash; {resume.origin.heritageDetail}
      </p>

      {/* CTA Buttons */}
      <div className="anim-fade-in-up delay-5" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <Link to="/origin" className="btn btn-primary">The Origin Story</Link>
        <Link to="/resume" className="btn">View Resume</Link>
        <a href="/assets/Austin_Humphrey_Resume.pdf" className="btn" target="_blank" rel="noopener noreferrer">
          Download PDF
        </a>
      </div>

      {/* Social Links */}
      <div className="social-links anim-fade-in delay-6" style={{ marginBottom: '3rem' }}>
        <a href={resume.contact.socials.linkedin} target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">
          in
        </a>
        <a href={resume.contact.socials.github} target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub">
          GH
        </a>
        <a href={resume.contact.socials.twitter} target="_blank" rel="noopener noreferrer" className="social-link" title="X / Twitter">
          X
        </a>
        <a href="https://BlazeSportsIntel.com" target="_blank" rel="noopener noreferrer" className="social-link" title="Blaze Sports Intel" style={{ width: 'auto', padding: '0 0.75rem', fontSize: '0.7rem' }}>
          BSI
        </a>
      </div>

      {/* Stats Bar */}
      <div className="stats-bar anim-scale-in delay-6">
        {stats.map((s) => (
          <div key={s.label} className="stat-item">
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Navigation Cards */}
      <div className="nav-cards anim-fade-in-up delay-7">
        {navCards.map((card) => (
          <Link key={card.to} to={card.to} className="card-link">
            <div className="card">
              <span className="nav-card-icon">{card.icon}</span>
              <h3 style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>{card.title}</h3>
              <p className="utility-text" style={{ opacity: 0.5, fontSize: '0.7rem', marginBottom: 0 }}>{card.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
