import { Link } from 'react-router-dom'
import { resume } from '../content/resume'

const chapters = [
  {
    to: '/origin/memphis',
    title: 'Memphis, Tennessee',
    subtitle: 'City of Blues, Grit & Resolve',
    preview: 'Born on the banks of the Mississippi, where blues, rock & roll, and bone-deep resilience shape the people who come from it.',
  },
  {
    to: '/origin/texas',
    title: 'West Columbia, Texas',
    subtitle: resume.origin.heritageDetail,
    preview: 'Raised with roots in the place where Texas itself was born — where Stephen F. Austin\'s colony planted the flag that built a nation.',
  },
  {
    to: '/origin/journey',
    title: 'The Through-Line',
    subtitle: 'Athlete to Architect',
    preview: 'From multi-sport athlete to fraternity leader to financial advisor to advertising strategist to founder — every chapter built on the last.',
  },
]

export default function Origin() {
  return (
    <section className="section page-enter">
      <p className="utility-text anim-fade-in delay-1" style={{ marginBottom: '0.5rem', color: 'var(--burnt-orange)' }}>
        {resume.fullName}
      </p>
      <h1 className="anim-fade-in-up delay-2" style={{ marginBottom: '0.5rem' }}>The Origin</h1>
      <p className="utility-text anim-fade-in delay-3" style={{ opacity: 0.5, marginBottom: '3rem' }}>
        Where it all started
      </p>

      {/* Narrative Lead */}
      <div className="anim-fade-in-up delay-3" style={{ marginBottom: '3rem', maxWidth: '720px' }}>
        <p style={{ fontSize: '1.3rem', lineHeight: 1.8 }}>
          {resume.origin.narrative}
        </p>
      </div>

      {/* Chapter Cards */}
      <h2 className="section-title anim-fade-in delay-4">Explore the Chapters</h2>
      <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '3rem' }}>
        {chapters.map((ch, i) => (
          <Link key={ch.to} to={ch.to} className="card-link">
            <article className={`card origin-chapter anim-fade-in-up delay-${i + 4}`}>
              <h3 style={{ marginBottom: '0.25rem', color: 'var(--burnt-orange)' }}>{ch.title}</h3>
              <p className="utility-text" style={{ opacity: 0.5, marginBottom: '1rem', fontSize: '0.7rem' }}>
                {ch.subtitle}
              </p>
              <p style={{ marginBottom: 0 }}>{ch.preview}</p>
            </article>
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div className="anim-fade-in-up delay-7" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Link to="/resume" className="btn btn-primary">View Resume</Link>
        <Link to="/work" className="btn">See the Work</Link>
      </div>
    </section>
  )
}
