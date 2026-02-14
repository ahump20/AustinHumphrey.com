import { resume } from '../content/resume'

export default function Resume() {
  return (
    <article className="section resume-page page-enter">
      {/* Header */}
      <header className="anim-fade-in-up delay-1" style={{ marginBottom: '2rem' }}>
        <h1 style={{ marginBottom: '0.25rem' }}>{resume.name}</h1>
        <p className="utility-text" style={{ opacity: 0.7, marginBottom: '1rem' }}>
          {resume.tagline}
        </p>
        <div className="utility-text" style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.7rem' }}>
          <span>{resume.contact.location}</span>
          <span>{resume.contact.phone}</span>
          {resume.contact.emails.map((emailAddress) => (
            <a key={emailAddress} href={`mailto:${emailAddress}`}>{emailAddress}</a>
          ))}
          <a href={`https://${resume.contact.linkedin}`} target="_blank" rel="noopener noreferrer">
            {resume.contact.linkedin}
          </a>
        </div>
      </header>

      {/* Download */}
      <div className="no-print anim-fade-in delay-2" style={{ marginBottom: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <a
          href="/assets/Austin_Humphrey_Resume.pdf"
          className="btn btn-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download PDF
        </a>
        <button className="btn" onClick={() => window.print()}>
          Print
        </button>
      </div>

      {/* Summary */}
      <section className="card anim-fade-in-up delay-2" style={{ marginBottom: '2.5rem' }}>
        <h2 className="section-title">Summary</h2>
        <p style={{ marginBottom: 0 }}>{resume.summary}</p>
      </section>

      {/* Experience */}
      <section className="anim-fade-in-up delay-3" style={{ marginBottom: '2.5rem' }}>
        <h2 className="section-title">Experience</h2>
        <div className="timeline">
          {resume.experience.map((role) => (
            <div key={`${role.company}-${role.dates}`} className="timeline-item">
              <h3 style={{ marginBottom: '0.15rem' }}>{role.title}</h3>
              <p className="utility-text" style={{ marginBottom: '0.5rem', opacity: 0.7, fontSize: '0.7rem' }}>
                {role.company} &middot; {role.location} &middot; {role.dates}
              </p>
              <ul style={{ paddingLeft: '1.25rem', listStyle: 'disc' }}>
                {role.bullets.map((bulletPoint, index) => (
                  <li key={index} style={{ marginBottom: '0.4rem', fontSize: '1.05rem' }}>{bulletPoint}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="anim-fade-in-up delay-4" style={{ marginBottom: '2.5rem' }}>
        <h2 className="section-title">Education</h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {resume.education.map((educationEntry) => (
            <div key={educationEntry.institution} className="card" style={{ padding: '1.25rem 1.5rem' }}>
              <h3 style={{ marginBottom: '0.15rem', fontSize: '1.1rem' }}>{educationEntry.degree}</h3>
              <p className="utility-text" style={{ opacity: 0.7, marginBottom: 0, fontSize: '0.7rem' }}>
                {educationEntry.institution}{educationEntry.details ? ` \u00B7 ${educationEntry.details}` : ''}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Honors & Leadership */}
      <section className="anim-fade-in-up delay-5" style={{ marginBottom: '2.5rem' }}>
        <h2 className="section-title">Honors &amp; Leadership</h2>
        <ul style={{ paddingLeft: '1.25rem', listStyle: 'disc' }}>
          {resume.honorsAndLeadership.map((item, index) => (
            <li key={index} style={{ marginBottom: '0.4rem', fontSize: '1.05rem' }}>{item}</li>
          ))}
        </ul>
      </section>

      {/* Skills */}
      <section className="anim-fade-in-up delay-6">
        <h2 className="section-title">Skills</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {resume.skills.map((skill, index) => (
            <span
              key={index}
              className="utility-text"
              style={{
                border: '1px solid var(--border-card)',
                padding: '0.4rem 0.8rem',
                fontSize: '0.65rem',
                transition: 'all 0.3s ease',
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </section>
    </article>
  )
}
