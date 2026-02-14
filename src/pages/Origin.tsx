import { Link } from 'react-router-dom'
import { resume } from '../content/resume'

export default function Origin() {
  return (
    <section className="section origin-page">
      <p className="utility-text" style={{ marginBottom: '0.5rem', color: 'var(--burnt-orange)' }}>
        {resume.origin.birthplace}
      </p>
      <h1 style={{ marginBottom: '0.5rem' }}>The Origin</h1>
      <p className="utility-text" style={{ opacity: 0.5, marginBottom: '3rem' }}>
        {resume.fullName}
      </p>

      {/* Birth Story */}
      <div className="origin-block" style={{ marginBottom: '3rem' }}>
        <h2 className="section-title">Where It Started</h2>
        <p style={{ fontSize: '1.25rem', lineHeight: 1.8, maxWidth: '720px' }}>
          {resume.origin.narrative}
        </p>
      </div>

      {/* Heritage Callout */}
      <div className="origin-callout">
        <h3 style={{ marginBottom: '0.5rem', color: 'var(--burnt-orange)' }}>
          {resume.origin.heritage}
        </h3>
        <p className="utility-text" style={{ opacity: 0.6, marginBottom: '1rem' }}>
          {resume.origin.heritageDetail}
        </p>
        <p>
          West Columbia served as the first capital of the Republic of Texas in 1836,
          where the first Congress convened and Sam Houston took the oath as president.
          Stephen F. Austin's colony — the Old Three Hundred — settled this land and
          laid the foundation for what would become the Lone Star State.
        </p>
      </div>

      {/* Memphis Roots */}
      <div className="origin-callout">
        <h3 style={{ marginBottom: '0.5rem', color: 'var(--burnt-orange)' }}>
          {resume.origin.birthplace}
        </h3>
        <p className="utility-text" style={{ opacity: 0.6, marginBottom: '1rem' }}>
          City of Blues, Grit &amp; Unshakable Resolve
        </p>
        <p>
          Memphis gave the world the blues, rock &amp; roll, and a tradition of resilience
          that runs bone-deep. Born on the banks of the Mississippi, Austin carried that
          Memphis edge forward — the conviction that talent meets work ethic, and that
          where you come from shapes how hard you fight for where you're going.
        </p>
      </div>

      {/* The Through-Line */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 className="section-title">The Through-Line</h2>
        <div style={{ display: 'grid', gap: '1.5rem', maxWidth: '720px' }}>
          <p>
            Multi-sport athlete in baseball, football, and track. Rush Captain and budget
            manager for Alpha Tau Omega at UT Austin. International Relations graduate
            with minors in Economics and European Studies. Financial advisor. Advertising
            strategist. Graduate student. AI practitioner.
          </p>
          <p>
            Every chapter built on the last — competing, leading, and learning how
            systems work so he could eventually build his own. That's exactly what Blaze
            Sports Intel is: the product of every discipline, every detour, and every
            late night compressed into a platform that delivers sports intelligence to
            markets that never had access to it before.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Link to="/resume" className="btn btn-primary">View Resume</Link>
        <Link to="/work" className="btn">See the Work</Link>
      </div>
    </section>
  )
}
