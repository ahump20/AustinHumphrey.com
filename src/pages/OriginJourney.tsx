import { Link } from 'react-router-dom'

const milestones = [
  { era: 'Youth', title: 'Multi-Sport Athlete', detail: 'Baseball, football, and track — learning to compete, adapt, and push limits across disciplines.' },
  { era: '2014-2020', title: 'UT Austin', detail: 'B.A. in International Relations & Global Studies with minors in Economics and European Studies. Rush Captain and $100K budget manager for Alpha Tau Omega.' },
  { era: '2020-2022', title: 'Northwestern Mutual', detail: 'Financial Representative delivering consultative planning. Earned Power of 10 and March Madness Competition awards. Converted to full-time on results.' },
  { era: '2022-2025', title: 'Spectrum Reach', detail: 'Advertising Account Executive developing data-informed strategies across linear TV, OTT/CTV, streaming, and digital platforms.' },
  { era: '2023-Present', title: 'Blaze Sports Intel', detail: 'Founder & Builder of an AI-assisted sports intelligence platform. Real-time MLB and college baseball dashboards deployed on Cloudflare.' },
  { era: '2026', title: 'Full Sail University', detail: 'M.S. in Entertainment Business Management (Sports Management). GPA 3.56.' },
  { era: 'In Progress', title: 'UT Austin McCombs', detail: 'AI and Machine Learning Postgraduate Certificate — bridging product vision with technical depth.' },
]

export default function OriginJourney() {
  return (
    <section className="section page-enter">
      <Link to="/origin" className="utility-text anim-fade-in" style={{ opacity: 0.5, display: 'inline-block', marginBottom: '2rem', fontSize: '0.7rem' }}>
        &larr; Back to Origin
      </Link>

      <p className="utility-text anim-fade-in delay-1" style={{ marginBottom: '0.5rem', color: 'var(--burnt-orange)' }}>
        Chapter III
      </p>
      <h1 className="anim-fade-in-up delay-2" style={{ marginBottom: '0.5rem' }}>The Through-Line</h1>
      <p className="utility-text anim-fade-in delay-3" style={{ opacity: 0.5, marginBottom: '3rem' }}>
        Athlete &rarr; Leader &rarr; Strategist &rarr; Builder
      </p>

      <div className="anim-fade-in-up delay-3" style={{ maxWidth: '720px', marginBottom: '3rem' }}>
        <p style={{ fontSize: '1.25rem', lineHeight: 1.8 }}>
          Every chapter built on the last — competing, leading, and learning how
          systems work so he could eventually build his own. That's exactly what Blaze
          Sports Intel is: the product of every discipline, every detour, and every
          late night compressed into a platform that delivers sports intelligence to
          markets that never had access to it before.
        </p>
      </div>

      {/* Timeline */}
      <div className="anim-fade-in-up delay-4" style={{ marginBottom: '3rem' }}>
        <h2 className="section-title">The Journey</h2>
        <div className="timeline">
          {milestones.map((m) => (
            <div key={m.title} className="timeline-item">
              <p className="utility-text" style={{ color: 'var(--burnt-orange)', marginBottom: '0.25rem', fontSize: '0.7rem' }}>{m.era}</p>
              <h3 style={{ marginBottom: '0.35rem', fontSize: '1.15rem' }}>{m.title}</h3>
              <p style={{ marginBottom: 0, opacity: 0.85 }}>{m.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Card */}
      <div className="card anim-fade-in-up delay-5" style={{ marginBottom: '3rem', borderLeft: '4px solid var(--burnt-orange)' }}>
        <h3 style={{ marginBottom: '0.5rem', color: 'var(--burnt-orange)' }}>The Pattern</h3>
        <p style={{ marginBottom: 0 }}>
          Multi-sport athlete. Fraternity leader. International Relations major. Financial advisor.
          Advertising strategist. Graduate student. AI practitioner. Founder. The titles change
          but the pattern never does — find the system, learn the rules, then build something better.
        </p>
      </div>

      <div className="anim-fade-in-up delay-6" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Link to="/work" className="btn btn-primary">See the Work &rarr;</Link>
        <Link to="/resume" className="btn">Full Resume</Link>
        <Link to="/origin/texas" className="btn">&larr; West Columbia</Link>
      </div>
    </section>
  )
}
