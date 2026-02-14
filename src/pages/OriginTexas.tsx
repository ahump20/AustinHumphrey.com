import { Link } from 'react-router-dom'
import { resume } from '../content/resume'

export default function OriginTexas() {
  return (
    <section className="section page-enter">
      <Link to="/origin" className="utility-text anim-fade-in" style={{ opacity: 0.5, display: 'inline-block', marginBottom: '2rem', fontSize: '0.7rem' }}>
        &larr; Back to Origin
      </Link>

      <p className="utility-text anim-fade-in delay-1" style={{ marginBottom: '0.5rem', color: 'var(--burnt-orange)' }}>
        Chapter II
      </p>
      <h1 className="anim-fade-in-up delay-2" style={{ marginBottom: '0.5rem' }}>{resume.origin.heritage}</h1>
      <p className="utility-text anim-fade-in delay-3" style={{ opacity: 0.5, marginBottom: '3rem' }}>
        {resume.origin.heritageDetail}
      </p>

      <div className="anim-fade-in-up delay-3" style={{ maxWidth: '720px', marginBottom: '3rem' }}>
        <p style={{ fontSize: '1.25rem', lineHeight: 1.8 }}>
          West Columbia served as the first capital of the Republic of Texas in 1836,
          where the first Congress convened and Sam Houston took the oath as president.
          Stephen F. Austin's colony — the Old Three Hundred — settled this land and
          laid the foundation for what would become the Lone Star State.
        </p>
      </div>

      <div className="card anim-fade-in-up delay-4" style={{ marginBottom: '3rem', borderLeft: '4px solid var(--burnt-orange)' }}>
        <h3 style={{ marginBottom: '0.5rem', color: 'var(--burnt-orange)' }}>Heritage That Runs Deep</h3>
        <p style={{ marginBottom: '1rem' }}>
          That heritage runs deep — a foundation forged in the place where Texas itself
          was born, carrying forward the same restless drive to build something from nothing.
          The connection to West Columbia isn't just geographical. It's philosophical.
        </p>
        <p style={{ marginBottom: 0 }}>
          The colonists who built the Republic of Texas didn't wait for permission. They
          assessed the landscape, identified what was needed, and built it. That's the same
          approach Austin brings to every product, every platform, and every problem.
        </p>
      </div>

      <div className="card anim-fade-in-up delay-5" style={{ marginBottom: '3rem' }}>
        <h3 style={{ marginBottom: '0.75rem' }}>Historical Parallels</h3>
        <div className="timeline">
          {[
            { year: '1836', event: 'West Columbia becomes first capital of the Republic of Texas' },
            { year: '1836', event: 'Sam Houston inaugurated as President of the Republic' },
            { year: '1823', event: 'Stephen F. Austin settles the Old Three Hundred colonists' },
            { year: 'Today', event: 'Austin Humphrey carries forward that builder\'s ethos — now with Cloudflare Workers instead of covered wagons' },
          ].map((item) => (
            <div key={item.event} className="timeline-item">
              <p className="utility-text" style={{ color: 'var(--burnt-orange)', marginBottom: '0.25rem', fontSize: '0.7rem' }}>{item.year}</p>
              <p style={{ marginBottom: 0 }}>{item.event}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="anim-fade-in-up delay-6" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Link to="/origin/journey" className="btn btn-primary">Next: The Through-Line &rarr;</Link>
        <Link to="/origin/memphis" className="btn">&larr; Memphis</Link>
      </div>
    </section>
  )
}
