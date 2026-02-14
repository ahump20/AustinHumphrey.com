import { Link } from 'react-router-dom'
import { resume } from '../content/resume'

export default function OriginMemphis() {
  return (
    <section className="section page-enter">
      <Link to="/origin" className="utility-text anim-fade-in" style={{ opacity: 0.5, display: 'inline-block', marginBottom: '2rem', fontSize: '0.7rem' }}>
        &larr; Back to Origin
      </Link>

      <p className="utility-text anim-fade-in delay-1" style={{ marginBottom: '0.5rem', color: 'var(--burnt-orange)' }}>
        Chapter I
      </p>
      <h1 className="anim-fade-in-up delay-2" style={{ marginBottom: '0.5rem' }}>{resume.origin.birthplace}</h1>
      <p className="utility-text anim-fade-in delay-3" style={{ opacity: 0.5, marginBottom: '3rem' }}>
        City of Blues, Grit &amp; Unshakable Resolve
      </p>

      <div className="anim-fade-in-up delay-3" style={{ maxWidth: '720px', marginBottom: '3rem' }}>
        <p style={{ fontSize: '1.25rem', lineHeight: 1.8 }}>
          Memphis gave the world the blues, rock &amp; roll, and a tradition of resilience
          that runs bone-deep. Born on the banks of the Mississippi, Austin carried that
          Memphis edge forward — the conviction that talent meets work ethic, and that
          where you come from shapes how hard you fight for where you're going.
        </p>
      </div>

      <div className="card anim-fade-in-up delay-4" style={{ marginBottom: '3rem', borderLeft: '4px solid var(--burnt-orange)' }}>
        <h3 style={{ marginBottom: '0.5rem', color: 'var(--burnt-orange)' }}>The Memphis Foundation</h3>
        <p style={{ marginBottom: '1rem' }}>
          Memphis isn't just a city — it's a proving ground. From Beale Street to the banks
          of the Mississippi, the culture rewards people who show up, put in the work, and
          refuse to quit. That's the DNA Austin carried into every chapter that followed.
        </p>
        <p style={{ marginBottom: 0 }}>
          The grit of Memphis taught an early lesson: nobody hands you anything. You earn it.
          You build it. And when things go sideways, you adapt and keep moving. That's the
          Memphis way — and it's the through-line in everything that came after.
        </p>
      </div>

      <div className="card anim-fade-in-up delay-5" style={{ marginBottom: '3rem' }}>
        <h3 style={{ marginBottom: '0.75rem' }}>Key Traits Forged in Memphis</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {[
            { trait: 'Resilience', detail: 'Built on the Mississippi — adapting to whatever comes' },
            { trait: 'Work Ethic', detail: 'Talent means nothing without the grind to back it up' },
            { trait: 'Grit', detail: 'The conviction to keep building when others stop' },
            { trait: 'Authenticity', detail: 'Memphis doesn\'t do pretense — neither does Austin' },
          ].map((t) => (
            <div key={t.trait}>
              <p className="utility-text" style={{ color: 'var(--burnt-orange)', marginBottom: '0.25rem', fontSize: '0.7rem' }}>{t.trait}</p>
              <p style={{ fontSize: '1rem', marginBottom: 0 }}>{t.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="anim-fade-in-up delay-6" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Link to="/origin/texas" className="btn btn-primary">Next: West Columbia &rarr;</Link>
        <Link to="/origin" className="btn">All Chapters</Link>
      </div>
    </section>
  )
}
