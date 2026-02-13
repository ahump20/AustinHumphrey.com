import { resume } from '../content/resume'

export default function Resume() {
  return (
    <article className="section resume-page">
      {/* Header */}
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ marginBottom: '0.25rem' }}>{resume.name}</h1>
        <p className="utility-text" style={{ opacity: 0.7, marginBottom: '1rem' }}>
          {resume.tagline}
        </p>
        <div className="utility-text" style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.7rem' }}>
          <span>{resume.contact.location}</span>
          <span>{resume.contact.phone}</span>
          {resume.contact.emails.map((e) => (
            <a key={e} href={`mailto:${e}`}>{e}</a>
          ))}
          <a href={`https://${resume.contact.linkedin}`} target="_blank" rel="noopener noreferrer">
            {resume.contact.linkedin}
          </a>
        </div>
      </header>

      {/* Download */}
      <div className="no-print" style={{ marginBottom: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
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
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 className="section-title">Summary</h2>
        <p>{resume.summary}</p>
      </section>

      {/* Experience */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 className="section-title">Experience</h2>
        {resume.experience.map((exp) => (
          <div key={exp.company} style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '0.15rem' }}>{exp.title}</h3>
            <p className="utility-text" style={{ marginBottom: '0.5rem', opacity: 0.7 }}>
              {exp.company} · {exp.location} · {exp.dates}
            </p>
            <ul style={{ paddingLeft: '1.25rem', listStyle: 'disc' }}>
              {exp.bullets.map((b, i) => (
                <li key={i} style={{ marginBottom: '0.4rem', fontSize: '1.05rem' }}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Education */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 className="section-title">Education</h2>
        {resume.education.map((ed) => (
          <div key={ed.institution} style={{ marginBottom: '1.25rem' }}>
            <h3 style={{ marginBottom: '0.15rem', fontSize: '1.1rem' }}>{ed.degree}</h3>
            <p className="utility-text" style={{ opacity: 0.7 }}>
              {ed.institution}{ed.details ? ` · ${ed.details}` : ''}
            </p>
          </div>
        ))}
      </section>

      {/* Honors & Leadership */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 className="section-title">Honors &amp; Leadership</h2>
        <ul style={{ paddingLeft: '1.25rem', listStyle: 'disc' }}>
          {resume.honorsAndLeadership.map((item, i) => (
            <li key={i} style={{ marginBottom: '0.4rem', fontSize: '1.05rem' }}>{item}</li>
          ))}
        </ul>
      </section>

      {/* Skills */}
      <section>
        <h2 className="section-title">Skills</h2>
        <ul style={{ paddingLeft: '1.25rem', listStyle: 'disc' }}>
          {resume.skills.map((skill, i) => (
            <li key={i} style={{ marginBottom: '0.4rem', fontSize: '1.05rem' }}>{skill}</li>
          ))}
        </ul>
      </section>
    </article>
  )
}
